 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 /*Controlador que carga las vistas de Herramientas*/
 class Vw extends CI_Controller 
{	
    function __construct()
	{ parent::__construct(); // needed when adding a constructor to a controller
	  $this->load->library('session');	  	  
        }    
/*####################################################################################*/
	public function index()
	{
	  $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  { $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/footers/footer');	    
	  }	  
	  else 
	  { $this->load->view('m1/headers/header1');
	    $this->load->view('m1/logins_view/login_view');
	    $this->load->view('m1/footers/footer_out');  
	  }  
	}		
/*####################################################################################*/
	public function set_log()//out of session
	{
	  $this->load->view('m1/headers/header1');
	  $this->load->view('m1/logins_view/login_view');
	  $this->load->view('m1/set_log');
	  $this->load->view('m1/footers/footer_out');
	}
/*#################################################################################*/	
/*  Session STARTED          */
	public function active_ar()//VISTA PRINCIPAL 
	{ $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  { $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/footers/footer');    
	  }else { $err = $this->set_log(); }
	     
	}
/*################################################################################*/		
	public function impe()//Impresion de etiquetas VISTA
	{
	 $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  {
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']= $session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/impe');
	    $this->load->view('m1/footers/footer');
	  }else { $err = $this->set_log(); }
	}	
/*#################################################################################*/		
	public function busi() //busqueda de Items VISTA
	{ 
	 $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  {
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/busi');
	    $this->load->view('m1/footers/footer_busq');
	  }else { $err = $this->set_log(); }
	 }
/*################################################################################*/		   
	 /* Vistas de Registro*/  
      public function registry_view()//registro_vista_principal
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
	  $this->load->view('m1/footers/footer');
	}else { $err = $this->set_log(); } 	 
      }
/*################################################################################*/		   
      public function registro_proveedores()//registro_proveedores_vista
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
	  $this->load->view('m1/registro_proveedores_view');//vista de registro
	  $this->load->view('m1/footers/footer');
	}else { $err = $this->set_log(); }
     }	   
/*################################################################################*/		   
      public function registro_sucursales()//registro_sucursales_vista
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
	  $this->load->view('m1/registro_sucursales_view');//vista de registro
	  $this->load->view('m1/footers/footer');
	}else { $err = $this->set_log(); }
      }   
/*################################################################################*/		   
      public function inventa()//inventariado VISTA
      {
	$logged_in = $this->session->userdata('logged_in');
	if( $logged_in== TRUE )
	{
	  $session_id = $this->session->userdata('username');
	  $data['nombre_usuario']=$session_id;
	  $this->load->view('m1/headers/header2');
	  $this->load->view('m1/logins_view/loged_view',$data);
	  $this->load->view('m1/herra_view');				
	  $this->load->view('m1/inv_view');//
	  $this->load->view('m1/footers/footer');
	}else { $err = $this->set_log(); } 	 
      } 
/*################################################################################*/		   
/*Fin de Métodos de Registro*/	   
      public function inv_selec()//inventariado VISTA
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
	  $this->load->view('m1/inv_view');//
	  $this->load->view('m1/footers/footer');
	} else { $err = $this->set_log(); } 	 
      }
/*################################################################################*/		   
      public function inv()//inventariado VISTA
      {
	$logged_in = $this->session->userdata('logged_in');
	if( $logged_in== TRUE )
	{
	  $session_id = $this->session->userdata('username');
	  $data['nombre_usuario']=$session_id;
	  $this->load->view('m1/headers/header2');
	  $this->load->view('m1/logins_view/loged_view',$data);
	  $this->load->view('m1/herra_view');				
	  $this->load->view('m1/inv_view');//
	  $this->load->view('m1/footers/footer');
	} else { $err = $this->set_log(); }	 
      }
/*################################################################################*/	
      public function inv_suc()//inventario por sucursal VISTA
      {
	$logged_in = $this->session->userdata('logged_in');
	if( $logged_in== TRUE )
	{
	  $session_id = $this->session->userdata('username');
	  $data['nombre_usuario']=$session_id;
	  $this->load->view('m1/headers/header2');
	  $this->load->view('m1/logins_view/loged_view',$data);
	  $this->load->view('m1/herra_view');
	  $this->load->view('m1/registry_view');
	  $this->load->view('m1/inv_view');
	  $this->load->view('m1/inventariado/inv_view_suc');
	  $this->load->view('m1/footers/footer');
	} else { $err = $this->set_log(); }
     }
/*################################################################################*/		   
      public function inv_tipo()//inventario por tipo VISTA
      {
	$logged_in = $this->session->userdata('logged_in');
	if( $logged_in== TRUE )
	{
	  $session_id = $this->session->userdata('username');
	  $data['nombre_usuario']=$session_id;
	  $this->load->view('m1/headers/header2');
	  $this->load->view('m1/logins_view/loged_view',$data);
	  $this->load->view('m1/herra_view');
	  $this->load->view('m1/registry_view');
	  $this->load->view('m1/inv_view');
	  $this->load->view('m1/inventariado/inv_view_tipo');
	  $this->load->view('m1/footers/footer');
	} else { $err = $this->set_log(); }
     }
/*################################################################################*/	
	   		public function inv_gral()//inventario General_vista
	   		{
			   $logged_in = $this->session->userdata('logged_in');
				   if( $logged_in== TRUE )
					{
					      //listamos los tipos de items
					      
					      /*$this->load->library('api');
					
					      $result=$this->api->itemsTypes_list();*/
					$session_id = $this->session->userdata('username');
					$data['nombre_usuario']=$session_id;
					$this->load->view('m1/headers/header2');
					$this->load->view('m1/logins_view/loged_view',$data);
	  				$this->load->view('m1/herra_view');
	  				$this->load->view('m1/registry_view');
				   	$this->load->view('m1/inv_view');
				   	$this->load->view('m1/inventariado/inv_view_gral');
	   				$this->load->view('m1/footers/footer01');
	   				}
				      else { $err = $this->set_log(); }
	   		}				  
/*################################################################################*/		   		
	   		public function inv_mat()//inventario por materiales_vista
	   		{
			   $logged_in = $this->session->userdata('logged_in');

				   if( $logged_in== TRUE )
					{
					  $session_id = $this->session->userdata('username');
					  $data['nombre_usuario']=$session_id;
					  $this->load->view('m1/headers/header2');
					  $this->load->view('m1/logins_view/loged_view',$data);
	 				  $this->load->view('m1/herra_view');
	 				  $this->load->view('m1/registry_view');
					  $this->load->view('m1/inv_view');					  
					  $this->load->view('m1/inventariado/inv_view_mat');					 
					  $this->load->view('m1/footers/footer');
	   				}
				      else { $err = $this->set_log(); }	      	   			
	   		}	   			   		
/*################################################################################*/		   			   		
	   		public function inv_usr()//edicion de usuarios_vista
	   		{
			   $logged_in = $this->session->userdata('logged_in');
			    if( $logged_in== TRUE )
			    {
					  $session_id = $this->session->userdata('username');
					  $data['nombre_usuario']=$session_id;
					  $this->load->view('m1/headers/header2');
					  $this->load->view('m1/logins_view/loged_view',$data);
	 				  $this->load->view('m1/herra_view');
	 				  $this->load->view('m1/registry_view');
					  $this->load->view('m1/usr_view');					  
					  $this->load->view('m1/footers/footer');
	   				}
				      else { $err = $this->set_log(); }	      	   			
	   		}	   		
/*################################################################################*/	
public function mus()//muestra a los usuarios en el sistema_vista
	{		  
	  $logged_in = $this->session->userdata('logged_in');
	  if( $logged_in== TRUE )
	  {
	    $session_id = $this->session->userdata('username');
	    $data['nombre_usuario']=$session_id;
	    $this->load->view('m1/headers/header2');
	    $this->load->view('m1/logins_view/loged_view',$data);
	    $this->load->view('m1/herra_view');
	    $this->load->view('m1/mus_view');
	    $this->load->view('m1/footers/footer');
	  }
	     else { $err = $this->set_log(); }		
	}
/*###############################################################################*/	    
}