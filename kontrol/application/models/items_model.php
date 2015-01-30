<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Items_model extends CI_Model {


    function __construct()
    {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }

	public function createMaterials($params) {
		extract($params);

		if (isset($description) AND strlen($description) > 0) {
			$dataInsert = array(
				'description'	=> $description
			);

			$this->db->insert('Materials', $dataInsert);
			$resultInsert = $this->db->affected_rows();
			if ($resultInsert > 0) {
				return true;
			}
			return false;
		}
	}// end createMaterials()

	public function createItemType($params) {
		extract($params);

		if (isset($description) AND strlen($description) > 0) {

			$this->db->select('id');
			$this->db->from('ItemsTypes');
			$this->db->where('description', $description);

			$resultSelect = $this->db->get();
			if ($resultSelect->num_rows() == 0) {
				$dataInsert = array(
					'description'	=> $description
				);
				$this->db->insert('ItemsTypes', $dataInsert);
				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}else{
				return -1;
			}
		}// end if
	}// end createItemType()

	public function createItem($params) {
		extract($params);

		if (isset($mount) AND $mount > 0 AND (isset($minLevel) AND $minLevel > 0) AND (isset($wholeSale) AND $wholeSale > 0) 
			AND (isset($retailPrice) AND $retailPrice > 0) AND (isset($baseMaterial) AND strlen($baseMaterial) > 0) AND (isset($itemName) AND strlen($itemName) > 0) AND (isset($country) AND strlen($country) > 0)) {
			if (isset($iType) AND $iType > 0) {
				$dataInsert = array(
					'amount'			=> $amount, /*Cantidad de items existentes*/
					'minLevel'		=> $minLevel, //nivel minimo de items que deben existir
					'wholeSale'		=> $wholeSale,// //precio unitario
					'retailPrice'	=> $retailPrice, //venta al por menor
					'baseMaterial'	=> $baseMaterial,//material primo
					'itemName'		=> $itemName,//nombre del producto
					'country'		=> $country, //pais de procedencia
					'iType'			=> 1
				);
				$this->db->insert('Items', $dataInsert);

				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}else{// Item no inv
				$dataInsert = array(
					'mount'			=> $mount,
					'minLevel'		=> $minLevel,
					'wholeSale'		=> $wholeSale,
					'retailPrice'	=> $retailPrice,
					'baseMaterial'	=> $baseMaterial,
					'itemName'		=> $itemName,
					'country'		=> $country
				);
				$this->db->insert('Items', $dataInsert);

				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}// end else
		}// end if
	}// createItem()

	

	public function getItems($params) {
		extract($params);

		$result = array();

		$this->db->select('*');
		$this->db->from('Items AS I');

		if (isset($material) AND strlen($material) > 0) {
			$this->db->join('ItemsMaterials AS IM', 'I.idItemType = IM.idItemType', 'inner');
			$this->db->join('Materials AS M', 'IM.idItemType = M.idItemType', 'inner');
			$this->db->like('description', $material);
		}
		if (isset($codeBar) AND $codeBar > 0) {
			$this->db->join('codeBars AS CB', 'I.idCodeBar = CB.idCodeBar', 'inner');
			$this->db->where('CB.codeBar', $codeBar);
		}
		if (isset($avalible) AND $avalible > 0 AND $avalible < 2) {
			$this->db->where('I.avalible', $avalible);
		}
		if (isset($minSale) AND $minSale > 0 AND (isset($maxSale) AND $maxSale > 0 AND $minSale < $maxSale)) {
			$this->db->where('wholeSale >' $minSale);
			$this->db->where('wholeSale < ' $maxSale);
		}
		if (isset($Type) AND strlen($Type) > 0) {
			$this->db->join('ItemsTypes AS IT', 'IT.idItemType = I.idItemType' 'inner');
			$this->db->where('IT.description' $Type);
		}
		if (isset($pais) AN strlen($pais) > 0) {
			$this->db->like('pais', $pais); 
		}

		$resultSelect = $this->db->get();

		if ($resultSelect->num_rows() > 0) {
			$result = $resultSelect->result();
		}
		return $result;
	}
	
}// end Items_model 