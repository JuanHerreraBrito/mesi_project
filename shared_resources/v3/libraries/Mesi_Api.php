<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mesi_Api {

	public function __construct()
	{
		ini_set('display_errors', 1);
		error_reporting(-1);
	}

    public function execute_call($sitio = false)
    {
    	$self =& get_instance();

    	$function = $self->uri->segment(2);

    	switch($function){

			case "stores":
				$self->benchmark->mark('code_start');
				$result = $this->stores_api($sitio);
				$self->benchmark->mark('code_end');
				$this->build_response($result, $function);
				break;
			case "items":
				$self->benchmark->mark('code_start');
				$result = $this->items_api($sitio);
				$self->benchmark->mark('code_end');
				$this->build_response($result, $function);
				break;
			case "cop":
				$self->benchmark->mark('code_start');
				$result = $this->cop_api($sitio);
				$self->benchmark->mark('code_end');
				$this->build_response($result, $function);
				break;
			case 'promotion':
				$self->benchmark->mark('code_start');
				$result = $this->promotion_api($sitio);
				$self->benchmark->mark('code_end');
				$this->build_response($result, $function);
				break;
			case 'oauth':
				$self->benchmark->mark('code_start');
				$result = $this->oauth_api($sitio);
				$self->benchmark->mark('code_end');
				$this->build_response($result, $function);
				break;
			case 'users':
				$self->benchmark->mark('code_start');
				$result = $this->users_api($sitio);
				$self->benchmark->mark('code_end');
				$this->build_response($result, $function);
				break;
			default:
				echo "Function Error";
				break;
		}


    }

    private function build_response($result,$function){
		$self =& get_instance();

		$response = array();
		$response['status'] = 'OK';
		$response['function'] = $self->uri->segment(2).'/'.$self->uri->segment(3);
		$response['response_time'] = $self->benchmark->elapsed_time('code_start', 'code_end');
		$response['result_count'] = count($result);
		$response['data'] = $result;
		//print_r($response);
	    //Parsear response para colocar headers de columnas
		if( sizeof($response['data'])>0 && (is_array($response['data']) || is_object($response['data'])) && $response['data']!==false ) {
			$response['header_col_names'] = array();
			$storedHeader = array();
			foreach( $response['data'] as $indiceDato => $renglon ) {
				//Para cada renglon, obtener nombres de primera capa de datos
				if( is_array($renglon) ) {
					$renglonObjecto = (object) $renglon;
				} else {
					$renglonObjecto = $renglon;
				}
				if( is_object($renglonObjecto) ) {
					foreach( $renglonObjecto as $indiceCampo => $campo ) {
						if( !in_array($indiceCampo, $storedHeader) && $indiceCampo!='' ) {
							$response['header_col_names'][] = new stdClass;
							$headerCount = sizeof($response['header_col_names'])-1;
							$response['header_col_names'][$headerCount] = new stdClass;
							$response['header_col_names'][$headerCount]->name = $indiceCampo;
							$response['header_col_names'][$headerCount]->label = ucwords(str_replace('_', ' ', $indiceCampo));
							$response['header_col_names'][$headerCount]->order = $headerCount+1;
							$storedHeader[] = $indiceCampo;
						}
					}
				}
			}
		}
	    echo json_encode($response);
    }
	
	private function items_api($sitio){
	    
	    $self =& get_instance();
	    $self->load->model('../../../../shared_resources/v3/models/items_model', 'Items_model', true);
	    
	    $call_function = $self->uri->segment(3);
    	switch($call_function){
			case "get_categories":
				$params['store_id'] = $self->input->post('store_id');
				$params['sitio']	= $sitio;
				$result = $self->Items_model->get_categories($params);
				break;
		}
		return $result;
	}// end items_api()

	private function users_api($sitio)	{
		$self =& get_instance();
	    $self->load->model('../../../../shared_resources/v3/models/users_model', 'Users_model', true);

	    $call_function = $self->uri->segment(3);
	    switch ($call_function) {
	    	case 'createUser':
	    		$params['name']				= $self->input->post('name');
	    		$params['password']			= $self->input->post('password');
	    		$params['type']				= $self->input->post('type');
	    		$params['id_type']			= $self->input->post('id_type');
	    		$params['user']				= $self->input->post('user');
	    		$result 					= $self->Users_model->createUser($params);
	    		break;
	    	case 'createUserType':
	    		$params['description']		= $self->input->post('description');
	    		$result 					= $self->Users_model->createUserType($params);
	    		break;
	    	case 'isAvalibleUser':
	    		$params['user']				= $self->input->post('user');
	    		$result 					= $self->Users_model->isAvalibleUser($params);
	    		break;
	    	case 'isCorrectUser':
	    		$params['nUser']			= $self->input->post('nUser');
	    		$params['pass']				= $self->input->post('pass');
	    		$result 					= $self->Users_model->isCorrectUser($params);
	    		break;
	    }
	    return $result;
	}// end users_api()


}// end Mesi_Api