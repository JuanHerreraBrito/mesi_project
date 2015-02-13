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

			$this->db->select('description');
			$this->db->from('Materials');
			$this->db->where('description', $description);

			$resultSelect = $this->db->get();
			if ($resultSelect->num_rows() == 0) {
				$dataInsert = array(
					'material'	=> $description
				);
				$this->db->insert('Materials', $dataInsert);
				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}else{
				return -1;
			}
		}// end if
	}// end createMaterials()

	public function createItemType($params) {
		extract($params);

		if (isset($description) AND strlen($description) > 0) {

			$this->db->select('description');
			$this->db->from('ItemsTypes');
			$this->db->where('description', $description);
  
			$resultSelect = $this->db->get();
			if ($resultSelect->num_rows() == 0) {
				$dataInsert = array(
					'description'	=> $description
				);
				$this->db->insert('ItemsTypes', $dataInsert);
				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}else{
				return -1;
			}
		}// end if
	}// end createItemType()

	public function createItemS($params)
	{
	
		$this->db->select_max('IdItem');
		$max= $this->db->get('Items')->row()->IdItem; 
		echo "id:".$max;
		
		
		
	}
	
	public function createItem($params) {
		extract($params);

		if (isset($amount) AND $amount > 0 AND (isset($minLevel) AND $minLevel > 0) AND (isset($wholeSale) AND $wholeSale > 0) 
			AND (isset($retailPrice) AND $retailPrice > 0) AND (isset($baseMaterial) AND strlen($baseMaterial) > 0) AND (isset($country) AND strlen($country) > 0)) {
			if (isset($iType) AND $iType > 0) {
			
				$dataInsert = array(
					'idItemType'		=> $idItemType,//nombre del producto
					'idCodeBar'		=>$idCodeBar,//id Codigo de barras
					'amount'		=> $amount, /*Cantidad de items existentes*/
					'minLevel'		=> $minLevel, //nivel minimo de items que deben existir
					'wholeSale'		=> $wholeSale,// //precio unitario
					'retailPrice'		=> $retailPrice, //venta al por menor
					'baseMaterial'		=> $baseMaterial,//material primo					
					'country'		=> $country, //pais de procedencia
					'iType'			=> 1
				);
									;				
				$this->db->insert('Items', $dataInsert);
				
				  $this->db->select_max('IdItem');
				  $max= $this->db->get('Items')->row()->IdItem; 
				  $materialInsert = array(
				  'idItem' 		=> $max,//tenemos que agregar siempre el id del items
				  'idMaterial' 		=> $idMaterial
				
				);
				
				
				$this->db->insert('ItemsMaterials',$materialInsert);
				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}else{// Item no inv
				$dataInsert = array(
					'idItemType'		=> $idItemType,//nombre del producto
					'idCodeBar'		=>$idCodeBar,//id Codigo de barras
					'amount'		=> $amount, /*Cantidad de items existentes*/
					'minLevel'		=> $minLevel, //nivel minimo de items que deben existir
					'wholeSale'		=> $wholeSale,// //precio unitario
					'retailPrice'		=> $retailPrice, //venta al por menor
					'baseMaterial'		=> $baseMaterial,//material primo					
					'country'		=> $country, //pais de procedencia
					'iType'			=> 1
				);
									;				
				$this->db->insert('Items', $dataInsert);
				
				  $this->db->select_max('IdItem');
				  $max= $this->db->get('Items')->row()->IdItem; 
				  $materialInsert = array(
				  'idItem' 		=> $max,//tenemos que agregar siempre el id del items
				  'idMaterial' 		=> $idMaterial
				
				);
				
				
				$this->db->insert('ItemsMaterials',$materialInsert);
				$resultInsert = $this->db->affected_rows();
				if ($resultInsert > 0) {
					return true;
				}
				return false;
			}// end else
		}// end if
	}// createItem()

	

	public function getItems($params) 
	{	extract($params);			
		/*BUsqueda general de Inventarios*/
		if( $params['advance']=='name'  && strlen($params['name'])==0)
		{
		  $this->db->select('*');
		  $this->db->from('Items');
		  //al quitar where se muestran resultados generaes
		  //$id=array(1,2);
 		  //$this->db->where_in('Items.idItemType',1);//,$id);//poner el valor del paramatro de busqueda
		  $this->db->join('ItemsTypes','ItemsTypes.idItemType = Items.idItemType','INNER');//Hacemos el join con los valores iguales
		  $this->db->join('ItemsMaterials', 'ItemsMaterials.idItem= Items.idItem', 'INNER' );
		  $this->db->join('Materials','Materials.idMaterial = ItemsMaterials.idMaterial' ,'INNER');
		  $this->db->join('CodeBars','CodeBars.idCodeBar = Items.idCodeBar' ,'INNER');
		  $query=$this->db->get();
		  return $query;		  
		}	
		/*FIN DE BUSQUEDA GENERAL*/		
/*#######################################################*/
		/*Busqueda por Nombres*/		
		if( $params['advance']=='name' && strlen($params['name'])>0)
		{		  
		  $this->db->select('*');
		  $this->db->from('ItemsTypes');
		  //al quitar where se muestran resultados generaes
		  $id = $params['name'];//se almacena cadena de buscada
 		  $this->db->like('ItemsTypes.description',$id);//condicionamos la busqueda
		  $this->db->join('Items','Items.idItemType = ItemsTypes.idItemType','INNER');//Hacemos el join con los valores iguales
		  $this->db->join('CodeBars','CodeBars.idCodeBar = Items.idCodeBar' ,'INNER');
		  $this->db->join('ItemsMaterials','ItemsMaterials.idItem = Items.idItem','INNER');
		  $this->db->join('Materials','Materials.idMaterial=ItemsMaterials.idMaterial','INNER');
		  $query=$this->db->get();
		  return $query;		  
		}	
				
		/*Switch busqueda avanzada*/
		if($params['advance']!='name')
		{	
		  $case=$params['advance'];
		  //por codigo de barras
		  switch($case)
		  {
			case "cod":
			  $this->db->select('*');
			  $this->db->from('CodeBars');//table
			  //al quitar where se muestran resultados generaes
			  $id = $params['parametro'];//se almacena cadena de buscada
			  $this->db->where_in('CodeBars.codeBar',$id);//condicionamos la busqueda
			  $this->db->join('Items','Items.idCodeBar = CodeBars.idCodeBar ','INNER');
			  $this->db->join('ItemsTypes','ItemsTypes.idItemType = Items.idItemType','INNER');//Hacemos el join con los valores iguales
			  $this->db->join('ItemsMaterials', 'ItemsMaterials.idItem= Items.idItem', 'INNER' );
			  $this->db->join('Materials','Materials.idMaterial = ItemsMaterials.idMaterial' ,'INNER');
			  $query=$this->db->get();
			  return $query;
			break;
		  //por materiales
		      case "material":
			  $this->db->select('*');
			  $this->db->from('Materials');//table
			  $id = $params['parametro'];//se almacena cadena de buscada
			  $this->db->like('Materials.material',$id);//condicionamos la busqueda
			  $this->db->join('ItemsMaterials','ItemsMaterials.idMaterial=Materials.idMaterial','INNER');
			  $this->db->join('Items', 'Items.idItem= ItemsMaterials.idItem', 'INNER' );
			  $this->db->join('ItemsTypes','ItemsTypes.idItemType = Items.idItemType','INNER');//}Hacemos el join con los valores iguales
			  $this->db->join('CodeBars','CodeBars.idCodeBar = Items.idCodeBar ','INNER');
			  $query=$this->db->get();
			  return $query;
		      break;
				
		      case "precio":
		      $this->db->select('*');
		      $this->db->from('Items');
		      //al quitar where se muestran resultados generaes
		      $id = $params['parametro'];//se almacena cadena de buscada
		      $this->db->where_in('Items.wholeSale',$id);//,$id);//poner el valor del paramatro de busqueda
		      $this->db->join('ItemsTypes','ItemsTypes.idItemType = Items.idItemType','INNER');//Hacemos el join con los valores iguales
		      $this->db->join('ItemsMaterials', 'ItemsMaterials.idItem= Items.idItem', 'INNER' );
		      $this->db->join('Materials','Materials.idMaterial = ItemsMaterials.idMaterial' ,'INNER');
		      $this->db->join('CodeBars','CodeBars.idCodeBar = Items.idCodeBar' ,'INNER');
		      $query=$this->db->get();
		      return $query;	
		      break;
		  
		      case "":
		      break;
		  
		      default:
		      echo "No seleccionaste un valor";
		      break;
		    }
		
		}
		
		
		
		/*fin de busqueda por nombres*/
		
		
		
		
		
	}
	
	
	
	public function itemsTypes_list()
	{	$result = $this->db->query('SELECT description FROM ItemsTypes');		
		return $result;		
	}
	
	
 	public function materials_list()
	{
		$list = $this->db->query('SELECT material FROM Materials');		
		return $list;		
	
	}
	
	
	
	
	
}// end Items_model 