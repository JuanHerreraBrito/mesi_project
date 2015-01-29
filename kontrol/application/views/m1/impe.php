
<div id="testo" style="z-index:1;"> 
<h2>Impresión de etiquetas</h2>

<p>Imprime el código de barras o etiqueta de tu producto</p>
<form>

<input type="text"    placeholder="Insertar Código Corto"> 
<input type="button" value="Generar" class="btn"><br>
<hr>

<input type="text"    placeholder="Insertar Código de Barras"> 
<input type="button" value="Generar" class="btn"><br>




</form>



<hr>
<div class="print" id="print">
--------------------<br>
....................<br>
,,,,,,,,,,,,,,,,,,,<br>

</div>
<script type="text/javascript" >


function init() {
var objBrowse = window.navigator;
if (objBrowse.appName == “Opera” || objBrowse.appName == “Netscape”) {
setTimeout(‘window.print()’, 1000);
} else {
window.print();
}
}
window.onload = init;
</script>

<hr>

<p><input type="button" class="printer" onClick="init()" value="Imprimir"></p>



</div>