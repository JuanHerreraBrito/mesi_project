<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cop_model extends CI_Model {

	//The default constructor
	function __construct()
    {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }
    
    function get_intersting_cop_dates($params){
        extract($params);
        $result = array();
        //Checamos si esta definida la variable store_id

        if (isset($store_id) AND $store_id > 0) {
            $id_store_int = intval($store_id);
            $this->db->select('S.id, S.name, S.email, I.id, I.store_id, I.name, I.deleted, I.description, I.units_availible');
            $this->db->from('stores AS S, items AS I');
            $this->db->where('S.id',$id_store_int);
            $this->db->where('I.store_id','S.id', FALSE);
            $this->db->where('I.deleted !=','1');
            $this->db->or_where('I.deleted','NULL', FALSE);
            /*
             * This get this Query
             * SELECT S.id, S.name, S.email, I.id, I.store_id, I.name, I.deleted I.description, I.units_availible
             * FROM stores AS S, items AS I
             * WHERE S.id = $store_id AND S.id = I.store_id AND I.deleted != 0; 
             */
            $resultadoParaGenerarCita = $this->db->get();
            
            if ($resultadoParaGenerarCita->num_rows() > 0) {
                $result = $resultadoParaGenerarCita->result();
            }
            return $result;
        }else{
            return false;
        }
    }

    //Regresa las citas agendads un dia en concreto.
    function get_citas($params) {
        extract($params);

        $result = array();
        if (isset($store_id) AND $store_id > 0) {
            $this->db->select('day');
            $this->db->from('cop_citas');
            $this->db->where('day',$selct_day);
            $this->db->where('delete !=','1');
            /*
             * This get this query
             * SELECT day FROM cop_citas
             * WHERE day = $select_day;
             */
            $horariosCita = $this->db->get();
            if ($horariosCita->num_rows()>0) {
                $result = $horariosCita->result();
            }
            return $result;
        }else{
            return false;
        }
    }

    //Inserta los datos dentro de la tabla cop_citas
    function insert_cop_citas($params) {
        extract($params);

        $this->db->select('id');
        $this->db->from('stores');
        $this->db->where('id',$store_id);
        $existe = $this->db->get();

        $this->db->select('id_store');
        $this->db->from('cop_citas');
        $this->db->where('id_store',$store_id);
        $this->db->where('delete !=','1');
        $existeCitaCreada = $this->db->get();

        if ($existe->num_rows() > 0 AND $existeCitaCreada->num_rows() == 0) {
            if ((isset($store_id) AND $store_id > 0) AND (isset($day) AND strtotime($day)) AND (isset($user_id) AND $user_id > 0) AND (isset($telephone) AND strlen($telephone) > 0)
                AND (isset($email) AND strlen($email) > 0) AND (isset($contact)) AND strlen($contact) > 0) {
                $data_cop = array(
                    'id_store'      => $store_id,
                    'day'           => $day,
                    'user_id'       => $user_id,
                    'date_request'  => date('Y-m-d H:i:s'),
                    'delete'        => 0,
                    'telephone'     => $telephone,
                    'email'         => $email,
                    'contact'       => $contact
                );
                $this->db->insert('cop_citas',$data_cop);
                $numRows = $this->db->affected_rows();
                if ($numRows > 0) {
                    return true;
                }
            }
        }
        return false;
    }// end insert_cop_citas

    //Inserta los datos dentro de la tabla cop_has_items
    function insert_items_units($params){
        extract($params);

        $this->db->select('id');
        $this->db->from('stores');
        $this->db->where('id',$store_id);
        $existe = $this->db->get();

        if ($existe->num_rows()>0) {
            if (isset($store_id) AND $store_id >0 AND (isset($items_id) AND $items_id >0 ) AND (isset($units) AND $units >= 0)) {
                
                $this->db->select('idCop');
                $this->db->from('cop_citas');
                $this->db->where('id_store',$store_id);
                $this->db->where('delete !=', 1);
                $this->db->order_by('idCop', 'DESC');
                $this->db->limit(1);

                $idCopAux = $this->db->get();
                $idCop = $idCopAux->row();

                $data_has = array(
                    'cop_idcop'     =>$idCop->idCop,
                    'cop_id_store'  => $store_id,
                    'items_id'      => $items_id,
                    'units'         => $units
                );
                $this->db->insert('cop_has_items',$data_has);
                $numRows = $this->db->affected_rows();
                if ($numRows > 0) {
                    return true;
                }
            }
        }
            return false;        
    }// end insert_items_units

    /*
     * Métodos para generar el PDF :)
     */

    // Obtenemos los datos para generar el PDF
    private function getPdfData($params) {
        extract($params);

        $result = array();
        if ((isset($store_id) AND $store_id > 0)) {

            if (isset($idCop) AND $idCop > 0) {
                $this->db->select('H.items_id, I.description, I.price, H.units, C.id_store, C.day, S.name');
                $this->db->from('cop_citas AS C, cop_has_items AS H, items AS I, stores AS S');
                $this->db->where('H.cop_idcop',$idCop);
                $this->db->where('H.cop_id_store',$store_id);
                $this->db->where('H.items_id', 'I.id', FALSE);
                $this->db->order_by('H.items_id','ASC', FALSE);

                $pdfData = $this->db->get();

                if ($pdfData->num_rows() > 0) {
                    $result = $pdfData->result();
                }    
            }else{
                // Get the idCop from the last date
                $this->db->select('idCop');
                $this->db->from('cop_citas');
                $this->db->where('id_store',$store_id);
                $this->db->order_by('day','DESC');
                $this->db->limit(1);
                $lastDayCop = $this->db->get();
                $lastDayCop = $lastDayCop->row();

                // Get the data from the last day
                $this->db->select('H.items_id, I.description, I.price, H.units, C.id_store, C.day, S.name');
                $this->db->from('cop_citas AS C, cop_has_items AS H, items AS I, , stores AS S');
                $this->db->where('H.cop_idcop',$lastDayCop->idCop);
                $this->db->where('H.cop_id_store',$store_id);
                $this->db->where('H.items_id', 'I.id', FALSE);
                $this->db->order_by('H.items_id','ASC', FALSE);

                $pdfData = $this->db->get();

                if ($pdfData->num_rows() > 0) {
                    $result = $pdfData->result();
                }    
            }            
        }
        return $result;
    }// end getPdfData

    // Generamos el pdf auxiliandonos de getPdfData para traer los datos que necesitamos :)
    function generatePDF($params) {
        extract($params);
        
        // Cargamos la libreria html2pdf de Dompdf
        $this->load->library('html2pdf');

        // Importamos el slash del final o no funcionara correctamente 
        $this->html2pdf->folder('/var/tmp/');

        //Establecemos el nombre del archivo
        $this->html2pdf->filename('ingreso.pdf');

        // Tipo de papel
        $this->html2pdf->paper('letter','portrait');

        // Obtenemos los items que la tienda va a ingresar a COP
        $data['jsonData'] = $this->getPdfData($params);

        // Hacemos que tome la vista como datos a imprimir con un encode utf8_decode para no tener problemas con acentos y demas        

        $this->html2pdf->html($this->load->view('../../../../shared_resources_clean/v3/views/cop/entrada_pdf.php', $data,TRUE));
        
        // Si el pdf se guarda correctamente en plantilla 
        if ($pdfContent = $this->html2pdf->create('save')) {
            
            $this->downloadPDF();
            
        }else{
            
        }

    }// end generatePDF

    private function downloadPDF(){

        $this->load->helper('download');

        $data = file_get_contents("/var/tmp/ingreso.pdf"); // Read the file's contents
        $name = 'ingreso.pdf';

        force_download($name, $data);

    }// end downloadPDF
}