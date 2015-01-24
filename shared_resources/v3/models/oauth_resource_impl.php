<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class OAuth_resource_impl extends CI_Controller{

	function __construct() {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
        include APPPATH.'../application/controllers/oauth_server_impl.php';
    }

   // $server = new OAuth_server_impl;

    public function validate() {
        global $server;
        var_dump($server); exit;
    	if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    		$server->getResponse()->send();
    		die;
    	}
    	echo json_encode(array('success' => true, 'message' => 'You accessed my APIs!'));
    }

    public function createToken() {
        include APPPATH.'../application/controllers/oauth_server_impl.php';
        global $server;
        var_dump($server); exit;
        // Handle a request for an OAuth2.0 Access Token and send the response to the client
        $server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
    }
}

?>