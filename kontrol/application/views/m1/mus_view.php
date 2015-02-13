<h2>Usuarios Registrados:</h2>
<table border="1">
<tr><td>-</td> <td>ID</td>  <td>Nickname</td>  <td>Contraseña</td> <td>Usuario</td> <td>FingerPrint</td> <td>Phone-Number</td>  </tr>
<?php 
	
		   
			$query = $this->db->query('SELECT * FROM Users');		
			foreach ($query->result() as $row)
			{
			    echo "<tr>";
			    echo "<td><input type='radio' name='user'  value='$row->idUser'></td>";
   					echo "<td>". $row->idUser . "</td>";
   					
   					echo "<td>". $row->name . "</td>";
   					
   					echo "<td>". $row->password . "</td>";
   					
   					echo "<td>". $row->user . "</td>";
   					
   					echo "<td>". $row->fingerPrint . "</td>";
   					
   					echo "<td>". $row->phoneNumber . "</td>";
   					
   			echo "</tr>";
			}
	  
	?>
	
</table>