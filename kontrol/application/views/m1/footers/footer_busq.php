			    </div>
	    </div>
		  
<!--fin de contenido principal y vista -->	

<!-- menu Busqueda-->
  <div class="list">
    <form method="GET" style="position:relative; top:8px; margin:0 auto; text-align:center;" action="../../../kontrol/index.php/welcome/getItems">
    <input type="text"  class="search2" id="name" name="name" placeholder="CodeBar / Item"> 
    <br>
      <!-- <input name="shortCode" type="text" placeholder="Ingresar Código Corto" style="width:250px;" ><hr>-->
      <div id="param_busq_ad"><input type="radio" name="advance" checked autocomplete="on" value="name"  class="radio-inline" id="advancer"  >Nombre</div>
      <br> <br> <br>
      <a href="#set" class="boton">Avanzado+</a>             
	<div id="desplegable">
	
	  <p>Búsqueda Avanzada</p>
	  <input name="parametro" id="parametro" type="text" placeholder="Ingresar Parámetro"><br><br>
	  
	  <select id="materialType" class="form-control" size="2">
	  <option>MaterialType</option>
	  <option value="1">Piel</option>
	  <option value="1">Gamusa</option>
	  <option value="1">Vinilo</option>
	  <option value="1">Piel Imitación</option>
	  
	  </select><br>
	  
	  
	  <select id="Category" class="form-control">
	  <option >Category</option>
	  <option value="1">Cinturones</option>
	  </select>
	  <hr>
	  <table border="1">
	  <tr><td><input type="radio" name="advance"  value="cod" class="radio-inline" id="cod" checked="0"></td><td>Cód.de Barras</td>
	  <tr><td><input type="radio" name="advance" value="material" class="radio-inline" ></td><td>Material</td>
	  <tr><td><input type="radio" name="advance" value="precio" class="radio-inline" ></td><td>Precio</td>	  
	  </table>
	  
	  
	 </div><hr>
      <input type="submit" value="Buscar" class="btn">
     
     
</form>
  

  <br>


</div><!-- fin menu Busqueda -->



		
		
		
		
<!--Fin del contenedor de la pagina -->
		
      </div>
      
	  </div><br>

      </div>
</main>

<!--fin cuerpo principal -->

<!-- log pop up -->
<div id="popup" style="display: none;">
    <div class="content-popup">
        <div class="close"><a href="#" id="close">X</a></div>
        <div>
           <h2>Inicio de Sesion</h2>
           <hr>
           <form>
	    <label class="label-info" style="padding:5px 21px 5px 21px; font-size:18px">Usuario</label>
	    <input style="width:250px; height:35px;" id="user"></input><br></br>
           <label class="label-info" style="padding:5px 5px 5px 5px; font-size:18px">Contraseña</label>
           <input type="password" style="width:250px; height:35px;" id="password"></input>
           <br>
           <input type="button" value="Ingresar" class="btn" style="float:right;" id="submit">
     
           </form>           
        </div>
    </div>
</div>


</body>
</html>