<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {
	
	function __construct(){
        parent::__construct(); // needed when adding a constructor to a controller
	  $this->load->library('session');	  	  
        }    
	
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
	
	public function index()
		{ 
	  $this->load->view('m1/header1');
	  $this->load->view('m1/login_view');
	  $this->load->view('m1/footer_out');  
		}
		
		
		
		public function faq()
	{
	  $this->load->view('m1/faq_view');
	}
	
	
	
	public function set_log()//out of session
	{
	  $this->load->view('m1/header1');
			$this->load->view('m1/set_log');
			$this->load->view('m1/footer_out');
	}
	
	/*  Session STARTED          */
	public function active_ar()//VISTA PRINCIPAL (limitada por tipo de usuario)
	{ 
	
	  
	    $logged_in = $this->session->userdata('logged_in');

	  if( $logged_in== TRUE )
	  {
	  
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/header2');
	    $this->load->view('m1/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/footer');
	    
	  }
	  
	    else { $err = $this->set_log(); }
	     
	}
		
	public function impe()//Impresion de etiquetas VISTA
	{
	
	 $logged_in = $this->session->userdata('logged_in');

	  if( $logged_in== TRUE )
	  {
	    $session_id = $this->session->userdata('username');
	  $data['nombre_usuario']= $session_id;
	 
	  $this->load->view('m1/header2');
	  $this->load->view('m1/loged_view',$data);
	  $this->load->view('m1/herra_view');
	   $this->load->view('m1/impe');
	   $this->load->view('m1/footer');
	  }
	    
	  else { $err = $this->set_log(); }
	  
	 
	 }
	
	
	public function busi() //busqueda VISTA
	{ 
	 $logged_in = $this->session->userdata('logged_in');

	  if( $logged_in== TRUE )
	  {
	    $session_id = $this->session->userdata('username');
	 $data['nombre_usuario']=$session_id;
	  $this->load->view('m1/header2');
	   $this->load->view('m1/loged_view',$data);
	 
	  $this->load->view('m1/herra_view');
	   $this->load->view('m1/busi');
	   $this->load->view('m1/footer');
	  }
	 else { $err = $this->set_log(); }
	 
	 }
	   
	 
	 
	 
	 
	   
	   public function inventa()//inventariado VISTA
	  {
	       $logged_in = $this->session->userdata('logged_in');

	    if( $logged_in== TRUE )
	      {
	        $session_id = $this->session->userdata('username');
		$data['nombre_usuario']=$session_id;
		$this->load->view('m1/header2');
		$this->load->view('m1/loged_view',$data);
		$this->load->view('m1/herra_view');				
		$this->load->view('m1/inv_view');//
		$this->load->view('m1/footer');
		
		
	      }
	      else { $err = $this->set_log(); }
	  	 
	 }
	 
	 
	   
	   
	 /*Métodos de Registro*/  
	   
	   
	      public function registry_view()//registro_vista
	  {
	       $logged_in = $this->session->userdata('logged_in');

	    if( $logged_in== TRUE )
	      {
	        $session_id = $this->session->userdata('username');
		$data['nombre_usuario']=$session_id;
		$this->load->view('m1/header2');
		$this->load->view('m1/loged_view',$data);
		$this->load->view('m1/herra_view');				
		$this->load->view('m1/registry_view');//vista de registro
		$this->load->view('m1/footer');
		
		
	      }
	      else { $err = $this->set_log(); }
	  	 
	 }
	   
	   
	   
		public function registro_proveedores()//registro_vista
		      {
			$logged_in = $this->session->userdata('logged_in');
			if( $logged_in== TRUE )
			{
			  $session_id = $this->session->userdata('username');
			  $data['nombre_usuario']=$session_id;
			  $this->load->view('m1/header2');
			  $this->load->view('m1/loged_view',$data);
			  $this->load->view('m1/herra_view');				
			  $this->load->view('m1/registry_view');//vista de registro
			    $this->load->view('m1/registro_proveedores_view');//vista de registro
			  $this->load->view('m1/footer');
			}
			else { $err = $this->set_log(); }
		      }
	   
	   
	   
	   
	   	public function registro_sucursales()//registro_vista
		      {
			$logged_in = $this->session->userdata('logged_in');
			if( $logged_in== TRUE )
			{
			  $session_id = $this->session->userdata('username');
			  $data['nombre_usuario']=$session_id;
			  $this->load->view('m1/header2');
			  $this->load->view('m1/loged_view',$data);
			  $this->load->view('m1/herra_view');				
			  $this->load->view('m1/registry_view');//vista de registro
			    $this->load->view('m1/registro_sucursales_view');//vista de registro
			  $this->load->view('m1/footer');
			}
			else { $err = $this->set_log(); }
		      }
	   
	   
	   
	   
	   
	   
	/*Fin de Métodos de Registro*/	   
	   
	   
	      
	   public function inv_selec()//inventariado VISTA
	  {
	       $logged_in = $this->session->userdata('logged_in');

	    if( $logged_in== TRUE )
	      {
	        $session_id = $this->session->userdata('username');
		$data['nombre_usuario']=$session_id;
		$this->load->view('m1/header2');
		$this->load->view('m1/loged_view',$data);
		$this->load->view('m1/herra_view');
		  $this->load->view('m1/registry_view');//vista de registro
		$this->load->view('m1/inv_view');//
		$this->load->view('m1/footer');
		
		
	      }
	      else { $err = $this->set_log(); }
	  	 
	 }
	   
	   
	   
	   
	   
	   
	   public function inv()//inventariado VISTA
	  {
	       $logged_in = $this->session->userdata('logged_in');

	    if( $logged_in== TRUE )
	      {
	        $session_id = $this->session->userdata('username');
		$data['nombre_usuario']=$session_id;
		$this->load->view('m1/header2');
		$this->load->view('m1/loged_view',$data);
		$this->load->view('m1/herra_view');				
		$this->load->view('m1/inv_view');//
		$this->load->view('m1/footer');
		
		
	      }
	      else { $err = $this->set_log(); }
	  	 
	 }


	   		public function inv_suc()//inventario por sucursal VISTA
	   		{ 	
			  $logged_in = $this->session->userdata('logged_in');

			  if( $logged_in== TRUE )
			    {
			      $session_id = $this->session->userdata('username');
			      $data['nombre_usuario']=$session_id;
			      $this->load->view('m1/header2');
			      $this->load->view('m1/loged_view',$data);
	 
	  			$this->load->view('m1/herra_view');
	  			$this->load->view('m1/registry_view');
				$this->load->view('m1/inv_view');
				$this->load->view('m1/inventariado/inv_view_suc');
	   			$this->load->view('m1/footer');
			     }
	  
			    else { $err = $this->set_log(); }
      
	   		}

	   

	   				public function inv_tipo()//inventario por tipo VISTA
	   				 {
	   				 
	   				 $logged_in = $this->session->userdata('logged_in');

					  if( $logged_in== TRUE )
					  {
					    $session_id = $this->session->userdata('username');
					    $data['nombre_usuario']=$session_id;
					    $this->load->view('m1/header2');
					    $this->load->view('m1/loged_view',$data);
	 
					    $this->load->view('m1/herra_view');
					    $this->load->view('m1/registry_view');
					    $this->load->view('m1/inv_view');
					    $this->load->view('m1/inventariado/inv_view_tipo');
					    $this->load->view('m1/footer');
					  }
	  
				else { $err = $this->set_log(); }
      
	   			
	   		}



			  
	   		public function inv_gral()//inventario General
	   		{
			   $logged_in = $this->session->userdata('logged_in');

				   if( $logged_in== TRUE )
					{
					      //listamos los tipos de items
					      
					/*$this->load->library('api');
					
					$result=$this->api->itemsTypes_list();*/
					
					
					 $session_id = $this->session->userdata('username');
					$data['nombre_usuario']=$session_id;
					$this->load->view('m1/header2');
					$this->load->view('m1/loged_view',$data);
	  				$this->load->view('m1/herra_view');
	  				$this->load->view('m1/registry_view');
				   	$this->load->view('m1/inv_view');
				   	$this->load->view('m1/inventariado/inv_view_gral');
	   				$this->load->view('m1/footer01');
	   				}
				      else { $err = $this->set_log(); }
      
	   			
	   		}
				  
				  
	   		
	   		
	   		
	   		public function inv_mat()//inventario por materiales
	   		{
			   $logged_in = $this->session->userdata('logged_in');

				   if( $logged_in== TRUE )
					{
					  $session_id = $this->session->userdata('username');
					  $data['nombre_usuario']=$session_id;
					  $this->load->view('m1/header2');
					  $this->load->view('m1/loged_view',$data);
	 				  $this->load->view('m1/herra_view');
	 				  $this->load->view('m1/registry_view');
					  $this->load->view('m1/inv_view');
					  
					  $this->load->view('m1/inventariado/inv_view_mat');
					  
					  $this->load->view('m1/footer');
	   				}
				      else { $err = $this->set_log(); }	
      
	   			
	   		}
	   		
	   		


	   
	   public function env_arts()
	{ 
	 $logged_in = $this->session->userdata('logged_in');

	   if( $logged_in== TRUE )
					{
					  $session_id = $this->session->userdata('username');
					$data['nombre_usuario']=$session_id;
	     $this->load->view('m1/header2');
	   $this->load->view('m1/loged_view',$data);
	 
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/');
	    $this->load->view('m1/footer');
	   }
	   else { $err = $this->set_log(); }
	 }
	   
	
	
public function edit_item()
	{ 
	 $logged_in = $this->session->userdata('logged_in');

	   if( $logged_in== TRUE )
					{
					  $session_id = $this->session->userdata('username');
					$data['nombre_usuario']=$session_id;
	     $this->load->view('m1/header2');
	   $this->load->view('m1/loged_view',$data);
	 
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/');
	    $this->load->view('m1/footer');
	    
	    }
	     else { $err = $this->set_log(); }
	    
	    
	   }
	
	
	
	public function new_user()
	{ 
	  $logged_in = $this->session->userdata('logged_in');

	   if( $logged_in== TRUE )
	      {
		  $session_id = $this->session->userdata('username');
		  $data['nombre_usuario']=$session_id;
		  $this->load->view('m1/header2');
		  $this->load->view('m1/loged_view',$data);	 
		  $this->load->view('m1/herra_view');
		  $this->load->view('m1/registry_view');//vista de registro
		  $this->load->view('m1/inventariado/new_user_view');
		  $this->load->view('m1/footer');
	      }
		else { $err = $this->set_log(); }
	}
	
	

	
	
	/*Funciones sobre usuarios*/
	
	

	public function mus()//muestra a los usuarios en el sistema
	{		  
	  $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  {
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/header2');
	    $this->load->view('m1/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/mus_view');
	    $this->load->view('m1/footer');
	  }
	     else { $err = $this->set_log(); }
		
	}
	
	
	
	
		
	
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
	   		 
	   		 $sitio['idCodeBar']    = $_GET['idCodeBar'];//codigo de barras
	   		 $sitio['minLevel']     = $_GET['minLevel'];//minimo de producto en el almacebn
	   		 $sitio['iType']     	= $_GET['iType'];//itype
			 $answer = $this->api->execute_call($sitio);
			 echo "estatus del api" . $answer;
			if($answer===true){  echo "Material almacenado exitosamente";  }
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
		     if($answer===true){  echo "Material almacenado exitosamente";  }
		     if($answer===-1){ echo "No se pudo almacenar el material";}
		     
		     
		     
		     
		      break;		    
		     default:	echo "Function Error";
		     break;
	   		 		

		    }	
	   		 		
	   	
	   }
	      else { $err = $this->set_log(); } //session error

 

}




	
	
	
	
	/* Vitas finales responsivas de controladores  */
	
		public function new_user_end()//vista final nuevo usuario
		{ 
		 $logged_in = $this->session->userdata('logged_in');
		   if( $logged_in== TRUE )
		    {
			$session_id = $this->session->userdata('username');
			$data['nombre_usuario']=$session_id;
			$this->load->view('m1/header2');
			$this->load->view('m1/loged_view',$data);
	 	  	$this->load->view('m1/herra_view');
			$this->load->view('m1/inventariado/new_user_end');
			$this->load->view('m1/footer');
		    }
		    else { $err = $this->set_log(); }
		}
		
		
		
		public function new_type_end()//vista final inventariado  x tipos
		{ 
		
		 $logged_in = $this->session->userdata('logged_in');
		   if( $logged_in== TRUE )
		    {			
			$session_id = $this->session->userdata('username');
			$data['nombre_usuario']=$session_id;
			$this->load->view('m1/header2');
			$this->load->view('m1/loged_view',$data);
	 	  	$this->load->view('m1/herra_view');
			$this->load->view('m1/inventariado/new_type_end');
			$this->load->view('m1/footer');
			echo "<meta http-equiv='Refresh' content='1;url=http://localhost/~lionband/kontrol/index.php/welcome/inv#selet'";
			
			
		    }
		    else { $err = $this->set_log(); }
		}
		
	
	
	/*Funcion de busqueda*/
	public function getItems(){
	
	 $logged_in = $this->session->userdata('logged_in');
		   if( $logged_in== TRUE )
		    {	
		    echo "resultado:" . "<br>";
			$this->load->library('api');
			$sitio='piel';
			$this->api->getItems($sitio);
			
			
		    }
		    else { $err = $this->set_log(); }
	
	
	
	}
	
	/*Fin de Funcion de busqueda*/
	
	
	/*DomPDF*/
	public function pdf()
	{
	    $this->load->library('html2pdf');
	    $params['cadena'] = "YO SOY LA IMPRESIO";
	  $result=  $this->html2pdf->Html2pdf($params);
	  
	}
	
	/*fIN DOMPDF*/
	
	
	/*Funciones de valor*/
	
	public function valid()//us validation
	{
	  $sitio['user'] = trim($_POST['user']);
	$sitio['password'] = trim($_POST['password']);
	  
	  
	  /*api is correct user*/
	  $this->load->library('api');
	  $valor=$this->api->validation($sitio);
	
	  
	  
	 

	   if($valor==1){
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
	
	
	public function close_session()
	{
	  $this->session->sess_destroy();
	  echo "<h1> Cerraste sesión</h1> ";
	  sleep(5);
	  header('Location: ../../../kontrol/index.php/welcome/index');
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */