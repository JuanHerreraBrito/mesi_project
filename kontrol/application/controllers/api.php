<?php

class Api extends CI_Controller {

	private $sitio = 'sell';

	function __construct()
	{
		parent::__construct();
	}
	
	public function route(){
		
		if($function = $this->uri->segment(2)){
			switch($function){
				default:
					$this->api_call();
					break;
			} 
		} else {
			echo "API";
		}
	}
	
	public function index(){
		echo "Kichink Api v1";
	}
	
	public function api_call(){
		//echo getcwd(); exit;
		include('../../../shared_resources/v3/libraries/Mesi_Api.php');
		$api = new Mesi_Api;
		$api->execute_call($this->sitio);
		
	}
	
	
	public function prueba_shared()
	{
	  echo "yo soy una prueba de inclusion de shared_resources";
	  //include('../shared_resources/v3/libraries/mesi.php');
	 // $this->load->view('../shared_resources/v3/libraries/mesi.php');
	    $this->load->view('../../../shared_resources/v3/views/entrada_pdf.php');
	  
	}
	
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */