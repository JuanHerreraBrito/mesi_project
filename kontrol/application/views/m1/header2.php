<!DOCTYPE html>
<html lang="es">
  <head>
       <meta charset="utf-8">
      <title>Mesi</title>    <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen">
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/bootstrap.css" rel="stylesheet" type="text/css" media="screen">
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen">
      <link href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/adds.css" rel="stylesheet" type="text/css" media="screen">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="stylesheet" href="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/css/main_menu.css">
      <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
      <script src="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/js/call_api_example.js" type="text/javascript"></script>
      <script src="http://mena.site88.net/mesi/kontrol/conten/bootstrap3//js/main_menuscrp.js"></script>
      <script src="http://mena.site88.net/mesi/kontrol/conten/bootstrap3/js/password_new_user.js" type="text/javascript"></script>
      <script type="text/javascript">  
      </script>         
      <script type="text/javascript" src="jquery.js"></script>
      	<script src="jquery-1.9.0.js" type="text/JavaScript" language="javascript"></script>
	<script src="jquery.PrintArea.js" type="text/JavaScript" language="javascript"></script>
	
	<script type="text/javascript">
	

	

	
	

    $(document).ready(function()
      { 
      
      $(".boton").click(function(){
	$("#desplegable").slideToggle("slow");
	  });
	$("#desplegable").css({ display: 'none' });
      

      
      $(".printer").bind("click",function()
	{
		
		alert("Imprimiendo¡");
	});
      
      
        var p = 0;

        $('#point').click(function()
        {

          if(p==0){
            $(this).css("fill","red");
            p=1;
          /*sipoint*/
          }

          else{
              $(this).css("fill","white");
              p=0;
              /*nopoint*/
              }



        });
    
      
      });
    



      </script>
    </head>
  
    
    
    <!-- cuerpo -->
