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

	public function createItem($params) {
		if (isset($mount) AND $mount > 0 AND ($)) {
			
		}
	}
	
}// end Items_model