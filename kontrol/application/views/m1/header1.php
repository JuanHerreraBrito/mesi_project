<!DOCTYPE html>
<html lang="es">
  <head>
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen">
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/bootstrap.css" rel="stylesheet" type="text/css" media="screen">
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen">
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/adds.css" rel="stylesheet" type="text/css" media="screen">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="stylesheet" href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/main_menu.css">
      <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
      <script src="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/js/call_api_example.js" type="text/javascript"></script>
      <script src="http://mena.site88.net/mesi/kontrol/conten/bootstrap3//js/main_menuscrp.js"></script>      
      <script src="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/js/password_new_user.js" type="text/javascript"></script>      
      <script type="text/javascript">  
      </script>         
      <script type="text/javascript" src="jquery.js">
      </script>
	<script type="text/javascript">
	    $(document).ready(function()
	    {
	      $('#open').click(function()
	      {
		  $('#popup').fadeIn('slow');
		  $('.popup-overlay').fadeIn('slow');
		  $('.popup-overlay').height($(window).height());
		  return false;
	      });
    
	     $('#close').click(function()
	     {
	      $('#popup').fadeOut('slow');
	      $('.popup-overlay').fadeOut('slow');
	      return false;
	    });
	  
	  /* mas js document.ready*/	 
	      
	      
	      $('#submit').click(function()
	      {
		var user = $('#user').val();
		var password = $('#password').val();
		  if(user=='' || password =='')
		  {
		    alert('No dejar campos en blanco');
		    $('#user').focus();
		  }
		  else{
		  
		    $.post('../../../kontrol/index.php/welcome/valid',
			    { 'user':user,
			     'password':password
			    }, 
			    
			      function(result)	
			      {
				  if(result)
				  {
				    
				    alert(result);
				     $('#popup').fadeOut('slow');
				      $('.popup-overlay').fadeOut('slow');
				      window.location.href="../../../kontrol/index.php/welcome/active_ar";
				      return false;
				  }
				  
				  else{
				  alert("Usuario o Contraseña Incorrecto");
				  $('#user').focus();
				  }
				  
			      }
			  );		 
		  }  
		  
	      });
	        
	});
      </script>
    </head> 
    <!-- cuerpo -->
