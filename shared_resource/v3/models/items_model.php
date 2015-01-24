<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Items_model extends CI_Model {


    function __construct()
    {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }

	function get_categories($params) {
		extract($params);

		switch ($sitio) {
			case 'sell':
				$response = $this->get_categories_sell($params);
				break;
			case 'www':
				$response = $this->get_categories_www($params);
				break;

			default:
				$response =  array( '3rrC' => 0 , '3rr' => 'Error sitio_'.$sitio);
				break;
		}

		return $response;
	}
	private function get_categories_sell($params) {
		extract($params);
		if( isset($store_id) ) {
			//Obtener categorias de tienda
			$this->db->select('id, name');
			$this->db->from('categories');
			$this->db->where(array('store_id'=>$store_id, 'active'=>1));
			$this->db->order_by('order_id', 'asc');
			$resultadoObtenerCategorias = $this->db->get();
			if( $datosObtenerCategorias = $resultadoObtenerCategorias->result() ) {
				$paramsCategoryTree = Array();
				$paramsCategoryTree['store_id'] = $store_id;
				$paramsCategoryTree['parent_id'] = 'NULL';
				$datosCategoriasHijas = array();
				return $datosCategoriasHijas;
			} else {
				//No existen categorias
				return false;
			}
		} else {
			//Faltan datos requeridos
			return false;
		}
	}
}
