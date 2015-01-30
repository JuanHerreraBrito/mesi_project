/* 
 * V2 Sell.Kichink
 * Store
 */
$(document).ready(function() {
    //Llena el menu superior con detalles de la tienda
    if (store_id != undefined) {
        call_api('/api/stores/get_store_details', 'post', {"store_id": store_id}, function(data) {
            var ajax_request = jQuery.parseJSON(data.toString());
            var response = ajax_request.data;
            $(".currname").html(response.name);
            $("#menu-store a.items").find(".badge").html((response.items_count>0)?response.items_count:0);
            $("#menu-store a.orders").find(".badge").html((response.orders_count>0)?response.orders_count:0);
            $("#menu-store a.payments").find(".badge").html((response.payments_count>0)?response.payments_count:0);
            $("#last_inventory").prop("checked",(parseInt(response.last_inventory)==1)?true:false);
            if (response.orders_count > 0)
                $("#menu-store a.orders").find(".badge").addClass("urgent");
            if (response.payments_count > 0)
                $("#menu-store a.payments").find(".badge").addClass("urgent");
            var ep = response.estado_publicacion;
            if (ep.status == "offline") {
                var percentage = 0;
                var step = 0;
                var message = "", html = "";
                if (ep.motivo_offline.header) {
                    percentage += 20;
                    step++;
                } else {
                    message = (message != "") ? message : kontrol_lang['store_reason_1'];
                }
                if (ep.motivo_offline.logo) {
                    percentage += 20;
                    step++;
                } else {
                    message = (message != "") ? message : kontrol_lang['store_reason_2'];
                }
                if (ep.motivo_offline.item) {
                    percentage += 20;
                    step++;
                } else {
                    message = (message != "") ? message : kontrol_lang['store_reason_3'];
                }
                if (ep.motivo_offline.pickup_data) {
                    percentage += 20;
                    step++;
                } else {
                    message = (message != "") ? message : kontrol_lang['store_reason_4'];
                }
                if (ep.motivo_offline.bank_data) {
                    percentage += 20;
                    step++;
                } else {
                    message = (message != "") ? message : kontrol_lang['store_reason_5'];
                }

                if (percentage < 100) {
                    html = '<li id="incomplete-profile" data-toggle="tooltip" data-placement="bottom" data-title="' + message + '">' +
                            '<a href="#">' +
                            '<span class="glyphicon glyphicon-exclamation-sign"></span>&nbsp;' +
                            '<span class="tip">' + step + ' / 5' + ' ' + message + '</span>' +
                            '<div class="progress">' +
                            '<div class="progress-bar" role="progressbar" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percentage + '%;background-color: #3dc5f5;">' +
                            '<span class="sr-only">' + percentage + '% '+kontrol_lang['store_perc_completed']+'</span>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</li>';

                } else {
                    html = '<li><a href="' + response.liga_preview + '" target="_blank" >'+kontrol_lang['store_preview_store']+'</a></li>';
                    if(parseInt(response.estado_publicacion.lugar_espera)>0){
                        html += '<li id="inqueue" class="disabled" data-toggle="tooltip" data-placement="bottom" data-title="'+kontrol_lang['store_lugar_espera']+' '+response.estado_publicacion.lugar_espera+' '+kontrol_lang['store_lugar_espera2']+'"><a class="publish" href="#">'+response.estado_publicacion.lugar_espera+' '+kontrol_lang['store_lugar_espera3']+'</a></li>';
                    }
                    else{
                        html += '<li id="requ_publish"><a class="publish" onclick="return publish(event);" href="#">'+kontrol_lang['store_request_pub']+'</a></li>';
                    }
                }
            } else {
                html = '<li><a href="' + response.liga_preview + '" target="_blank">'+kontrol_lang['store_preview_store']+'</a></li>';
                html += '<li id="install-store" class="dropdown">' +
                        '<a class="dropdown-toggle publish" data-toggle="dropdown" href="#">'+kontrol_lang['store_install']+'</a>' +
                        '<ul class="dropdown-menu">' +
                        '<li>' +
                        '<a href="#" onclick="javascript:add_to_fb_page();">' +
                        '<span class="glyphicon fa fa-facebook fa-2"></span>&nbsp;'+ kontrol_lang['store_fb_install'] +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a href="#" data-toggle="modal" data-target="#websiteModal">' +
                        '<span class="glyphicon glyphicon-globe"></span>&nbsp;'+ kontrol_lang['store_web_install'] +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '</li>';
            }

            $("#menu-store-status").html(html);
            $("#incomplete-profile").tooltip();
            $("#inqueue").tooltip();
            
            if (response.logo != "" && response.logo != undefined) {
                $(".fotoTienda").find("img").attr("src", response.logo);
                $(".fotoTienda").find("img").data("image",response.images_data.logo);
                $(".fotoTienda").attr("href", "/stores/id/" + store_id);

            }
            else{
                $(".fotoTienda").find("img").attr("src", "http://placehold.it/160x160");
            }
            
            if (response.header != "" && response.header != undefined) {
                $("#imageCover").find("img").attr("src", response.header);
                $("#imageCover").find("img").data("image",response.images_data.header);
            }
            

            if (response.sales > 0) {
                set_sales(response.sales);
            }
            if (response.page_views > 0) {
                set_views(response.page_views);
            }

            var itemsPrice_text = (response.itemsPrice_text == undefined) ? '#FFFFFF' : response.itemsPrice_text;
            var itemsPrice_back = (response.itemsPrice_back == undefined) ? '#532E63' : response.itemsPrice_back;

            $("#notif_total").html(response.last_notifications_unread);
            if (response.last_notifications_unread > 0)
                $("#notif_total.badge").addClass("urgent");
            if ($("#itemsPrice_text").length > 0)
                $("#itemsPrice_text").minicolors('value', itemsPrice_text);
            
            if ($("#itemsPrice_back").length > 0)
                $("#itemsPrice_back").minicolors('value', itemsPrice_back);

            $("head").append('<style>.items-price{' +
                    'color: ' + itemsPrice_text + ';' +
                    'background-color: ' + itemsPrice_back + ';}</style>'
                    );


        });
    }

});


