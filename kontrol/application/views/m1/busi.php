
<h2>Búsqueda de Productos</h2>
  <form method="GET" action="../../../kontrol/index.php/welcome/getItems">
    <input name="name" type="text" placeholder="Ingresar Nombre del Artículo" style="width:250px;" ><hr>
     <!-- <input name="shortCode" type="text" placeholder="Ingresar Código Corto" style="width:250px;" ><hr>-->
      <div class="btn"><input type="radio" name="advance" checked="1" value="name" >Nombre</div><hr>
      
      <a href="#set" class="boton">Avanzado+</a>             
	<div id="desplegable">
	  <p>Búsqueda Avanzada</p>
	  <input name="parametro" type="text" placeholder="Ingresar Parametro" ><hr>
	  <div class="btn"><input type="radio" name="advance" value="cod" >Cód.de Barras</div>
	  <div class="btn"><input type="radio" name="advance" value="material">Material</div>
	  <div class="btn"><input type="radio" name="advance" value"tipo" >Tipo</div>
	  <div class="btn"><input type="radio" name="advance" value="precio">Precio</div>



</div>
<hr>
      <input type="submit" value="Buscar" class="btn">
     </form>
     
     
     
  
 

    
    
    








</form>