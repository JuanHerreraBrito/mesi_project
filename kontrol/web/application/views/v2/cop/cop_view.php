<?
$this->load->helper('text');
$this->load->view('v2/layout/header_new');
$this->load->view('v2/stores/menu_store');
$this->load->view('v2/stores/sidebar_left');
?><!-------------------container starts here---------------------->
<!--<script type="text/javascript" src="/v2/js/stores.js"></script>-->
<script type="text/javascript" src="/v2/js/bootstrap-datepicker.js"></script>  

<link href="/v2/css/calendar_style.css?v=<?= @$v ?>" rel="stylesheet"/>   
<form class="form-inline" method="post" role="form">
    <div class="form-group">
        <label class="sr_only" for="cita_cop">Seleccione la fecha en que desea visitar COP</label> 
        <input data-provide="datepicker">
        <!--<input name="date" readonly="readonly" style="cursor: text" class="form-control" 
        placeholder="Da click para seleccionar la fecha" id="calendarito"/>-->
    </div>
</form>

<form class="form-inline" method="post" role="form">
    <div class="form-group">
        <label class="sr_only" for="cita_cop">Seleccione una hora de la lista:</label> 
        <select class="form-control" id = "avalibleTimes">
            
        </select>
        <!--<input name="date" readonly="readonly" style="cursor: text" class="form-control" 
        placeholder="Da click para seleccionar la fecha" id="calendarito"/>-->
    </div>
</form>


<?php
$this->load->view('v2/layout/footer');
?>