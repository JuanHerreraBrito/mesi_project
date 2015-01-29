
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registro al API de Kichink!</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
    	#botoncito{
    		margin-top: 20px;
    		width: 30%;
    	}
    </style>
    <script type="text/javascript">
    	$(function(){
    		$('#authorize').click(function(){
    			var token = $.get('/oauth_impl/createToken/', {'grant_type':'client_credentials'})
                    .done(function() {
                        alert( "second success" );
                        console.log(token);
                    }).fail(function() {
                        alert( "error" );
                    }).always(function() {
                        alert( "finished" );
                    });
    			var text = token.responseText;
    			if (!jQuery.isEmptyObject(text) && typeof(text) != 'undefined' && text != null) {
    				var aux = jQuery.parseJSON(text);

    				for (var i = 0; i <aux.length; i++) {
    					$('#p_token').append(aux.data[i].token);
    				}// end for
    			}// en if 
    		});// end click
    	});
    </script>
  </head>
  <body>
    <header>
			
		</header>
		<aside>
			<div  class="container">
				<div>Authorization Code</div><div>Implicit</div><div>User Credentials</div>
				<div class="starter-template">
					The <code>Autorization code</code> grant type is the most common workflow for OAuth2.0. 
					Clicking the "Authorize" button below will send you to an OAuth2.0 Server to authorize:
					<div class="btn-group btn-lg" role="group" aria-label="..." id="botoncito">
						<button type="button" class="btn btn-default" id="authorize">Authorize</button>
					</div>
					<div id="p_token"></div>
				</div>
			</div>
		</aside>
		<footer>
			
		</footer>
  </body>
</html>