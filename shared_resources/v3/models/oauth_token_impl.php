<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class OAuth_token_impl {

	function __construct()
    {
        date_default_timezone_set('America/Mexico_City');
        include APPPATH.'../application/controllers/oauth_server_impl.php';
    }
	
	public function createToken() {
		global $server;

		// Handle a request for an OAuth2.0 Access Token and send the response to the client
		$server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
	}
}

?>