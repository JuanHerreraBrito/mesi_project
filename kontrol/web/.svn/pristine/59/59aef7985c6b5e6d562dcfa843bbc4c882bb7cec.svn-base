<?php 

function kLog($user_id, $sitio, $action, $details){
	return true;	
	$self =& get_instance();
	$db = $self->load->database('Kichink_Prod_AWS_201210', TRUE);
	
  	$db->insert('actions', array( 	'user_id' 	=> $user_id, 
									'action' 	=> $action, 
									'sitio' 	=> $sitio,
									'details' 	=> $details
								 ));
	
    $db->close();
}