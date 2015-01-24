<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class OAuth_server_impl{
	$server = null;
    public function initServer() {
    	global $server;

    	$dsn      = 'mysql:dbname=Oauth_Walkthrough;host=localhost';
		$username = 'root';
		$password = 'Kichink2014';

		// Autoloading 
		include APPPATH.'../application/libraries/oauth2-server-php/src/OAuth2/Autoloader.php';
		OAuth2\Autoloader::register();

		// $dsn is the Data Source Name for your database, for exmaple "mysql:dbname=my_oauth2_db;host=localhost"
		$storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));

		// Pass a storage object or array of storage objects to the OAuth2 server class
		$server = new OAuth2\Server($storage);

		// Add the "Client Credentials" grant type (it is the simplest of the grant types)
		$server->addGrantType(new OAuth2\GrantType\ClientCredentials($storage));

		// Add the "Authorization Code" grant type (this is where the oauth magic happens)
		$server->addGrantType(new OAuth2\GrantType\AuthorizationCode($storage));
    }

}

?>