<p>Resultado:</p>
<hr>
<div id="Layer1" style="width:100%; height:40%; overflow: scroll;">




<table class="table table-striped">  







<?php 



$cont=0;

echo " <tr><td>Id</td>  <td>Producto</td> <td>Cantidad</td><td>Precio</td><td>Material</td>
<td>Pais</td><td>Codigos/Barras</td><td>Material</td></tr>";
      
      	    


  if(  isset($result)  ) { 
	
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
			$cont=1;
		    } 				    
 		}
 		    
?> 
</table><?php if($cont==0){echo "<b style='color:red; position:relative; left:30%; '>No se encontraron elementos</b>";} ?>
</div>