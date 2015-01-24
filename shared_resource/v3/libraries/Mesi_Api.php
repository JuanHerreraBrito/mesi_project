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

    private function stores_api($sitio){
	   

	    $self =& get_instance();
	    $self->load->model('../../../../shared_resources_clean/v3/models/stores_model', 'Stores_model', true);
	    $stores = false;

	    $call_function = $self->uri->segment(3);
    	switch($call_function){
			case "get_store_details":
				$params['store_id']		= $self->input->post('store_id');
				$params['sitio']		= $sitio;
				$result = $self->Stores_model->get_store_details($params);
				break;
			
			case "get_store_items":
				$params['sitio']		= $sitio;
				$params['store_id']		= $self->input->post('store_id');
				$params['cat_id']		= $self->input->post('cat_id');
				$params['search']		= $self->input->post('search');
				$params['search_price']	= $self->input->post('search_price');
				$params['item_id']		= $self->input->post('item_id');
				$params['offset']		= $self->input->post('offset');
				$params['limit']		= $self->input->post('limit');
				$params['crit_cats']	= $self->input->post('crit_cats');
				$params['catsand']		= $self->input->post('catsand');
				$params['catsor']		= $self->input->post('catsor');
				$params['catsandor']	= $self->input->post('catsandor');
				$result = $self->Stores_model->get_store_items($params);
				break;
			case 'compraArticulo':
				$params['idArticulo']	= $self->input->post('idArticulo');
				$params['cantidad']		= $self->input->post('cantidad');
				$params['contable']		= $self->input->post('contable');
				$result 				= $self->Stores_model->compraArticulo($params);
				break;
		}
		return $result;
	}
	
	private function items_api($sitio){
	    
	    $self =& get_instance();
	    $self->load->model('../../../../shared_resources_clean/v3/models/items_model', 'Items_model', true);
	     $stores = false;

	    $call_function = $self->uri->segment(3);
    	switch($call_function){
			case "get_categories":
				$params['store_id'] = $self->input->post('store_id');
				$params['sitio']	= $sitio;
				$result = $self->Items_model->get_categories($params);
				break;
		}
		return $result;
	}

	private function cop_api($sitio){
	    

	    $self =& get_instance();
	    $self->load->model('../../../../shared_resources_clean/v3/models/cop_model', 'Cop_model', true);

	    $call_function = $self->uri->segment(3);
    	switch($call_function){
			case "getDataFromStoresAndItems":
				$params['store_id'] = $self->input->post('store_id');
				$result 			= $self->Cop_model->get_intersting_cop_dates($params);
				break;
			case "getCitas":
				$params['selct_day']	= $self->input->post('selct_day');
				$result 				= $self->Cop_model->get_citas($params);
			case "insert_cita_cop":
				$params['store_id'] 	= $self->input->post('store_id');
				$params['day']			= $self->input->post('dia_cita');
				$params['user_id']		= ($self->session->userdata('user_id')) ? $self->session->userdata('user_id') : 1;
				$params['telephone']	= $self->input->post('telephone');
				$params['email']		= $self->input->post('email');
				$params['contact']		= $self->input->post('contact');
				$result 				= $self->Cop_model->insert_cop_citas($params);
				break;
			case "insert_units":
				$params['store_id'] 	= $self->input->post('store_id');
				$params['units']		= $self->input->post('units');
				$params['items_id']		= $self->input->post('items_id');
				$result 				= $self->Cop_model->insert_items_units($params);
				break;
			case "generate_pdf":
				$params['store_id']		= $self->input->post('store_id');
				$params['idCop']		= $self->input->post('idCop');
				$result 				= $self->Cop_model->generatePDF($params);
				break;
		}

		return $result;
	}
	/*
	 * Dejamos comentarios por doquier, commentarios sobre todo, sobre nuestras actividades diarioas
	 * sobre las cosas que hacemos, sobre las coasa que vemos, en fìn sobre todo. Y yo me pregunto, aguien dejara 
	 * comentarios sobre los comentarios que hace....
	 * Seguramente así es, ya que el hegocentrismo de la raza humana es de muchas maneras demasiado y descaradamente 
	 * alto.
	 */

	private function promotion_api($sitio) {
		$self =& get_instance();
	    $self->load->model('../../../../shared_resources_clean/v3/models/promotions_model', 'Promotions_model', true);

	    $call_function = $self->uri->segment(3);
	    switch ($call_function) {
	    	case 'createPromotion':
	    		$params['titulo']		= $self->input->post('titulo');
	    		$params['fechaInicio']	= $self->input->post('fechaInicio');
	    		$params['fechaFinal']	= $self->input->post('fechaFinal');
	    		$params['porcentaje']	= $self->input->post('porcentaje');
	    		$params['descripcion']	= $self->input->post('descripcion');
	    		$result 				= $self->Promotions_model->createPromotion($params);
	    		break;
	    	case 'getAllPromotions':
	    		$params['store_id']		= $self->input->post('store_id');
	    		$result 				= $self->Promotions_model->getAllPromotions($params);
	    		break;
	    	case 'getPromotionsByTitle':
	    		$params['titulo']		= $self->input->post('titulo');
	    		$result 				= $self->Promotions_model->getPromotionsByTitle($params);
	    		break;
	    	case 'insertGeneralDiscount':
	    		$params['store_id']		= $self->input->post('store_id');
	    		$params['order_perc']	= $self->input->post('order_perc');
	    		$params['idPromocion']	= $self->input->post('idPromocion');
	    		$result 				= $self->Promotions_model->insertGeneralDiscount($params);
	    		break;
	    	case 'insertDiscountByItem':
	    		$params['json']			= $self->input->post('json');
	    		$params['store_id']		= $self->input->post('store_id');
	    		$result 				= $self->Promotions_model->insertDiscountByItem($params);
	    		break;
	    	case 'deleteDiscount':
	    		$params['idPromocion']	= $self->input->post('idPromocion');
	    		$params['store_id']		= $self->input->post('store_id');
	    		$result 				= $self->Promotions_model->deleteDiscount($params);
	    		break;
	    }
	    return $result;
	}

	private function oauth_api($sitio) {
		$self =& get_instance();
	    $self->load->model('../../../../shared_resources_clean/v3/models/oauth_model', 'OAuth_model', true);

	    $call_function = $self->uri->segment(3);
	    switch ($call_function) {
	    	case 'createUser':
	    		$params['client_id']		= $self->input->post('client_id');
	    		$params['client_secret']	= $self->input->post('client_secret');
	    		$params['redirect_uri']		= $self->input->post('redirect_uri');
	    		$result 					= $self->OAuth_model->createUser($params);
	    		break;
	    	case 'validate':
	    		$result 				= $self->OAuth_model->validate($params);
	    		break;
	    }
	}
}

/* End of file Api.php */
