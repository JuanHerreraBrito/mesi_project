/* 
 * V2 Sell.Kichink
 * Payments
 */

$(document).ready(function() {

    $(".general").tooltip();

    $("#pending-payments").DinamicTable({
        tableClass: "table table-responsive transparent",
        numered: false, //Si va numerada
        selectable: false, //Si lleva checkboxes o no
        types: {
            status: "label",
            total_price: "money",
            time_ago: "time_ago"
        },
        /*dataTable: {
            "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "sPaginationType": "bootstrap",
            "bFilter": false,
            "bInfo": false,
            "oLanguage": {
                "sInfo": "_START_ - _END_ / _TOTAL_ records",
                "sLengthMenu": "Show _MENU_",
                "sPrevious": "",
                "sNext": ""
            }
        },*/
        actions: [//Tpdas las acciones que quiero agregar
            {
                label: kontrol_lang['payments_view_detail'],
                type: "href",
                href:'/payments/store/' + store_id + '/'
            }]
    });

    $("#closed-payments").DinamicTable({
        tableClass: "table table-responsive transparent",
        numered: false, //Si va numerada
        selectable: false, //Si lleva checkboxes o no
        types: {
            status: "label",
            total_price: "money",
            time_ago: "time_ago"
        },
        /*dataTable: {
            "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "sPaginationType": "bootstrap",
            "bFilter": false,
            "bInfo": false,
            "oLanguage": {
                "sInfo": "_START_ - _END_ / _TOTAL_ records",
                "sLengthMenu": "Show _MENU_",
                "sPrevious": "",
                "sNext": ""
            }
        },*/
        actions: [//Tpdas las acciones que quiero agregar
            {
                label: kontrol_lang['payments_view_detail'],
                type: "href",
                href:'/payments/store/' + store_id + '/'
                
            },
            {
                label: kontrol_lang['payments_view_report'],
                type: "href",
                href:'/payments/view/'
            }],
    });

    $("#available-orders").DinamicTable({
        tableClass: "table table-responsive transparent",
        numered: false, //Si va numerada
        selectable: false, //Si lleva checkboxes o no
        types: {
            status: "label",
            total_price: "money",
            time_ago: "time_ago"
        }
        /*actions: [//Tpdas las acciones que quiero agregar
            {
                label: "Ver Detalle",
                type: "href",
                href: '/orders/store/' + store_id + '/'
            }]*/
    });

  function get_payments(status, page, limit) {
        call_api('/api/pagos/get_pagos_sell', 'post', {store_id: store_id, status: status, page: page, limit: limit}, function(data) {
            var obj = jQuery.parseJSON(data.toString());
            var visible = ["status", "id", "items_count", "total_price", "time_ago"]

            if (obj.data.length > 0) {
                
                // Evento para ver reporte de pago
                $('body').off('click', '.reporte').on('click', '.reporte', function(event){
                    event.preventDefault();
                    call_api('/api/pagos/pdf_resumen', 'post', {store_id: store_id, payment_id: $(this).eq(0).closest('tr').data('data').id }, function(data){
                        try{
                            var obj = jQuery.parseJSON(data.toString());
                            if(obj.data.size > 0){
                                window.open('/payments/view/?'+$.param(obj.data), '_blank', 'fullscreen=yes');
                            }
                            else throw "";
                        }
                        catch(e){
                            alert('Ocurrio un problema, favor de notificarlo');
                        }
                    });
                });
                $("#"+status+"-payments").data().DinamicTable.methods.setContent(obj.data);
                $("#"+status+"-payments").data().DinamicTable.methods.setVisibleFields(visible);
                $("#"+status+"-payments").data().DinamicTable.methods.drawTable();
                
                var total_pages = Math.ceil(obj.data[0].total_count / limit);

                var select = document.createElement("select");
                $(select).attr("id", "offset-" + status);
                $(select).append('<option value="10">10</option>');
                if (obj.data[0].total_count > 25)
                    $(select).append('<option value="25">25</option>');
                if (obj.data[0].total_count > 50)
                    $(select).append('<option value="50">50</option>');
                if (obj.data[0].total_count > 100)
                    $(select).append('<option value="100">100</option>');
                $(".total-"+status).html("$"+number_format(obj.data[0].amount_gral,2,".",","));

                var t=0;
                
                for(var b in obj.data){
                    t+=parseInt(obj.data[b].items_count);
                }
                
                $(".solicitudes-general-"+status).html(obj.data[0].total_count?obj.data[0].total_count:0);
                
                $(".articulos-general-"+status).html(t);
                var simbolo="";
                var cantidad=0;
                
                if(obj.data[0].amount_gral>0){
                    simbolo="";
                    cantidad=Math.floor(obj.data[0].amount_gral);
                }
                if(obj.data[0].amount_gral>1000){
                    simbolo="K";
                    cantidad=Math.floor(obj.data[0].amount_gral/1000);

                }
                if(obj.data[0].amount_gral>1000000){
                    simbolo="M";
                    cantidad=Math.floor(obj.data[0].amount_gral/1000000);
                }
                if(obj.data[0].amount_gral>1000000000){
                    simbolo="B";
                    cantidad=Math.floor(obj.data[0].amount_gral/1000000000000);
                }
                if(obj.data[0].amount_gral>1000000000000000){
                    simbolo="T";
                    cantidad=Math.floor(obj.data[0].amount_gral/1000000000000);
                }
                if(cantidad==0 || cantidad==undefined || cantidad==null)
                    simbolo="";
                    
                    
                $(".total-general-"+status).html(cantidad+" "+simbolo);
                
                $(select).on("change", function() {
                    get_payments(status, 1, $(this).val());
                });

                var div = document.createElement("div")
                $(div).addClass("info");
                $(div).append(kontrol_lang["orders_mostrando"]+"&nbsp;");
                $(div).append(select);
                $(div).append("&nbsp;"+kontrol_lang["orders_resultados"]+"&nbsp;");
                $(div).append("<b>" + obj.data[0].total_count +" "+ kontrol_lang["pagos_show_"+status] + "<b/>");
                /*
                var select2 = document.createElement("select");
                $(select2).append('<option value="USD" '+((currency=="USD")?"selected":"")+'>USD</option>');
                $(select2).append('<option value="MXN" '+((currency!="USD")?"selected":"")+'>MXN</option>');
                
                 $(select2).on("change", function() {
                    get_payments(status, 1, limit, $(this).val(),currency);
                });
                
                
                $(div).append(select2);
                */

                $("#" + status + "-payments").prepend(div);

                if (page <= 0)
                    page = 1;

                if (page > total_pages)
                    page = 1;

                var from = 0, to = 5;
                if (page <= 3) {
                    from = 1;
                }
                else if (page > 3) {
                    from = page - 2;
                }

                if ((page + 2) >= total_pages)
                    from = total_pages - 5;

                if (from < 0)
                    from = 1;
                to = from + 5;
                if (to > total_pages)
                    to = total_pages;

                var pagination = document.createElement('ul');
                $(pagination).addClass("pagination");
                $(pagination).append('<li class="' + ((page != 1) ? "" : 'disabled') + '"><a class="prev">&laquo;</a></li>');

                for (var i = from; i <= to; i++) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");

                    $(a).html(i);
                    $(a).attr("data-index", i);

                    if (page == i) {
                        $(li).addClass("active");
                    } else {
                        $(a).click(function() {
                            get_payments(status, $(this).data().index, limit);
                        });
                    }
                    $(li).html(a);
                    $(pagination).append(li);
                }
                $(pagination).append('<li class="' + ((page != total_pages) ? "" : 'disabled') + '"><a class="next">&raquo;</a></li>');

                if (total_pages > 1) {
                    var input = document.createElement("input");
                    var form = document.createElement("form");
                    $(input).attr("type", "text");
                    $(input).val(page);
                    $(input).attr("class", "form-control");
                    $(input).keypress(function(evt) {
                        var charCode = (evt.which) ? evt.which : event.keyCode
                        if (charCode > 31 && (charCode < 48 || charCode > 57))
                            return false;
                        return true;
                    });
                    $(form).addClass("input-group");
                    $(form).css("float", "left");
                    $(form).addClass("gotoPage");
                    $(form).html(input);
                    $(form).attr("method", "post");
                    $(form).append('<span class="input-group-btn"><button class="btn btn-default" type="submit">Go!</button></span>');
                    $(form).on("submit", function() {
                        var p = parseInt($(this).find("input").val());
                        p = (p > total_pages) ? page : p;
                        get_payments(status, p, limit);
                        $(this).val(p);
                        return false;
                    });
                    $("#pagination-" + status).html(form);
                    
                    $(pagination).find("li[class!=disabled] a.next").click(function(){
                        get_payments(status, page+1, limit);
                    });
                    $(pagination).find("li[class!=disabled] a.prev").click(function(){
                        get_payments(status, page-1, limit);
                    });
                    
                    $("#pagination-" + status).append(pagination);
                }
                setTooltip($("#" + status + "-payments").find('.label.status'));
            } else {
                $(".total-"+status).html("$0.00");
                $("#" + status + "-payments").html("<span class='no'>" + kontrol_lang['payments_no_deposits']+"</span>");
            }
        });
    }


    $("#solicitar-deposito-btn").click(function() {
        call_api('/api/pagos/solicitar_deposito', 'post', {store_id: store_id}, function(data) {
            var obj = jQuery.parseJSON(data.toString());
            var text = kontrol_lang['payments_requests_1'] + obj.data.fecha_pago +
                    kontrol_lang['payments_requests_2'] + obj.data.banco_cuenta + kontrol_lang['payments_requests_3'] + obj.data.nombre_cuenta;
                    
            if(obj.data.rfc === null || obj.data.rfc == ""){
                text += '<br /><br />'+kontrol_lang['payments_requests_4'] + '<input required="required" type="text" maxlength="15" id="data_rfc" value="" />';
            }

            $("#modal-pagos").find(".modal-body").html(text);
            $("#modal-pagos").modal("show");

            $("#modal-pagos .btn-primary").click(function() {
                var patternName = new RegExp(/^([A-Z&Ññ]{3}|[A-Z][AEIOU][A-Z]{2})\d{2}((01|03|05|07|08|10|12)(0[1-9]|[12]\d|3[01])|02(0[1-9]|[12]\d)|(04|06|09|11)(0[1-9]|[12]\d|30))([A-Z0-9]{2}[0-9A-Z])?$/);
                if(($('#data_rfc').val() != "" && patternName.test($('#data_rfc').val())) || obj.data.rfc != "")
                {
                    $("#modal-pagos").modal("hide");
                    call_api('/api/pagos/confirmar_solicitud_deposito', 'post', {store_id: store_id, rfc: $('#data_rfc').val() }, function(data) {
                        $("#modal-pagos").remove();
                        $("#getdeposit.well").remove();
                        window.location.reload()
                    });
                }
                else{
                    $('#data_rfc').focus();
                }
            });
        });
        
    });
    
    function get_orders(status, page, limit, currency) {
        call_api('/api/orders/get_orders_sell', 'post', {store_id: store_id, status: status, page: page, limit: limit}, function(data) {
            var obj = jQuery.parseJSON(data.toString());
            var visible = ["status", "id", "items_count", ((currency=="USD")?"total_price_USD":"total_price"), "currency", "time_ago"];
            if (obj.data.length > 0) {
                $("#getdeposit.well").show();
                $("#" + status + "-orders").data().DinamicTable.methods.setContent(obj.data);
                $("#" + status + "-orders").data().DinamicTable.methods.setVisibleFields(visible);
                $("#" + status + "-orders").data().DinamicTable.methods.drawTable();
                var total_pages = Math.ceil(obj.data[0].total_count / limit);

                var select = document.createElement("select");
                $(select).attr("id", "offset-" + status);
                $(select).append('<option value="10">10</option>');
                if (obj.data[0].total_count > 25)
                    $(select).append('<option value="25">25</option>');
                if (obj.data[0].total_count > 50)
                    $(select).append('<option value="50">50</option>');
                if (obj.data[0].total_count > 100)
                    $(select).append('<option value="100">100</option>');
                $(".total-"+status).html("$"+((currency == "USD")?number_format(obj.data[0].amount_gral_USD,2,".",",")+" USD":number_format(obj.data[0].amount_gral,2,".",",")));
                
                $(select).on("change", function() {
                    get_orders(status, 1, $(this).val(), currency);
                });

                var div = document.createElement("div");
                $(div).addClass("info");
                $(div).append("<b>Mostrando</b>&nbsp;");
                $(div).append(select);
                $(div).append("&nbsp;resultados por p&aacute;gina&nbsp;");
                $(div).append("de un total de <b>" + obj.data[0].total_count + " ordenes " + status + "</b> en ");

                var select2 = document.createElement("select");
                $(select2).append('<option value="USD" '+((currency=="USD")?"selected":"")+'>USD</option>');
                $(select2).append('<option value="MXN" '+((currency!="USD")?"selected":"")+'>MXN</option>');
                
                 $(select2).on("change", function() {
                    get_orders(status, 1, limit, $(this).val(),currency);
                });
                
                
                $(div).append(select2);


                $("#" + status + "-orders").prepend(div);

                if (page <= 0)
                    page = 1;

                if (page > total_pages)
                    page = 1;

                var from = 0, to = 5;
                if (page <= 3) {
                    from = 1;
                }
                else if (page > 3) {
                    from = page - 2;
                }

                if ((page + 2) >= total_pages)
                    from = total_pages - 5;

                if (from < 0)
                    from = 1;
                to = from + 5;
                if (to > total_pages)
                    to = total_pages;

                var pagination = document.createElement('ul');
                $(pagination).addClass("pagination");
                $(pagination).append('<li class="' + ((page != 1) ? "" : 'disabled') + '"><a class="prev">&laquo;</a></li>');

                for (var i = from; i <= to; i++) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");

                    $(a).html(i);
                    $(a).attr("data-index", i);

                    if (page == i) {
                        $(li).addClass("active");
                    } else {
                        $(a).click(function() {
                            get_orders(status, $(this).data().index, limit, currency);
                        });
                    }
                    $(li).html(a);
                    $(pagination).append(li);
                }
                $(pagination).append('<li class="' + ((page != total_pages) ? "" : 'disabled') + '"><a class="next">&raquo;</a></li>');

                if (total_pages > 1) {
                    var input = document.createElement("input");
                    var form = document.createElement("form");
                    $(input).attr("type", "text");
                    $(input).val(page);
                    $(input).attr("class", "form-control");
                    $(input).keypress(function(evt) {
                        var charCode = (evt.which) ? evt.which : event.keyCode
                        if (charCode > 31 && (charCode < 48 || charCode > 57))
                            return false;
                        return true;
                    });
                    $(form).addClass("input-group");
                    $(form).css("float", "left");
                    $(form).addClass("gotoPage");
                    $(form).html(input);
                    $(form).attr("method", "post");
                    $(form).append('<span class="input-group-btn"><button class="btn btn-default" type="submit">Go!</button></span>');
                    $(form).on("submit", function() {
                        var p = parseInt($(this).find("input").val());
                        p = (p > total_pages) ? page : p;
                        get_orders(status, p, limit, currency);
                        $(this).val(p);
                        return false;
                    });
                    $("#pagination-" + status).html(form);
                    
                    $(pagination).find("li[class!=disabled] a.next").click(function(){
                        get_orders(status, page+1, limit, currency);
                    });
                    $(pagination).find("li[class!=disabled] a.prev").click(function(){
                        get_orders(status, page-1, limit, currency);
                    });
                    
                    $("#pagination-" + status).append(pagination);
                }
                setTooltip($("#" + status + "-orders").find('.label.status'));
            } else {
                $("#" + status + "-orders").html("<span class='no'>" + kontrol_lang['orders_no_orders'] + "</span>");
                $("#getdeposit.well").remove();

            }
        });
    }
    
    get_payments("pending", 1, 10);
    get_orders("available", 1, 10,"MXN");
    get_payments("closed", 1, 10);


});
