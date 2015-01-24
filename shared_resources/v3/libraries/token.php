<?php
	// include our OAuth2 server object
	$this->load->library('../controllers/server');

	// Handle a request for an OAuth2.0 Acces send to the client
	$server->handleTokenRequest(OAuth2\Request::createFormGlobals())->send();


?>