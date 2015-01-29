/* 
 * V2 Sell.Kichink
 * Order Details
 */

var unavailableDates = [
"2014-02-03",
"2014-03-17",
"2014-04-17",
"2014-04-18",
"2014-05-01",
"2014-05-05",
"2014-09-01", // solicitud de logistica
"2014-09-16",
"2014-11-17",
"2014-12-25",
"2015-01-01"]

// Exeptions if some Weekends are Working days
var enableDay = [];
// Weekend Days Sunday = 0 ... Sat =6
var weekend = [0, 6];

function nationalDays(date) {
    // get date
    //dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    dmy = date.getFullYear() + "-" + ((((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1)) + "-" + ((((date.getDate()) < 10) ? "0" : "") + (date.getDate()));

    // if Holiday then block it    
    if ($.inArray(dmy, unavailableDates) > -1) {
        return [false, "", "Unavailable"];
    }
    // if Exception then Enable it
    if ($.inArray(dmy, enableDay) > -1) {
        return [true, ""];
    }
    //if Weekend then block it
    if ($.inArray(date.getDay(), weekend) > -1) {
        return [false, "", "Unavailable"];
    }
    return [true, ""];
}

$(document).ready(function() {

    $("#msg").elastic();

    call_api('/api/orders/get_messages', 'post', {"limit": 20, "store_id": store_id, "order_id": order_id}, function(data) {
        var ajax_request = jQuery.parseJSON(data.toString());
        for (var i in ajax_request.data) {
            create_bubble(ajax_request.data[i].message, ajax_request.data[i].created, ajax_request.data[i].name, false);
        }
    });


    $('form[name=addComment]').find('#msg').keypress(function(event) {
        if (event.keyCode == 13)
        {
            if ($(this).val().length >= 5) {
                $("form[name=addComment]").submit();
            } else {
                create_bubble("M&iacute;nimo 5 caracteres por mensaje", "now", "System", true);
            }
            return false;
        }
    });

    $("form[name=addComment]").on("submit", function() {
        if ($("form[name=addComment]").find("#msg").val() != "") {
            $("form[name=addComment]").find("#msg").data("tmp-val", $("form[name=addComment]").find("#msg").val());
            $("form[name=addComment]").find("#msg").val("");
            var m = $("form[name=addComment]").find("#msg").data().tmpVal;
            create_bubble(m, "now", $("form[name=addComment]").find("input[name=user]").val(), true);
            call_api('/api/orders/add_message', 'post', {"message": m, "store_id": store_id, "order_id": order_id}, function(data) {

            });
        }

        return false;
    });


    function create_bubble(msg, time, name, animated) {
        var name_class = "you";

        if ($("form[name=addComment]").find("input[name=user]").val().toLowerCase().trim() == name.toLowerCase().trim()) {
            name_class = "me";
        } else if (name == "System") {
            name_class = "system";
        }

        if (time == "now") {
            var d = new Date();
            var curr_day = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            var curr_time = d.getHours() + ":" + ((d.getMinutes() >= 10) ? "" : "0") + d.getMinutes() + ":" + d.getSeconds();
            time = curr_year + "-" + ((curr_month >= 10) ? "" : "0") + curr_month + "-" + curr_day + " " + curr_time;
        }

        var b = document.createElement("div");
        $(b).addClass("bubble");
        $(b).html(msg.replace(/(<([^>]+)>)/ig, ""));
        $(b).append("<span class='author'>" + name + ", " + date_ago(time) + "</span>");
        $("#conversation").append(b);
        if (animated) {
            delay(function() {
                $(b).addClass(name_class);
            }, 400);
        }
        else
            $(b).addClass(name_class);
        $("#chat #conversation").animate({scrollTop: $("#conversation").offset().top});
    }

    $("#items-order").DinamicTable({
        tableClass: "table table-responsive table-items",
        numered: true, //Si va numerada
        selectable: false, //Si lleva checkboxes o no
        types: {
            image: "image",
            discount: "money",
            price: "money",
            total: "money"
        },
        dataTable: null,
        actions: [//Tpdas las acciones que quiero agregar
        ]
    });

    call_api('/api/orders/get_order_sell', 'post', {"store_id": store_id, "order_id": order_id}, function(data) {
        var obj = jQuery.parseJSON(data.toString());
        var items = [];
        var d = new Date(today); //fecha real hoy
        var d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        max_date = obj.data.timestamp_max;
        var m = new Date(max_date + " 00:00:00");
        loadDatepicker(min_date, max_date);

        //$("input#fecha_recoleccion").val(max_date);
        if ((d2.getTime() > m.getTime()) || ((d2.getTime() === m.getTime()) && (d.getHours() > 11))) {
            $("#acciones .hasDatepicker").attr("disabled", "true");
            $("#acciones button").addClass("disabled");
            $("#acciones button").unbind("click");
            $("#acciones").tooltip({title: kontrol_lang['date_expired'], html: true});
        }
        if(obj.data.status == 'confirmed' && obj.data.guide_dhl){
            $('#show-guide').show();
            $('#show-guide').off('click').on('click', function(){
                var post = {
                    'guia':     obj.data.id,
                    'store_id': store_id
                }
                call_api('/api/guias/showFile', 'post', post, function(result){
                    result = $.parseJSON(result);
                    if(result !== null){
                        var data = result.data;
                        if(typeof data.name != 'undefined'){
                            window.open('/orders/show_guide/?'+$.param(data), '_blank', 'fullscreen=yes');
                        }
                        else{
                            alert('Aún no se ha generado guía para esta órden');
                        }
                    }
                });
            });
        }
        else{
            $('#show-guide').remove();
        }
        $("#order-status").addClass(obj.data.status);
        $("#order-status").html(obj.data.status);
        $("#order-date").html(moment(obj.data.date).format("MMM D YYYY"));

        if (obj.data.horario_recoleccion.from != undefined) {
            obj.data.horario_recoleccion.from = obj.data.horario_recoleccion.from.replace(" ", "T");
            var d = new Date(obj.data.horario_recoleccion.from);
            var curr_day = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            if (curr_day)
                $(".from").html(((curr_day >= 10) ? "" : "0") + curr_day + "-" + ((curr_month >= 10) ? "" : "0") + curr_month + "-" + curr_year);
            else
                $(".from").html("-");
        } else {
            var d = new Date();
            var curr_day = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
        }

        if (obj.data.status != "new")
            $("#acciones").remove();
        else {
            $("#programar_recoleccion").click(function() {
                if($("input#fecha_recoleccion").val()!="")
                call_api('/api/orders/programar_recoleccion', 'post', {"date": $("input#fecha_recoleccion").val(), "store_id": store_id, "order_id": order_id}, function(data) {
                    $("#acciones").html(kontrol_lang['order_envio_programado'] + ": " + $("input#fecha_recoleccion").val());
                    $("#order-status").removeClass("new");
                    $("#order-status").html("confirmed");
                    $("#order-status").addClass("confirmed");
                });

            });

        }

        var total_de_totales = 0;
        //var total_gral = 0;

        for (var i in obj.data.items) {

            //var t = parseFloat((obj.data.items[i].price * obj.data.items[i].units) - obj.data.items[i].discount);
            var details = '';

            if (obj.data.items[i].description)
                details = obj.data.items[i].description;
            if (obj.data.items[i].selected_size)
                details += '<br />' + obj.data.items[i].selected_size;
            if (obj.data.items[i].sku)
                details += '<br />' + obj.data.items[i].sku;

            total_de_totales += parseFloat(obj.data.items[i].total_price);
            items.push({
                "details": details,
                "image": obj.data.items[i].image,
                "id": obj.data.items[i].item_id,
                "name": obj.data.items[i].name,
                "units": obj.data.items[i].units,
                "price": obj.data.items[i].price,
                "discount": obj.data.items[i].discount,
                "total": obj.data.items[i].total_price,
                "comments": obj.data.items[i].comments
            });
        }

        $(".subtotal").html("$" + number_format(total_de_totales, 2, ".", ","));
        $(".envio").html("+$" + number_format(obj.data.shipment_price, 2, ".", ","));
        $(".total-discounts").html("-$" + number_format(obj.data.total_discounts, 2, ".", ","));
        //total_gral = (parseFloat(total_de_totales)+parseFloat(obj.data.shipment_price))-parseFloat(obj.data.total_discounts);
        $(".total").html("$" + number_format(obj.data.total_price, 2, ".", ","));

        var visible = ["image", "id", "name", "details", "units", "price", "discount", "total"];
        if (items.length > 0) {
            $("#items-order").data().DinamicTable.methods.setHeader({"image": ""});
            $("#items-order").data().DinamicTable.methods.setContent(items);
            $("#items-order").data().DinamicTable.methods.setVisibleFields(visible);
            $("#items-order").data().DinamicTable.methods.drawTable();
        } else {
            $("#items-order").html("<span class='no'>" + kontrol_lang['order_no_items'] + "</span>");
        }

        if (obj.data.consumidor != undefined) {
            var tr = document.createElement("div");
            var td = document.createElement("div");
            var p = 0;

            if (obj.data.consumidor.nombre != undefined) {
                $(td).attr("align", "center");
                $(td).addClass("name");
                $(td).append("<div class='person img-circle'></div><br/>" + obj.data.consumidor.nombre);
                $(tr).append(td);
            } else {
                p++;
            }

            if (obj.data.consumidor.email != undefined) {
                td = document.createElement("div");
                $(td).attr("align", "center");
                $(td).append("<a href='mailto:" + obj.data.consumidor.email + "'><span class='glyphicon glyphicon-envelope'></span>&nbsp;" + obj.data.consumidor.email + "</a>");
                $(tr).append(td);
            } else {
                p++;
            }

            if (obj.data.consumidor.telefono != undefined) {
                td = document.createElement("div");
                $(td).attr("align", "center");
                $(td).append("<span class='glyphicon glyphicon-earphone'></span>&nbsp;" + obj.data.consumidor.telefono + "");
                $(tr).append(td);
            } else {
                p++;
            }

            if (obj.data.consumidor.direccion != undefined) {
                td = document.createElement("div");
                $(td).attr("align", "center");
                $(td).append("<span class='glyphicon glyphicon-home'></span>&nbsp;" +  obj.data.consumidor.direccion + ", " + (obj.data.consumidor.estado!=undefined?obj.data.consumidor.estado:'') + ", " + (obj.data.consumidor.estado!=undefined?obj.data.consumidor.cp:'') + ", " + (obj.data.consumidor.estado!=undefined?obj.data.consumidor.ciudad:'') + ", " + (obj.data.consumidor.estado!=undefined?obj.data.consumidor.pais:''));
                $(tr).append(td);
            } else {
                p++;
            }




            $("#consumidor .card").append(tr);

            /*
             if (p >= 3) {
             $("#consumidor").remove();
             }*/

        }
        if (obj.data.datos_recoleccion_tienda[0] != undefined) {
            var html = '';

            $.each(obj.data.datos_recoleccion_tienda, function(i, val) {

                if (i > 0)
                    html += '<br /><br />';

                html += '<b>' + (i + 1) + ') Direcci&oacute;n: </b><span class="calle">' + val.calle + '</span>&nbsp;<span class="numero">' + val.numero + '</span>&nbsp;';
                html += '<span class="interior">' + val.interior + '</span><span class="colonia">';
                if (val.colonia)
                    html += ', ' + val.colonia + ',';
                html += '</span>&nbsp;<span class="cp">';
                if (val.cp)
                    html += 'C.P. ' + val.cp + '<br/>';
                html += '</span>';
                html += '<span class="ciudad">' + val.ciudad + '</span><span class="estado_nombre">';
                if (val.estado_nombre)
                    html += ', ' + val.estado_nombre + ',';
                html += '</span>&nbsp;<span class="pais_nombre">' + val.pais_nombre + '</span>';
                html += '<br/>';
                html += '<b>Tel&eacute;fono:</b> <span class="telefono">' + val.telefono + '</span>';
                html += '<br/>';
                html += '<b>Contacto:</b> <span class="contacto">' + val.contacto + '</span>';
                html += '<br/>';
                html += '<b>Email:</b> <span class="email">' + val.email + '</span>';
                html += '<br/>';
                html += '<b>Referencias:</b> <span class="referencias">';
                if (val.referencias !== false)
                    html += val.referencias;
                html += '</span>';
            });
            $(".recoleccion").html(html);

            //$(".recoleccion").find(".calle").html(obj.data.datos_recoleccion_tienda[0].calle);
            //$(".recoleccion").find(".numero").html(obj.data.datos_recoleccion_tienda[0].numero);
            //$(".recoleccion").find(".interior").html(obj.data.datos_recoleccion_tienda[0].interior);
            //if (obj.data.datos_recoleccion_tienda[0].colonia)
            //    $(".recoleccion").find(".colonia").html(", " + obj.data.datos_recoleccion_tienda[0].colonia + ",");
            //if (obj.data.datos_recoleccion_tienda.cp)
            //    $(".recoleccion").find(".cp").html("C.P. " + obj.data.datos_recoleccion_tienda[0].cp + "<br/>");
            //$(".recoleccion").find(".ciudad").html(obj.data.datos_recoleccion_tienda[0].ciudad);
            //if (obj.data.datos_recoleccion_tienda[0].estado_nombre)
            //    $(".recoleccion").find(".estado_nombre").html(", " + obj.data.datos_recoleccion_tienda[0].estado_nombre + ",");
            //$(".recoleccion").find(".pais_nombre").html(obj.data.datos_recoleccion_tienda[0].pais_nombre);
            //$(".recoleccion").find(".contacto").html(obj.data.datos_recoleccion_tienda[0].contacto);
            //$(".recoleccion").find(".email").html(obj.data.datos_recoleccion_tienda[0].email);
            //$(".recoleccion").find(".telefono").html(obj.data.datos_recoleccion_tienda[0].telefono);
            //$(".recoleccion").find(".referencias").html(obj.data.datos_recoleccion_tienda[0].referencias);


            /*for (var key in obj.data.datos_recoleccion_tienda) {
             var el = "table.recoleccion ." + key;
             
             if ($(el).length > 0) {
             if (obj.data.datos_recoleccion_tienda[key] != "")
             $(el).html(obj.data.datos_recoleccion_tienda[key]);
             else
             $(el).html("-");
             }
             }*/
        }


        /*if (obj.data.horario_recoleccion.to) {
         $(".res-item .to").html(obj.data.horario_recoleccion.to);
         }*/

        if (obj.data.facturacion.length > 0) {
            for (var key in obj.data.facturacion) {
                var el = "table.facturacion ." + key;

                if ($(el).length > 0) {
                    if (obj.data.facturacion[key] != "")
                        $(el).html(obj.data.facturacion[key]);
                    else
                        $(el).html("-");
                }
            }
        } else {
            $("#facturacion").remove();
        }
    });
});
