
<div class="log-responsive">

<h3>Ingreso de nuevos usuarios</h3>
<form action="../../../kontrol/index.php/welcome/users" method="GET" name="formNewUser">
      
	<label >Inserta Nickname de usuario.</label>
	<input type ="text" name="user"><hr>

	<label>Inserta Nombre de usuario.</label>
	<input type ="text" name="name"> <hr>

	<label>Inserta la contraseña del usuario.</label>
	<input type ="password" name="password" id="password"><hr>
	
	<label>Vuelve a escribir la contraseña.</label>
	<input type ="password" name="password2" id="password2"><hr>

	<label>Inserta el teléfono del usuario.</label><br>
	<input type ="text" name="phoneNumber" id="phoneNumber"><hr>

      <label>Capture FingerPrint.</label><br>
	<input type ="text" name="fingerPrint" id="fingerPrint" ><hr>

	
	<label>Selecciona el Tipo de Usuario</label><br>
	<select name="" >
	<option>Bodega</option>
	<option>Cajas</option>
	<option>Gerente</option>
	<option>Administrador</option>
	
	
	</select>
	<hr>
	



	<br>
	<input type="button" value="Ingresar" name="Ingresar" class="btn" onclick="comprobarClave()">





</form>
</div>