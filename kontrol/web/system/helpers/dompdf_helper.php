<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	function pdf_create ($html, $fillname='', $stream=TRUE) {
		
		requiere_once("dompdf/dompdf_config.inic.php");

		$dompdf = new DOMPDF();
		$dompdf->load_html($html);
		$dompdf->render();
		if ($stream) {
			$dompdf->stream($fillname.".pdf");
		}else{
			return $dompdf->output();
		}
	}

?>