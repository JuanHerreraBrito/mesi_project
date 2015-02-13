<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class OAuth_model extends CI_Model {
	 
	function __construct() {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }

    /**
     * Crea un nuevo usuario en la base de datos para poder generar un token provisional para el ususario
     *
     * @method json createUser()
     */
    public function createUser($params) {
    	extract($params);

    	if (isset($client_id) AND strlen($client_id) > 0 AND (isset($client_secret) AND strlen($client_secret) > 0)
    		AND (isset($redirect_uri) AND strlen($redirect_uri) > 0)) {
    		$data_insert = array(
    			'client_id'			=> $client_id,
    			'client_secret'		=> $client_secret,
    			'redirect_uri'		=> $redirect_uri
    		);

    		$this->db->insert('oauth_clients', $data_insert);

    		$resultInsert = $this->db->affected_rows();
			if ($resultInsert > 0) {
				return true;
			}// end if
			return false;
    	}// end if
    }// end createUser()

    public function comproveCorrectUser($params) {
        
    }

}// end class

?>