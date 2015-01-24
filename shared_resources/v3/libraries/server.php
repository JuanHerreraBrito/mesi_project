<?php
	$dsn 		= 'mysql:dbname=Oauth_Walkthrough;host=localhost';
	$username	= 'root';
	$password	= 'Kichink2014';

	// error reporting (this is a demo, after all!)
	init_set('display_errors',1);
	error_reporting(E_ALL);

	// Autolo0ading (composer is preferred, but for this example let's do this)
	$this->load->library('/oauth2-server-php/src/OAuth2/Autoloader.php');
	OAuth2\Autoloader::register();

	// $ dsn is the Data Source Name object or array of storage objects to the Oauth2 server class
	$storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));

	// Pass a storage object or array of storage objects to the OAuth2 server class
	$server = new OAuth2\Server($storage);

	// Add the "Client Credentials" grant type (it is the simplest of the grant types)
	$server->addGrantType(new OAuth2\GrantType\ClienteCredentials($storage));

	// Add the "Authorizacion Code" grant type (this is where the oauth magic happens)
	$server->addGrantType(new OAuth2\GrantType\AuthorizacionCode($storage));

	



?>