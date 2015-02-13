<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*Controlador que carga los metodos de las herramientas*/
/*para gestionar los datos que se mandan al library/api*/


  class Welcome extends CI_Controller 
  {

	function __construct()
	{ parent::__construct(); // needed when adding a constructor to a controller
	  $this->load->library('session');	  	  
        }    
/*######################################################################################*/

	/*
	Funcion que ve el estado de la sesion del usuario logeado
	*/	
	public function session()
	{
	 /*
	  $dato['username'] = 'demo';
	  $newdata = array(
                   'username'  => $param['username'],
                   'email'     => 'faus@gmail.com',
                   'logged_in' => TRUE
               );
	    //$this->session->set_userdata($newdata);
	    $session_id = $this->session->userdata('username');
	    $session_email = $this->session->userdata('email');
	    echo "<br>" . $session_id;
	    echo "<br>" . $session_email;	 
	    */
	}

	
	
/*######################################################################################*/	
	
	public function index()
	{
	  $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  { 
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/footers/footer');	    
	  }	  
	  else 
	  { 	      
	    $this->load->view('m1/headers/header1');
	    $this->load->view('m1/logins_view/login_view');
	    $this->load->view('m1/footers/footer_out');  	    
	  }
	  
	}		
	
/*################################################################################*/	
	   public function env_arts()
	  { 
	    $logged_in = $this->session->userdata('logged_in');
	    if( $logged_in== TRUE )
	    {
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/');
	    $this->load->view('m1/footers/footer');
	   }
	   else { $err = $this->set_log(); }
	 }
	   
/*################################################################################*/		
	
public function edit_item()
	{ 
	  $logged_in = $this->session->userdata('logged_in');
	   if( $logged_in== TRUE )
	   {
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/');
	    $this->load->view('m1/footers/footer');   
	    }
	     else { $err = $this->set_log(); }
	   }
	
	
/*################################################################################*/		
	public function new_user() //nuevos usuarios
	{ 
	  $logged_in = $this->session->userdata('logged_in');

	   if( $logged_in== TRUE )
	      {
		  $session_id = $this->session->userdata('username');
		  $data['nombre_usuario']=$session_id;
		  $this->load->view('m1/headers/header2');
		  $this->load->view('m1/logins_view/loged_view',$data);	 
		  $this->load->view('m1/herra_view');
		  $this->load->view('m1/registry_view');//vista de registro
		  $this->load->view('m1/usr_view');					 
		  $this->load->view('m1/inventariado/new_user_view');
		  $this->load->view('m1/footers/footer');
	      }
		else { $err = $this->set_log(); }
	}
	
/*###############################################################################*/	
	
	public function new_user_type()//nuevos tipos de usuario
	{ 
	  $logged_in = $this->session->userdata('logged_in');

	   if( $logged_in== TRUE )
	      {
		  $session_id = $this->session->userdata('username');
		  $data['nombre_usuario']=$session_id;
		  $this->load->view('m1/headers/header2');
		  $this->load->view('m1/logins_view/loged_view',$data);	 
		  $this->load->view('m1/herra_view');
		  $this->load->view('m1/registry_view');//vista de registro
		  $this->load->view('m1/usr_view');					 
		  $this->load->view('m1/inventariado/new_userType_view');
		  $this->load->view('m1/footers/footer');
	      }
		else { $err = $this->set_log(); }
	}
		
	/*Funciones sobre usuarios*/
	

/*################################################################################*/			
	public function users()
	{
	    $logged_in = $this->session->userdata('logged_in');
	    if( $logged_in== TRUE )
	    {
/*  APlicar condiciones de llamadas de usuario */
	      $this->load->library('api');
	      /*PARAMERTROS*/		
			$sitio['user']				=  $_GET['user'];//'demo1';
			$sitio['name']				= $_GET['name'];//'demo1';
	    		$sitio['password']			= $_GET['password'];//'demo1';
	    		$sitio['type']				= 0;
		      /*/PARAMERTROS */
			$this->api->execute_call($sitio);
			$this->new_user_end();	
	    }
	      else { $err = $this->set_log(); }
		
	}
	
/*################################################################################*/		
/*Inventariado Controladores*/
  public function item_gral()
  {
	 $logged_in = $this->session->userdata('logged_in');
	 if( $logged_in== TRUE )
	   {
		  $function = $this->uri->segment(3);			 
		  $this->load->library('api');

		  switch($function)
		  {  
			case "gral":			
			
			 $sitio['idItemType']   = $_GET['idItemType']; /*crear lista desplegable */
	   		 $sitio['amount'] 	= $_GET['amount'];//cantidad
	   		 $sitio['wholeSale']    = $_GET['wholeSale'];//precio
	   		 $sitio['retailPrice']  = $_GET['retailPrice'];//precio a la venta
	   		 
	   		 $sitio['country']     	= $_GET['country'];//pais de procedencia
	   		 $sitio['baseMaterial'] = $_GET['baseMaterial'];//material base
	   		 
	   		 $sitio['idMaterial'] 	= $_GET['idMaterial'];//id material
	   		 
	   		 $sitio['idCodeBar']    = $_GET['idCodeBar'];//codigo de barras
	   		 $sitio['minLevel']     = $_GET['minLevel'];//minimo de producto en el almacebn
	   		 $sitio['iType']     	= $_GET['iType'];//itype
			 $answer = $this->api->execute_call($sitio);
			 echo "estatus del api" . $answer;
			 if($answer===true){  echo "Item almacenado exitosamente"; $this->new_type_end(); }
			 if($answer===-1){ echo "No se pudo almacenar el material";}		 
			 break; 
			 
			 case "tipo": 
			 $sitio['description']  = $_GET['description'];
			 $answer= $this->api->execute_call($sitio);    
			 //echo $answer;
			 if($answer===-1){echo "No se pudo agregar el objeto"; }
			 if($answer===true){  $this->new_type_end();  }
			 break;
			
			case "mat":
			$sitio['description']  = $_GET['description'];		     
			$answer = $this->api->execute_call($sitio);
			echo "status del api: ". $answer;
			if($answer===true){  echo "Material almacenado exitosamente"; 
			$this->new_type_end();
			}
			if($answer===-1){ echo "No se pudo almacenar el material";}		     
			break;		    
			default:	echo "Function Error";
			break;
		    }	
	   }
	      else { $err = $this->set_log(); } //session error
}
/*################################################################################*/		
	/* Vitas finales responsivas de controladores  */
	
		public function new_user_end()//vista final nuevo usuario
		{ 
		 $logged_in = $this->session->userdata('logged_in');
		   if( $logged_in== TRUE )
		    {
			$session_id = $this->session->userdata('username');
			$data['nombre_usuario']=$session_id;
			$this->load->view('m1/headers/header2');
			$this->load->view('m1/logins_view/logins_view/loged_view',$data);
	 	  	$this->load->view('m1/herra_view');
			$this->load->view('m1/inventariado/new_user_end');
			$this->load->view('m1/footers/footer');
		    }
		    else { $err = $this->set_log(); }
		}
/*################################################################################*/			
		public function new_type_end()//vista final inventariado  x tipos
		{ 
		
		 $logged_in = $this->session->userdata('logged_in');
		   if( $logged_in== TRUE )
		    {			
			$session_id = $this->session->userdata('username');
			$data['nombre_usuario']=$session_id;
			$this->load->view('m1/headers/header2');
			$this->load->view('m1/logins_view/loged_view',$data);
	 	  	$this->load->view('m1/herra_view');
			$this->load->view('m1/inventariado/new_type_end');
			$this->load->view('m1/footers/footer');
			echo "<meta http-equiv='Refresh' content='3;url=../../vw/inv_gral#selet'";
		    }
		    else { $err = $this->set_log(); }
		}
		
	
/*################################################################################*/		
	/*Funcion de busqueda*/
	public function getItems(){
	 $logged_in = $this->session->userdata('logged_in');
		   if( $logged_in== TRUE )
		    {	
		    echo "resultado:" . "<br>";
		    /*Recibimos datos del formulario*/
			if(isset($_GET['name']))
			{
			  $sitio['name'] = $_GET['name'];
			}
			else{ $sitio['name'] = 0; }			
// 			$sitio['shortCode']	= $_GET['shortCode'];
			$sitio['parametro']	= $_GET['parametro'];
			$sitio['advance']	= $_GET['advance'];
			$this->load->library('api');			
			$result = $this->api->getItems($sitio);
			$result_array['result'] =$result;			
			/*Mostramos resultados  de busqueda*/
			$session_id = $this->session->userdata('username');
			$data['nombre_usuario']=$session_id;
			$this->load->view('m1/headers/header2');
			$this->load->view('m1/logins_view/loged_view',$data);
	 	  	$this->load->view('m1/herra_view');
			$this->load->view('m1/result_views/busi_view',$result_array);			
			$this->load->view('m1/footers/footer_busq');			
		    }
		    else { $err = $this->set_log(); }
	}
	
	/*Fin de Funcion de busqueda*/
/*################################################################################*/	


	public function valid()//us validation
	{
	  $sitio['user'] = trim($_POST['user']);
	  $sitio['password'] = trim($_POST['password']);	  
	  /*api is correct user*/
	  $this->load->library('api');
	  $valor=$this->api->validation($sitio);
	  if($valor==1)
	  {
	   $dato['username'] = $sitio['user'] ;
	   $newdata = array(
                   'username'  => $dato['username'],
                   'email'     => 'mesi@gmail.com',
                   'logged_in' => TRUE
               );
	   $this->session->set_userdata($newdata);
	   $session_id = $this->session->userdata('username');	  
	   //echo $session_id ;
	   echo "Bienvenido : " .$session_id; 
	  }
	}
/*#####################################################################################*/
public function removeCache()
    {
        $this->output->set_header('Last-Modified:'.gmdate('D, d M Y H:i:s').'GMT');
        $this->output->set_header('Cache-Control: no-store, no-cache, must-revalidate');
        $this->output->set_header('Cache-Control: post-check=0, pre-check=0',false);
        $this->output->set_header('Pragma: no-cache');
    }


	
	
/*################################################################################*/		
	
	public function close_session()
	{
	  echo "<h1> Cerraste sesión</h1> ";
	  $this->session->sess_destroy();
	  $this->removeCache();
	  
	  
	  header('Location: ../../../kontrol/index.php/welcome/index');
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */