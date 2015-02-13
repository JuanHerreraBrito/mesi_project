<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Promotions_model extends CI_Model {

	//The default constructor
	function __construct()
    {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }

    public function getPromotionsByTitle($params) {
    	extract($params);

        $result = array();
    	if (isset($titulo) OR strlen($titulo) > 0) {
    		$this->db->select('*');
    		$this->db->from('promociones');
    		$this->db->like('titulo', $titulo);
            $this->db->where('delete !=', 1);

            $result_select = $this->db->get();
            if ($result_select->num_rows() > 0) {
                $result = $result_select->result();
                $aux = array();
                foreach ($result as $data) {
                    array_push($aux,json_decode($data->porcentaje));
                }
                for ($i=0; $i < count($result); $i++) { 
                    $result[$i]->porcentaje = $aux[$i];
                }
            }
            return $result;
    	}
    }// end getPromotionsByTitle()

    public function getAllPromotions($params) {
        extract($params);

    	$this->db->select('*');
    	$this->db->from('promociones');
    	$this->db->where('delete !=',1);

    	$result = array();
    	$resultPromotions = $this->db->get();
    	if ($resultPromotions->num_rows() > 0) {
    		$result = $resultPromotions->result();
             $aux = array();
            for ($i=0; $i < count($result); $i++) { 
                $result[$i]->porcentaje = json_decode($result[$i]->porcentaje);
                $result[$i]->activa= $this->isStoreInPromotion($store_id, $result[$i]->idPromocion);
            }
    	}// end if
    	return $result;
    }// eng getAllPromotions()

    private function isStoreInPromotion($store_id, $idPromocion) {
        $result = 0;
        if (isset($store_id) AND $store_id > 0 AND (isset($idPromocion) AND $idPromocion > 0)) {
            $this->db->select('id');
            $this->db->from('discounts');
            $this->db->where('admin_key_discount','promocion_'.$idPromocion.'_'.$store_id);
            $this->db->where('delete !=', 1);
            $this->db->limit(1);
            
            $aux = $this->db->get();
            if ($aux->num_rows() > 0) {
                $result = $aux->num_rows();
            }
        }
        return $result;
    }// end isStoreInPromotion()

    public function createPromotion($params) {
    	extract($params);

    	if (isset($titulo) AND strlen($titulo) > 0 AND (isset($fechaInicio) AND strtotime($fechaInicio)) AND (isset($fechaFinal) AND strtotime($fechaFinal)) AND (isset($porcentaje) AND strlen($porcentaje) > 0) AND (isset($descripcion) AND strlen($descripcion) > 0) ) {
    		$data_insert = array(
    			'titulo'		=> $titulo,
    			'fechaInicio'	=> $fechaInicio,
    			'fechaFinal'	=> $fechaFinal,
    			'fechaAlta'		=> date('Y-m-d H:i:s'),
    			'porcentaje'	=> $porcentaje,
    			'descripcion'	=> $descripcion
    		);
    		$this->db->insert('promociones', $data_insert);
    		$resultInsert = $this->db->affected_rows();
    		if ($resultInsert > 0) {
    			return true;
    		}
    		return false;
    	}
    }// end createPromotion()

    public function insertGeneralDiscount($params) {
    	extract($params);

    	if (isset($store_id) AND $store_id > 0  AND (isset($order_perc) AND $order_perc > 0) AND (isset($idPromocion) AND $idPromocion > 0)) {
    		$this->db->select('fechaInicio, fechaFinal');
    		$this->db->from('promociones');
    		$this->db->where('idPromocion', $idPromocion);
    		$this->db->where('delete !=', 1);


    		$aux = $this->db->get();

    		if ($aux->num_rows() > 0) {
    			$auxPromotionDate = $aux->result();

    			$data_insert_discount = array(
    				'by_store_id'			=> $store_id,
    				'order_perc'			=> $order_perc,
    				'start_date'			=> $auxPromotionDate[0]->fechaInicio,
    				'end_date'				=> $auxPromotionDate[0]->fechaFinal,
    				'max_discounts'			=> 1	,
    				'who_pays'				=> 'store',
    				'deleted'				=> 0,
    				'volume_min_items'		=> 1,
    				'admin_key_discount'	=> 'promocion_'.$idPromocion.'_'.$store_id
    			);
    			$this->db->insert('discounts', $data_insert_discount);
    			$correctInsert = $this->db->affected_rows();
    			if ($correctInsert > 0) {
    				
    				// the last id inserted
    				$idDiscount = $this->db->insert_id();

    				$data_discounts_has_promociones = array(
    					'discounts_id'		=> $idDiscount,
    					'idPromocion'		=> $idPromocion,
    					'tipo'				=> 'store',
    					'idEntidad'			=> $store_id,
    					'discount'			=> $order_perc
    				);
    				$this->db->insert('discounts_has_promociones', $data_discounts_has_promociones);
    				$correctInsert = $this->db->affected_rows();
    				if ($correctInsert > 0) {
    					return true;
    				}
    				return false;
    			}
    			return false;
    		}// end if
    	}// end if
    }// end insertGeneralDiscount()

    public function insertDiscountByItem($params) {
    	extract($params);
    	$jsonn = json_decode($json);
    	$numItemsPromotion = count($jsonn);
    	$numItems = $this->numItems($store_id);
    	$minItems = $numItems*0.20;
    	if ($minItems < $numItemsPromotion AND $numItems > 0) {
    		$this->db->select('fechaInicio, fechaFinal');
    		$this->db->from('promociones');
    		$this->db->where('idPromocion', $jsonn[0]->id_promocion);
    		$this->db->where('delete !=', 1);
    		$aux = $this->db->get();

    		if ($aux->num_rows() > 0) {
    			$auxPromotionDate = $aux->result();
    			foreach ($jsonn as $data) {
    				$data_insert_discount = array(
    					'by_item_id'			=> $data->item_id,
    					'order_perc'			=> $data->discount,
	    				'start_date'			=> $auxPromotionDate[0]->fechaInicio,
	    				'end_date'				=> $auxPromotionDate[0]->fechaFinal,
	    				'who_pays'				=> 'store',
	    				'deleted'				=> 0,
	    				'admin_key_discount'	=> 'promocion_'.$data->id_promocion.'_'.$store_id
    				);
    				$this->db->insert('discounts', $data_insert_discount);
    				$correctInsert = $this->db->affected_rows();
    				if ($correctInsert > 0) {
    					// the last id inserted
    					$idDiscount = $this->db->insert_id();

	    				$data_discounts_has_promociones = array(
    						'discounts_id'		=> $idDiscount,
    						'idPromocion'		=> $data->id_promocion,
    						'tipo'				=> 'item',
    						'idEntidad'			=> $data->item_id,
    						'discount'			=> $data->discount
	    				);
    					$this->db->insert('discounts_has_promociones', $data_discounts_has_promociones);
    				}//en if
    			}// end foreach
    			return true;
    		}// end if
    	}
    	return false;
    	
    }// end insertDiscountByItem()

    private function numItems($store_id) {
    	$res = -1;
    	if (isset($store_id) AND $store_id > 0) {
    		$this->db->select('id');
    		$this->db->from('items');
    		$this->db->where('store_id',$store_id);
    		$this->db->where('deleted !=',1);
    		$this->db->where('live',1);

    		$aux = $this->db->get();
    		$res = $aux->num_rows();
    	}
    	return $res;
    }// end numItems()

    public function deleteDiscount($params) {
    	extract($params);

    	if (isset($idPromocion) AND $idPromocion > 0 AND isset($store_id) AND $store_id > 0) {
    		$idDiscounts = $this->getDiscountId('promocion_'.$idPromocion.'_'.$store_id);

    		if (count($idDiscounts) > 0) {
    			foreach ($idDiscounts as $discount) {
					$this->db->where('discounts_id', $discount->id);
		    		$this->db->where('idPromocion', $idPromocion);
    				$this->db->delete('discounts_has_promociones');

    				$deleteResult = $this->db->affected_rows();
    				if ($deleteResult > 0) {
	    				$data_update = array(
    						'deleted'		=> 1
	    				);
    					$this->db->where('id', $discount->id);
    					$this->db->update('discounts', $data_update);
    				}// end if
    			}// end foreach
    			return true;
    		}// end if   		
    		return false;
    	}// end if
    }// end deleteDiscount()

    private function getDiscountId($admin_key_discount) {
    	$result = array();
    	if (isset($admin_key_discount) AND strlen($admin_key_discount) > 0) {
    		$this->db->select('id');
    		$this->db->from('discounts');
    		$this->db->where('admin_key_discount', $admin_key_discount);
            $this->db->where('delete !=', 1);

    		$result_select = $this->db->get();
    		if ($result_select->num_rows() > 0) {
    			$result = $result_select->result();
    		}
    		return $result;
    	}
    }
}
?>