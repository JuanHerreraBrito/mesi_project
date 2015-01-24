<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Stores_model extends CI_Model {


    function __construct()
    {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }
	
	function get_store_items($params) {
		extract($params);

		switch ($sitio) {
			case 'sell':
				$response = $this->get_store_items_sell($params);
				break;
			case 'www':
				$response = $this->get_store_items_www($params);
				break;

			default:
				$response =  array( '3rrC' => 0 , '3rr' => 'Error sitio');
				break;
		}

		return $response;
	}
	private function get_store_items_sell($params) {
		extract($params);
		if( isset($store_id) ) {
			//Obtener items de store_id
			$this->db->select('items.id, items.name, items.order_id, items.name, items.name_eng, items.price, items.live, items.categories, items.new_item');
			$this->db->from('items');
			if( isset($cat_id) && $cat_id!='' ) {
				$this->db->like('categories', '"'.$cat_id.'"');
			}
			$this->db->where(array( 'deleted'=> 0, 'store_id'=>$store_id,));
			$this->db->order_by('order_id', 'asc');
			$this->db->order_by('created', 'desc');
			$resultadoObtenerItems = $this->db->get();
			if( $datosObtenerItems = $resultadoObtenerItems->result() ) {
				//Agregar thumbnail a cada item
				foreach ( $datosObtenerItems as $indiceItem => $item ) {
					//$datosObtenerItems[$indiceItem]->categories = json_decode($datosObtenerItems[$indiceItem]->categories);
					$arrayCategorias = json_decode($datosObtenerItems[$indiceItem]->categories);
					//Para cada cat_id obtener sus datos
					$datosCategorias = Array();
					if( is_array($arrayCategorias) && sizeof($arrayCategorias)>0 ) {
						foreach( $arrayCategorias as $indiceCategoria => $catId ) {
							$this->db->select("id, name", false);
							$this->db->from('categories');
							$this->db->where(array('store_id' => $store_id, 'id' => $catId, ));
							$resultadoObtenerCategoria = $this->db->get();
							if( $datosObtenerCategoria = $resultadoObtenerCategoria->result() ) {
								$datosCategorias[$indiceCategoria] = new stdClass();
								$datosCategorias[$indiceCategoria]->id = $datosObtenerCategoria[0]->id;
								$datosCategorias[$indiceCategoria]->name = $datosObtenerCategoria[0]->name;
							}
						}
					}

					// Selecciona el nombre del item
					if($this->session->userdata('lang') == 'es'){
						if(!empty($item->name)) $datosObtenerItems[$indiceItem]->name = $item->name;
						else $datosObtenerItems[$indiceItem]->name = $item->name_eng;
					}
					else{
						if(!empty($item->name_eng)) $datosObtenerItems[$indiceItem]->name = $item->name_eng;
						else $datosObtenerItems[$indiceItem]->name = $item->name;
					}

					$datosObtenerItems[$indiceItem]->categories = $datosCategorias;

					$datosObtenerItems[$indiceItem]->thumb = false;
				}
				return $datosObtenerItems;
			}
		} else {
			//Faltan datos requeridos
			return false;
		}
	}
	
	public function get_store_details($params){

		extract($params);

		switch ($sitio) {
			case 'sell':
				$response = $this->get_store_details_sell($params);
				break;
			case 'www':
				$response = $this->get_store_details_www($params);
				break;

			default:
				$response =  array( '3rrC' => 0 , '3rr' => 'Error sitio');
				break;
		}

		return $response;

	}
	/**
	 * Obtener detalles de una tienda
	 *
	 * @param array $params
	 */
	private function get_store_details_sell($params) {
		extract($params);
		if( isset($store_id) ) {

			//Obtener detalles de tienda
			$this->db->select('stores.id AS store_id, stores.name, stores.url_name, stores.live_store, stores.order_count, stores.solicitud_publicacion,
							  stores.itemsPrice_back, stores.itemsPrice_text, stores.publish_store_ok,ultimos_inventarios');
			$this->db->from('stores');
			$this->db->where(array('id'=>$store_id));
			$this->db->limit(1);
			$resultadoObtenerStoreDetails = $this->db->get();
			if( $datosObtenerStoreDetails = $resultadoObtenerStoreDetails->result() ) {
				$datosStore 					= new stdClass();
				$datosStore->itemsPrice_back 	= $datosObtenerStoreDetails[0]->itemsPrice_back;
				$datosStore->itemsPrice_text 	= $datosObtenerStoreDetails[0]->itemsPrice_text;
				$datosStore->name 				= $datosObtenerStoreDetails[0]->name;
				$datosStore->last_inventory 	= $datosObtenerStoreDetails[0]->ultimos_inventarios;
				
				//Obtener logo de tienda
				$thumb_raw = "";
				if( is_object($thumb_raw) ) {
					$datosStore->logo = $thumb_raw->url.$thumb_raw->object_name."_b.".$thumb_raw->extension;
				}
				//Estado de publicacion
				/*
				Checklist
				1. Header y logo
				2. Por lo menos un artículo / Artículos en ON
				3. Dirección de recolección y datos de contacto
				4. Datos bancarios
				*/
				//$data['checklist'] = array('header' => true, 'logo' => true, 'item' => true, 'pickup_data' => true, 'bank_data' => true);
				//$resultadoHeader = $this->getImagebyRole($store_id, $role='header', $type = 'img_bordered');
				//if(!$resultadoHeader){
				//	$data['checklist']['header'] = false;
				//	$datosStore->header = false;
				//} else {
				//	$datosStore->header = $resultadoHeader[0]->url.$resultadoHeader[0]->object_name.'_b.'.$resultadoHeader[0]->extension;
				//}
				//
				//if(!$this->getImagebyRole($store_id, $role='logo', $type = 'img_bordered')){
				//	$data['checklist']['logo'] = false;
				//}
				//
				//$obtenerItems = $this->db->get_where('items', array('store_id' => $store_id, 'deleted !=' => 1, 'live' => 1));
				//if($r = $obtenerItems->result()){
				//	$data['checklist']['item'] = true;
				//}else{
				//	$data['checklist']['item'] = false;
				//}
				//
				//if(!$this->check_pickup_data($store_id)){
				//	$data['checklist']['pickup_data'] = false;
				//}
				//
				//if(!$this->check_bank_data($store_id)){
				//	$data['checklist']['bank_data'] = false;
				//}
				//$arrayMotivosOffline = array();
				//$flagOffline = false;
				//foreach( $data['checklist'] as $nombreRequisito => $requisitoOnline ) {
				//	$arrayMotivosOffline[$nombreRequisito] = $requisitoOnline;
				//	if( !$requisitoOnline ) {
				//		$flagOffline = true;
				//	}
				//}
				//$datosStore->estado_publicacion = new stdClass();
				//$datosStore->estado_publicacion->status = ($datosObtenerStoreDetails[0]->live_store == 1 ? 'online' :'offline');
				//$datosStore->estado_publicacion->motivo_offline = $arrayMotivosOffline;
				//$datosStore->estado_publicacion->lugar_espera = (!$flagOffline?$this->get_lugar_publicacion($datosObtenerStoreDetails[0]->solicitud_publicacion):false);
				//if( $datosObtenerStoreDetails[0]->live_store == 1 ) {
				//	$datosStore->liga_preview = (stripos($_SERVER['SERVER_NAME'], 'nb9')!==false?'http://www.kichink.nb9.mx':'https://www.kichink.com').'/stores/id/'.$store_id;
				//} else {
				//	$datosStore->liga_preview = (stripos($_SERVER['SERVER_NAME'], 'nb9')!==false?'http://sell3.kichink.nb9.mx':'http://kontrol.kichink.com').'/stores/preview/'.$store_id;
				//}
				////stores/preview/id
				////Obtener COUNT de items de tienda
				//$this->db->select('COUNT(id) AS total_items');
				//$this->db->from('items');
				//$this->db->where(array('store_id'=>$store_id, 'deleted'=>0));
				//$resultadoObtenerCountItems = $this->db->get();
				//if( $datosObtenerCountItems = $resultadoObtenerCountItems->result() ) {
				//	$datosStore->items_count = $datosObtenerCountItems[0]->total_items;
				//} else {
				//	$datosStore->items_count = 0;
				//}
				////Obtener SUM de visitas a items
				//$this->db->select('SUM(items.visitas) AS page_views');
				//$this->db->from('items');
				//$this->db->where(array('store_id'=>$store_id));
				//$resultadoObtenerCountItems = $this->db->get();
				//if( $datosObtenerCountItems = $resultadoObtenerCountItems->result() ) {
				//	$datosStore->page_views = $datosObtenerCountItems[0]->page_views;
				//} else {
				//	$datosStore->page_views = 0;
				//}
				//
				////Obtener total de sales de tienda (modo nuevo)
				//$datosStore->sales 		= 0;
				//$datosStore->sales_usd	= 0;
				//$this->db->select('SUM((order_items.sale_price-order_items.discount_sale_price)*order_items.units) AS total_price, SUM((order_items.sale_price_USD-order_items.discount_sale_price_USD)*order_items.units) AS total_price_USD');
				//$this->db->where('(pago_efectivo_timestamp IS NOT NULL OR pago_tarjeta_timestamp IS NOT NULL OR pago_credito_timestamp IS NOT NULL OR pago_pod_timestamp IS NOT NULL)');
				//$this->db->where_not_in('orders.status', array('cancelled'));
				//$this->db->join('order_items', 'order_items.order_id = orders.id');
				//$this->db->not_like('orders.payed_by', 'WAITING_FOR_POD');
				//$q = $this->db->get_where('orders', array('orders.store_id'=>$store_id));
				//if($q->num_rows() > 0)
				//{
				//	$row = $q->row();
				//	$datosStore->sales 		= $row->total_price;
				//	$datosStore->sales_usd	= $row->total_price_USD;
				//}
				//
				////Obtener COUNT de orders de tienda
				//$this->db->select('COUNT(id) AS total_orders');
				//$this->db->from('orders');
				//$this->db->where("(status='new' AND (shipment!=7 AND shipment!=10))");
				//$this->db->where(array('store_id'=>$store_id));
				//$resultadoObtenerCountOrders = $this->db->get();
				//
				//if( $datosObtenerCountOrders = $resultadoObtenerCountOrders->result() ) {
				//	$datosStore->orders_count = $datosObtenerCountOrders[0]->total_orders;
				//} else {
				//	$datosStore->orders_count = 0;
				//}
				//
				////Obtener COUNT de payments de tienda
				//$this->db->select('COUNT(DISTINCT(payments.id)) AS total_payments');
				//$this->db->from('payments');
				//$this->db->join('payment_orders', 'payment_orders.payment_id = payments.id');
				//$this->db->join('orders', 'orders.id = payment_orders.order_id');
				//$this->db->where(array('payments.store_id'=>$store_id, 'payments.status'=>'pending'));
				//
				//$resultadoObtenerCountOrders = $this->db->get();
				//if( $datosObtenerCountOrders = $resultadoObtenerCountOrders->result() ) {
				//	$datosStore->payments_count = $datosObtenerCountOrders[0]->total_payments;
				//} else {
				//	$datosStore->payments_count = 0;
				//}
				//
				////Obtener COUNT de notificaciones pendientes del usuario
				//$datosStore->last_notifications_unread = $this->Notifications_model->last_notifications_unread($store_id);
				//
				//// Retornar datos de logo y header para editor
				//$datosStore->images_data->logo = $this->getImagebyRole($store_id, 'logo', 'img_original');
				//$datosStore->images_data->header = $this->getImagebyRole($store_id, 'header', 'img_original');

				return $datosStore;
			} else {
				return false;
			}
		} else {
			//Error: Faltan datos requeridos
			return false;
		}
	}
	
	public function compraArticulo($params) {
		extract($params); //idArticulo, cantidad

		//strlen($idArticulo) > 0
		if (isset($idArticulo) AND $idArticulo > 0 AND (isset($cantidad) AND $cantidad > 0) AND (isset($contable) AND $contable > 0)) {
			$nunItems = $this->getArticles($idArticulo);
			if ($nunItems >= $cantidad) {
				$dataUpdate = array(
					'cantidad' 	=> $nunItems - $cantidad
				);
				$this->db->set($dataUpdate);
				$this->db->insert('articles');
				$this->db->where('idArticulo', $idArticulo);

				$resultUpdate = $this->db->affected_rows();
				if ($resultUpdate > 0) {
					$dateInset = array(
						'cantidad' 	=> $catidad,
						'contable'	=> $contable 
					);
					$this->db->insert('ventas', $dateInset);

					if ($this->db->affected_rows() > 0) {
						return true;
					}
				}
				return false;
			}
		}
	}// end compraArticulo()

	private function getArticles($idArticulo) {
		$result = array();
		if (isset($idArticulo) AND $idArticulo > 0) {
			$this->db->select('cantidad');
			$this->db->from('articles');
			$this->db->where('idArticulo',$idArticulo);

			$resultSelect = $this->db->get();

			if ($resultSelect->num_rows() > 0) {
				$result = $resultSelect->result();
			}
		}
		return $result;
	}

}// en class
