<?php
	ini_set('display_errors', 0);
	error_reporting(0);
?>
<!DOCTYPE html>
<html>
	<head>
		<title>FORMATO DE ENTRADA</title>
		<meta charset="utf-8"> 
		<style type="text/css">

			/********************************************
				For responsive design		
			********************************************/

			#centraTabla		{ width: 600px; padding: 10px;}

			#templateTabla		{ width: 90%; }

			.nombre				{ height: 50px;}
			

			#separation			{ width: 100%; height: 100px;}

			td{
				border-style: solid;
				border-width: 1px;
				border-color: #7030a0;
			}
			.bordeMorado{
				border-style: solid;
				border-width: 1px;
				border-color: #7030a0;
			}
			.centro{
				text-align: center;
			}
			#title, #casoUno{
				font-family: Rockwell;
				vertical-align: bottom;
				background-color: transparent;
				border-width: 0.0261cm;
				border-style: solid;
				border-color: #ffffff;
				color: #260084;
				font-size: 20pt;
				font-style: normal;
			}

			.left{
				text-align: left;
			}
			#title{
				font-size: 20pt;
			}
			#kichink{
				text-align: left;
			}
			#inventario{
				color: black;
				font-size: 15pt;
			}
			.c1{
				width: 40px;
			}
			.c2{
				width: 70px;
			}
			.desc{
				width: 250px;
			}
			.unit{
				width: 80px;
			}
			.tot{
				width: 100px;
			}
			.comun{
				font-weight: bold;
			}
			.morado{
				width: 201px;
				color: black;
				background: #7030a0;
			}
			#separacion{
				width: 30px;
			}
			.nombre{
				width: 200px;
			}
			.arriba{
				margin-left: 320px;
			}
			#abajoN{
				margin-left: 80px;
				margin-top: -70px;
			}
			#abajoM{
				margin-left: 80px;
				
			} 
			#arriba{
				margin-top: 100px;
			}
		</style>
	</head>

	<body>

		<div id="centraTabla">
			<table id="templateTabla">
				<thead>
					<tr>
						<th colspan="6" clas="left centro" id="title">FORMATO DE ENTRADA</th>
					</tr>
				</thead>
				<tbody>
					<tr id="casoUno">
						<!--<th colspan="2" rowspan="2"></th>-->
						<th colspan="2" id="kichink" class="centro">Kichink!</th>
						<th colspan="2"></th>
						<th colspan="2" id="inventario">INVENTARIO</th>
					</tr>
					<tr>
						<th colspan="4"></th>
						<td class="left comun">Fecha</td>
						<td class="centro"><?php echo $jsonData[0]->day ?></td>
					</tr>
					<tr >
						<td colspan="2" class="comun centro">Tienda</td>
						<td colspan="2"></td>
						<td class="left comun">ID Tienda</td>
						<td clas="c1 centro"><?php echo $jsonData[0]->id_store ?></td>
					</tr>
					<tr>
						<td colspan="2" class="comun centro">ID de Producto</td>
						<td colspan="2" class="desc comun centro">Descripción</td>
						<td class="unit comun centro">P.Unitario</td>
						<td class="tot comun centro">Total piezas</td>
					</tr>
					
					<?php $totalUnits = 0;
						$contador = 1;
						foreach ($jsonData as $datos) {
							//global $contador, $totalUnits, $fechaCita, $idTienda;
							echo '<tr>';
							echo '<td class="c1 centro">'.$contador.'</td>';
							echo ('<td class="c2 centro">'.$datos->items_id.'</td>');
							echo ('<td colspan="2" class="centro">'.$datos->description.'</td>');
							echo ('<td class="centro">'.$datos->price.'</td>');
							echo ('<td class="centro">'.$datos->units.'</td>');
							$totalUnits += $datos->units;
							$contador++;
							echo '</tr>';
					} ?>
					<tr>
						<td colspan="5" rowspan="2">Observaciones:</td>
						<td class="centro">TOTAL</td>
					</tr>
					<tr>
						<td class="centro"><?php echo $totalUnits ?></td>
					</tr>
					<tr>
						<td colspan="6" class="left">* El inventario se verá reflejado a las 24 horas posteriores a su recepción.</td>
					</tr>
					<tr>
						<td colspan="6" class="left">** Los artículos entregados son amparados contra daño y/o pérdida durante el traslado al cliente final.</td>
					</tr>
					<tr>
						<td colspan="6" class="left">*** Cada tienda es responsable del estado en el que nos entrega sus productos.</td>
					</tr>
				</tbody>
			</table>
			<div id="separation">
				
			</div>
			<table id="templateTabla">
				<tbody>
					<tr>
						<th colspan="2"></th>
						<td colspan="1" class="centro"></td>
						<td class="centro">Edgar Macías</td>
						<th colspan="2"></th>
					</tr>
					<tr>
						<th colspan="2"></th>
						<td class="morado centro">Entrega</td>
						<td class="morado centro">Recive</td>
						<th colspan="2"></th>
						
					</tr>
				</tbody>
			</table>
	</body>
</html>
