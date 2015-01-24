<? if(! defined('BASEPATH')) exit('No direct script access allowed');

class pdf_ci extends CI_Controller {

	var $sitio = 'SELL';
	public function __construct() {
		parent::__construct();

		$this->load->database();
        //$this->load->helper('common');
		// Cargamos la libreria html2pdf
		$this->load->library('html2pdf');
		$this->load->model('../../../shared_resources_clean/v3/models/cop_model.php', '', TRUE);
		
	}

	//Creamos el directorio donde se almacenaran temporalmente los pdfs
	private function createFolder() {
		if (!is_dir('./files')) {
			mkdir('./files',0777);
			mkdir('./files/pdfs',0777);
		}
	}

	 /*  Vista principal de la tienda */
    public function id() {
    	
        $store_id = $this->uri->segment(3);

        $data["store"] = new stdClass();
        $data["store"]->id = $store_id;

        //$this->load->view('v2/cop/entrada_pdf2', $data);

    }

	public function index() {

		// Cargamos el modelo
		include('../../../shared_resources_clean/v3/libraries/Kichink_Api.php');

		$api = new kichink_api;
		$api->execute_call($this->sitio);

		// Establecemos la carpeta en la que queremos guardar los pdfs
		$this->createFolder();

		// Importamos el slash del final o no funcionara correctamente 
		$this->html2pdf->folder('./files/pdfs');

		//Establecemos el nombre del archivo
		$this->html2pdf->filename('ingreso.pdf');

		// Tipo de papel
		$this->html2pdf->paper('letter','portrait');

		$data = array(
			'title' => 'FORMATO DE ENTREGA',
			'rows' => $this->cop_model->getPdfData(1)
		);

		// Hacemos que tome la vista como datos a imprimir con un encode utf8_decode para no tener problemas con acentos y demas
		$this->html2pdf->html(utf8_decode($this->load->view('entrada_pdf2',$data,TRUE)));

		// Si el pdf se guarda correctamente en plantilla 
		if ($this->html2pdf->create('save')) {
			$this->show();
		}
	}// end index

	public function downloadPDF(){
		// Si existe el directorio
		if (is_dir('./files/pdfs')) {
			// La ruta completa del archivo
			$route = base_url('./files/pdfs/ingreso.pdf');
			// Nombre del archivo
			$filename = 'ingreso.pdf';
			//Si existe el archivo comenzamos a descargarlo :)
			if (file_exists("./files/pdfs/".$filename)) {
				header("Cache-Control:public");
				header("Content-Description: File Transfer");
				header("Content-disposition: attachment; filename=".basename($route));
				header("Content-Type: application/pdf");
				header("Content-Transfer-Encoding: binary");
				header("Content-Length:".filesize($route));
				readfile($route);
			}
		}
	}// end downloadPDF

	public function mail_pdf($userMail) {
		// Establecemos la carpeta en la que queremos guardar los pdfs,
        // Si no existen las creamos y damos permisos
        $this->createFolder();
 
        // Importante el slash del final o no funcionará correctamente
        $this->html2pdf->folder('./files/pdfs/');
        
        // Establecemos el nombre del archivo
        $this->html2pdf->filename('test.pdf');
        
        // Establecemos el tipo de papel
        $this->html2pdf->paper('letter', 'portrait');
        
        // Datos que queremos enviar a la vista
        $data = array(
            'title' => 'FORMATO DE ENTREGA',
			'rows' => $this->cop_model->getPdfData(1)
        );
        
        //hacemos que coja la vista como datos a imprimir
        //importante utf8_decode para mostrar bien las tildes, ñ y demás
        $this->html2pdf->html(utf8_decode($this->load->view('entrada_pdf2pdf', $data, true)));
 
 
        // Revisamos que el PDF haya sido creado antes de enviarlo
        if($path = $this->html2pdf->create('save')) {
 
            $this->load->library('email');
            //Mail de Kichink!
            $this->email->from('contacto@kichink.com', 'Name');
            $this->email->to($userMail); 
            
            $this->email->subject('Formato de ingreso');
            $this->email->message('Este correo se genero de manera automatica con la solicitud enviada');    
 
            $this->email->attach($path);
 
            $this->email->send();
            
            echo "El email ha sido enviado correctamente";
                        
        }
	}// end mail_pdf
}
?>