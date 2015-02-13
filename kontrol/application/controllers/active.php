<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Active extends CI_Controller {

	
	
	public function index()
	{
	
	 echo " <h1>FORBIDDEN: Error 404</h1>";
	 echo "<br>";
	 echo "MESSI PAGE: unActive";
	     
	}
	

	
	public function users(){
	
	
	/*  APlicar condiciones de llamadas de usuario */
	  $this->load->library('api');
	  /*PARAMERTROS*/
			$params['name']				= 'demo';
	    		$params['password']			= 'demo';
	    		$params['type']				= 0;
	    		$params['id_type']			= 0;
	    		$params['user']				= 'demo';
	    		
	  
	  /*/PARAMERTROS */
	  
	  $this->api->execute_call($params);
		
	}




	public function mus()
	{
			echo "Tabla de usuarios" . "<br>";
			
			$query = $this->db->query('SELECT * FROM Users');
			
			foreach ($query->result() as $row)
			{
   					echo $row->name;
   					echo "||" ;
   					echo $row->password;
   					echo "||" ;
   					echo $row->user;
   					echo "<hr>";
   			
				}
		
	}
	
	
	public function valid()
	{
	  $user = trim($_POST['user']);
	  if($user=='demo')
	  {
	    
	    echo '1';
	  }
	  
	  
	}
	
	
}

/* End of file active.php */
/* Location: ./application/controllers/active.php */