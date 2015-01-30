
<a class="btn" href="busi#selet">Nueva Búsqueda</a>



<table class="table">  
<?php 
echo "<th>Resultado:</th>";
echo " <tr><td>Id</td>  <td>Producto</td> <td>Cantidad</td><td>Precio</td><td>Material</td>
<td>Pais</td><td>Codigos/Barras</td><td>Material</td></tr>";
  if(isset($result)){
	  foreach($result->result()as $row)
		    { echo "<tr>";
		      echo "<td>".$row->idItemType."</td>";		
		      echo "<td>".$row->description. "</td>";
		      echo "<td>".$row->amount. "</td>";
		      echo "<td>".$row->wholeSale. "</td>";
		      echo "<td>".$row->baseMaterial. "</td>";
		      echo "<td>".$row->country."</td>";
		      echo "<td>".$row->codeBar."</td>";
		      echo "<td>".$row->material."</td>";
			echo "</tr>";
		    }



	
 		
 		}
		else{echo "No se encontraron elementos";}
		
		
		
		    
?> 
</table>