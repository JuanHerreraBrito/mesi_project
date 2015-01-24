<!DOCTYPE html>
<html lang="es">
  <head>
       <meta charset="utf-8">
      <title>FAQ Mesi</title>
      <link href="../../../kontrol/conten/bootstrap3/css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen">
      <link href="../../../kontrol/conten/bootstrap3/css/bootstrap.css" rel="stylesheet" type="text/css" media="screen">
      <link href="../../../kontrol/conten/bootstrap3/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="stylesheet" href="../../../kontrol/conten/bootstrap3/css/main_menu.css">
      <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
      <script src="../../../kontrol/conten/bootstrap3/js/call_api_example.js" type="text/javascript"></script>
      <script src="../../../kontrol/conten/bootstrap3/js/main_menuscrp.js"></script>
         
   <script type="text/javascript">function mostrar(){document.getElementById('oculto').style.display = 'block'; ocultar(); }</script>
   <script type="text/javascript"> function ocultar(){document.getElementById('ver').style.display = 'none';}</script>
   <script type="text/javascript">
   
   function validar()
   {    
    var usr = document.getElementById("name").value;    
    if(usr==0)
    {
      alert("Campos en blanco");
      
 
     foo()
   
    }
    
    
   }
   
   
   function foo(){
   
   
   }
   
   
   </script>   
      
      
  </head> 
  <!-- cuerpo -->
  
  <body>
  
  
  <!-- variables de apoyo -->
  
  
  
  <?php  
      $usr=0;
      
  ?>
 
  
  <!-- variables de apoyo -->
  
  <header>  
    <div id="head-container">
      <div class="container">

    
      
      <?php if (!empty($_POST)): ?>
    <div class="login"> Bienvenido <?php echo htmlspecialchars($_POST["name"]); ?>!<br> </div>
    <?php $usr=1; ?>
    
              
    
<?php else: ?>
      <?php $usr=0; ?>     
	<!-- login -->	
<div id="oculto" style='display:none;'><!-- oculto -->
	<div class="log-responsive">
	<form  class="login" action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);  ?> method="post" onsubmit="return foo()">
	  <label class="label label-info"  style="padding: 5px 15px 5px 15px; margin:0 auto; " >Usuario</label>
	  <input type="text" name="name" id="name">
	  <label class="label label-info">Contraseña</label>
	  <input type="password" name="psw"> 
	  <input type="submit" onclick="validar()" class="btn" value="Ingresar" id="ingresar" name="ingresar">
	</form>    
    </div>
	
	 


</div><!-- oculto -->




<div id="ver"><!-- visible-->
	<div class="log-responsive">
	<div class="login">
	<input type="button" class="btn" value="Login"  onclick="mostrar()">
	</div>
	</div>
</div><!-- visible-->


<?php endif; ?>	
     <!-- login -->
      
      
<!-- ##############################################-->      
        <!-- logotipo -->
  <img src="../../../kontrol/conten/imgs/lg.jpg"  class="imgh-responsive"  width="680" >
    <!-- logotipo -->
    


<!-- menu desplegable dependiendo el usuario -->
<!-- funcionpara ver que partes se muestran -->

   <div class="navbar navbar-inverse">
      <div id='cssmenu'>
	<ul>
	  <li><a href='../welcome/'>Inicio</a></li>
	  <!-- * -->
	  <?php if ($usr==1): ?>
	    <li class='has-sub'><a href=''>Herramientas</a>
		<ul>
		    <li class='has-sub'><a href='#'>Usuarios</a>
		      <ul>
			<li><a href='#'>Cambiar permisos</a></li>
			<li><a href='#'>Crear Usuarios</a></li>
			<li><a href='#'>Modificar Usuarios</a></li>
			<li><a href='#'>Eliminar usuarios</a></li>
		      </ul>
		    </li>
		  <li class='has-sub'><a href='#'>Tablas / B.Datos</a>
		    <ul>
		      <li><a href='#'>Herramientas1</a></li>
		      <li><a href='#'>Herramientas2</a></li>
		      <li><a href='#'>Herramientas3</a></li>
		    </ul>
		</li>
	      </ul>
	    </li>
	<li><a href='#'>OTROS</a></li>
	<li><a href='#'>OTROS</a></li>
	<li><a href='#'>OTROS</a></li>
	<!--/ * -->
	
	<?php else: ?>
      <?php $usr=0; ?>
      <li><a href='#'>Iniciar sesion para ver contenido</a></li>
      <?php endif; ?>	
      
	<li><a href='login'> FAQ</a></li><!-- IMAGEN DEL FAQ -->
      </ul>
  </div>
 </div>

    
</div>
    <br>
       </div>
    
    
<!--fin de cabecera -->
</header>

<!-- cuerpo principal -->
<main>
<div id="main-body">
<span><br> </span>
      <div class="container">
      
     
      
      
      <h2>Este es el sistema de ayuda MESI</h2>
      <p>Por favor busca en la lista tu probelma</p>
      <br>
      <b>Categoria 1</b>
  <hr>
      
      
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
     <br>
     <b>Categoria 2</b>
     <hr>
     <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
      <li><a href="">Proeblema</a> </li>
    
      
      
      </div>



</div>
</main>

<!--fin cuerpo principal -->


</body>
</html>