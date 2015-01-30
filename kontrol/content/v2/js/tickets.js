function resend_ticket(token, e) {
    call_api('/api/apps/resend_ticket', 'post', {"token": token}, function() {
        $(e).remove();
    });
}

$(document).ready(function() {

    resumen();
    search();

    $('#exportCSV').click(function(){
        exportToCSV();
        return false;
    });

    $("#search4ticket").submit(function() {
        search();
        return false;
    });

    $("input#options").change(function() {
        $('.panel-collapse').collapse('toggle');
        //$("#tickets").toggle();
    });

    function resumen() {
        call_api('/api/apps/get_resumen', 'post', "store_id=" + store_id, function(data) {
            var ajax_request = jQuery.parseJSON(data.toString());
            var obj = ajax_request.data;
            console.log(ajax_request);
            var total_items_dinero = 0, total_items_cantidad = 0;
            for (var i in obj.items) {
                var o = obj.items[i];
                $("#resumen-items tbody").append("<tr><td>No. " + o.item_id + " " + o.name + "</td><td align='center'>" + o.total_items + "</td><td align='right'>$" + number_format(o.total_sale, 2, '.', ',') + "</td></tr>");
                total_items_cantidad += parseFloat(o.total_items);
                total_items_dinero += parseFloat(o.total_sale);
            }
            $("#resumen-items tbody").append("<tr><td><b>TOTAL:</b></td><td align='center'><b>" + total_items_cantidad + "</b></td><td align='right'><b>$" + number_format(total_items_dinero, 2, '.', ',') + "</b></td></tr>");

            if (obj.invitados) {
                o = obj.invitados;
                $("#resumen-invitados tbody").append("<tr><td>No registrados</td><td align='center'>" + o.no_registrados + "</td><td align='right'>$" + number_format(o.no_registrados_monto, 2, '.', ',') + "</td></tr>");
                $("#resumen-invitados tbody").append("<tr><td>Registrados</td><td align='center'>" + o.registrados + "</td><td align='right'>$" + number_format(o.registrados_monto, 2, '.', ',') + "</td></tr>");
            }

            $("#resumen-invitados tbody").append("<tr><td><b>TOTAL:</b></td><td align='center'><b>" + (parseInt(o.registrados) + parseInt(o.no_registrados)) + "</b></td><td align='right'><b>$" + number_format(parseFloat(o.registrados_monto) + parseFloat(o.no_registrados_monto), 2, '.', ',') + "</b></td></tr>");


            if (obj.ordenes) {
                o = obj.ordenes;
                $("#resumen-ordenes tbody").append("<tr><td><img class='info' width='20px' src='/img/icono_info.png' data-title='Ordenes que fueron canceladas y no han podido cobrarse' data-toggle='tooltip'/> No pagadas</td><td align='center'>" + o.no_pagadas + "</td><td align='right'>$" + number_format(o.no_pagadas_monto, 2, '.', ',') + "</td></tr>");
                $("#resumen-ordenes tbody").append("<tr><td><img class='info' width='20px' src='/img/icono_info.png' data-title='Ordenes que han sido pagadas' data-toggle='tooltip'/> Pagadas</td><td align='center'>" + o.pagadas + "</td><td align='right'>$" + number_format(o.pagadas_monto, 2, '.', ',') + "</td></tr>");
            }

            $("#resumen-ordenes tbody").append("<tr><td><b>TOTAL:</b></td><td align='center'><b>" + (parseInt(o.pagadas) + parseInt(o.no_pagadas)) + "</b></td><td align='right'><b>$" + number_format((parseFloat(o.pagadas_monto) + parseFloat(o.no_pagadas_monto)), 2, '.', ',') + "</b></td></tr>");

            $(".info").tooltip();

        });
    }

    function search() {
        call_api('/api/apps/get_guests', 'post', "store_id=" + store_id + "&" + $("#search4ticket").serialize(), function(data) {
            var ajax_request = jQuery.parseJSON(data.toString());

            var html = '<div class="panel-group" id="accordion-tickets">';
            $("#tickets").html("");
            for (var i in ajax_request.data) {
                var obj = (ajax_request.data[i]);

                var body = "<h4 style='padding:10px 0;'>" + kontrol_lang["ticket_activation_code"] + ": <span oldhref='"+obj.activation_code_link+"' class='editable'>" + obj.activation_code + "</span></h4>";

                var v1 = obj.activation_code_order_link.split("/");
                body += "<h4 style='padding:10px 0;'>" + kontrol_lang["ticket_activation_code"] + " Orden: <span oldhref='"+obj.activation_code_order_link+"' class='editable'>" + v1[v1.length - 1] + "</span></h4>";

                if (obj.data_buyer)
                    body += '<div><b>' + kontrol_lang["ticket_buyer"] + ':</b> ' + obj.data_buyer.nombre + ", " + obj.data_buyer.cargo + ", " + obj.data_buyer.empresa + " " + obj.data_buyer.email + "</div>";
                if (obj.data_assistant)
                    body += '<div><b>' + kontrol_lang["ticket_attendant"] + ':</b> ' + obj.data_assistant.nombre + ", " + obj.data_assistant.telefono + ", " + obj.data_assistant.email + "</div><br/>";

                if (obj.guests.length > 0) {
                    //body += "<h3>Guests</h3>";

                    body += "<table class='table'>";
                    body += "<tr><th align='center'>#</th><th align='center'>" + kontrol_lang["ticket_guest"] + "</th><th align='center'>" + kontrol_lang["ticket_created"] + "</th><th align='center'>" + kontrol_lang["ticket_last_update"] + "</th><th align='center'>" + kontrol_lang["ticket_duplicated"] + "</th><th align='center'>" + kontrol_lang["ticket_redeemed"] + "</th><th style='text-align:center'>Token</td><th>" + kontrol_lang["actions"] + "</th></tr>";
                    for (var j = 0; j < obj.guests.length; j++) {
                        body += "<tr><td>" + obj.guests[j].id + "</td>" +
                                "<td>" + obj.guests[j].data.nombre + "<br/>" + obj.guests[j].data.empresa + "<br/>" + obj.guests[j].data.email + "<br/>" + "</td>" +
                                "<td>" + obj.guests[j].created + "</td>" +
                                "<td>" + ((obj.guests[j].data_last_time_updated) ? obj.guests[j].data_last_time_updated : "") + "</td>" +
                                "<td>" + ((obj.guests[j].duplicado) ? (obj.guests[j].duplicado + "<br/>" + obj.guests[j].duplicado_by + "<br/>" + obj.guests[j].duplicado_timestamp) : "") + "</td>" +
                                "<td>" + ((obj.guests[j].redimido) ? (obj.guests[j].redimido + "<br/>" + obj.guests[j].redimido_by + "<br/>" + obj.guests[j].redimido_timestamp) : "") + "</td>" +
                                "<td style='word-break: break-all;'><span class='editable' oldhref='"+obj.guests[j].token_link+"'>" + obj.guests[j].token + "</span></td>" +
                                "<td><button class='btn btn-default' onclick='resend_ticket(\"" + obj.guests[j].token + "\", this)'>" + kontrol_lang["ticket_send"] + "</button></td>" +
                                "</tr>";
                    }
                    body += "</table>";
                }

                html += '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                        '<a data-toggle="collapse" data-parent="#accordion-tickets" href="#collapse-' + obj.id + '" class="collapsed">' +
                        '<div class="panel-title">' +
                        '<b>No. ' + obj.order_id + '</b><i class="articulo"><i class="fa fa-ticket"></i> ' + obj.name + '</i><span>' + obj.total_guests + ' ' + kontrol_lang["ticket_guest"] + ((parseInt(obj.total_guests) > 1) ? "s" : "") + '</span>' +
                        '</div>' +
                        '</a></div>' +
                        '<div id="collapse-' + obj.id + '" class="panel-collapse collapse" style="height: 0px;">' +
                        '<div class="panel-body">' +
                        body +
                        '</div></div></div>';
            }
            html += "</div>";
            $("#tickets").append(html);
            $(".editable").tooltip({
                "title": "Hacer clic para editar"
            });

            $(".editable").on("click", switchToInput);
        });

    }

    function exportToCSV(){   
        call_api('/api/apps/exportCSV', 'post', "store_id=" + store_id, function(data) {
            var ajax_request = jQuery.parseJSON(data.toString());
            var obj = ajax_request.data;
            console.log(ajax_request);
            if(obj == true){
                DownloadFile('/stores/showFile/');
            }else{
                alert('No se encontraron resultados para descargar el reporte');
            }
        });
    }

    function DownloadFile(url){
        var hiddenIFrameID = 'hiddenDownloader',
            iframe = document.getElementById(hiddenIFrameID);
        if (iframe === null) {
            iframe = document.createElement('iframe');
            iframe.id = hiddenIFrameID;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        iframe.src = url;
    }

});

var switchToInput = function() {
    var input = $(document.createElement("input"));
    var attributes = $(this).prop("attributes");

    $.each(attributes, function() {
        input.attr(this.name, this.value);
    });
    input.attr("value", $(this).attr("oldhref"));
    input.attr("oldhref", $(this).html());
    input.attr("type", "text");
    input.on("blur", switchToSpan);
    $(this).tooltip('hide');
    $(this).replaceWith(input);
    input.focus();
};
var switchToSpan = function() {
    var span = $(document.createElement("span"));    
    var attributes = $(this).prop("attributes");

    $.each(attributes, function() {
        span.attr(this.name, this.value);
    });
    
    span.html($(this).attr("oldhref"));
    span.attr("oldhref", span.attr("value"));
    span.on("click", switchToInput);
    span.tooltip();
    $(span).tooltip({
                "title": "Hacer clic para editar"
     });
    $(this).replaceWith(span);
    
};