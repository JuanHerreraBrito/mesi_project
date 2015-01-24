<?php 
		    $self = &get_instance();
		    $self->load->library('api');
		    $result=$self->api->itemsTypes_list();
			$cont=1;
			
			
			/*  foreach ($result->result() as $row)
			  {
   					echo $row->description;
   					echo "<hr>";
			}*/
					

	?>					

					
<form  action="../../../kontrol/index.php/welcome/item_gral/gral" method="GET" >
<label>Tipo de producto:</label>
<!--<input type ="text" name="idItemType"   style="width:200px;" >-->
<select>
  <option >Selecciona Tipo</option>
   <option value="null">Ninguno</option>
   
<?php foreach ($result->result() as $row)
 {	
      echo '<option value="'. $cont  .'">'.$row->description.'</option>';
      $cont++;
      echo "<hr>";
  }					
?>
   
   
    </select>
<hr>
<label>Cantidad del producto:</label>
<input type ="text" name="amount" style="width:166px;"><hr>
<label>Ingresa Precio Unitario:</label>
$:<input type ="text" name="wholeSale" style="width:150px;"><hr>
<label>Ingresa Precio al por menor:</label>
$:<input type ="text" name="retailPrice" style="width:118Px;"><hr>
<label>Cantidad Mínima de productos:</label>
<input type ="text" name="minLevel" style="width:111px;"><hr>
<label>País de Procedencia:</label>
<input type ="text" name="country" value="México" style="width:179px;"><hr>
<label>Material del producto:</label>
<input type ="text" name="baseMaterial" style="width:174px;">
<br>

<hr>




<div id="oculto">
	<input type="hidden" name="iType" value="0"> 
<label>Ingresa o Captura Código de Barras</label>
<input type ="text"  name="idCodeBar" placeholder="Código de barras"><br>
<br>
<input type="submit" id="sub" class="btn" value="Almacenar">
	</div>
<form>


<script type="text/javascript">

 $(document).ready(function()
	    {


		});
</script>

<br>