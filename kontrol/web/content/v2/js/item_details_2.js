$(document).ready(function() {

    $(".agregaropc #moption").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var li = document.createElement("li");
        $(li).addClass("opcion");
        var close = document.createElement("a");
        $(close).addClass("close");
        $(close).html("&times;");
        $(close).click(function() {
            $(this).closest(".opcion").remove();
        });
        $(li).html(close);
        $(li).append("<label>Opci&oacute;n:</label>&nbsp;<input placeholder='Nombre opci&oacute;n (ej. Mediana, Grande, XL, S)' class='form-control nombre' type='text' value='" + $(".agregaropc").find("input").val() + "'/><hr/>");
        $(".agregaropc").find("input").val("");
        $(".agregaropc").find("input").blur();
        $(li).append('<input type="text" width="50%" placeholder="Ingrese sub-opciones separadas por comas, (ej. Azul, Rojo, Negro)" data-role="tagsinput" />');
        $(".opciones").append(li);
        $("input[data-role=tagsinput]").tagsinput();
        $(".agregaropc").find("input").blur();
        return false;

    });


    $(".info-info").click(function() {
        $("#modal-infografia").modal("show");

        var im = document.createElement("img");
        $(im).attr("src", $(this).data().infografia);
        $(im).addClass("img-responsive");

        $("#modal-infografia").find(".modal-body").html(im);
    });


    // Tipo de cambio
    var xRate = 1;
    // Thumbnails de imagenes para items
    var thumbnailsImages = new Array();
    // Categorias seleccionadas del item
    var items_categories = new Array();
    var items_categoriesOld = new Array();
    var categories_stores = new Array();

    // Inventario manejado por K!
    var manager_k = false;
    // Tipo de item
    var physical = true;

    description_textarea = tinymce.init({
        selector: "#description",
        menubar: false,
        statusbar: true,
        height: 150,
        language: (lang == 'en') ? '' : lang,
        entity_encoding: "raw",
        plugins: [
            "textcolor  paste"
        ],
        toolbar1: "styleselect forecolor backcolor | bullist numlist outdent indent "
    });
    description_eng_textarea = tinymce.init({
        selector: "#description_eng",
        menubar: false,
        statusbar: true,
        height: 150,
        language: (lang == 'en') ? '' : lang,
        entity_encoding: "raw",
        plugins: [
            "textcolor  paste"
        ],
        toolbar1: "styleselect forecolor backcolor | bullist numlist outdent indent "
    });

    // Instantiate the widget
    var featherEditor = new Aviary.Feather({
        apiKey: '6282e2a3c',
        apiVersion: 2,
        language: 'en',
        tools: ['crop', 'resize', 'enhance', 'effects', 'stickers', 'orientation', 'brightness', 'contrast', 'saturation', 'sharpness', 'draw', 'text', 'redeye', 'whiten', 'blemish'],
        //initTool : 'crop',
        onSave: function() {
            //alert(newURL);
            location.reload();
        },
        postUrl: base_url + 'mediaAv/saveAviary'
    });

    $('input[name="tableID"]').val(item_id);
    /*$('#toggle-button').bootstrapSwitch({
     
     width: 100,
     height: 25,
     font: {
     'font-size': '16px',
     'font-style': 'normal'
     },
     animated: true,
     transitionspeed: 1, // Accepted values float or "percent" [ 1, 0.5, "150%" ]
     label: {
     enabled: "ON",
     disabled: "OFF"
     },
     style: {
     // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
     enabled: "primary",
     disabled: "danger",
     custom: {
     disabled: {
     background: "#D0D0D0",
     gradient: "#DDD",
     color: "#969696"
     }
     }
     }
     });*/

    $('#toggle-button').bootstrapSwitch();
    $('#toggle-button').bootstrapSwitch('setState', false);

    $('#price').autoNumeric();
    $('#priceUSD').autoNumeric();
    $('#imageEdit > a').tooltip();

    function createPageImage(index, element) {
        //Add images to pager
        var html = '';
        var style = '';

        if (index == 0)
            style = 'style="border: 2px solid #542d65;"';

        html = '<li ' + style + ' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Arrastre para cambiar el orden" class="thumbnailBox" id="' + thumbnailsImages[index].id + '"><a href="#"><img class="img-responsive" src="' + thumbnailsImages[index].img + '" /></a></li>';
        return html;
    }

    function convertionPrice() {
        var price = Number($('#price').autoNumericGet());
        var total = price;
        var totalUSD = price / xRate;

        $('#price').autoNumericSet(total.toFixed(2));
        $('#priceUSD').autoNumericSet(totalUSD.toFixed(2));
    }
    function convertionPriceUSD() {
        var price = Number($('#priceUSD').autoNumericGet());
        var total = price * xRate;
        var totalUSD = price;

        $('#price').autoNumericSet(total.toFixed(2));
        $('#priceUSD').autoNumericSet(totalUSD.toFixed(2));
    }

    function onAfter() {
        var getId = $('.slide').children('img:visible').attr('id');
        var getAlt = $('.slide').children('img:visible').attr('alt');

        $('.slide').children('img:visible').attr('style', '');
        $('.slide').attr('style', '');

        var get_objectName = $('.slide').children('img:visible').attr('alt');
        get_objectName = get_objectName.split('-');

        var id = getId.split('&');

        var origExt = $('.slide').children('img:visible').attr('class').split(' ');

        $('#image_id').attr('value', id[0]);
        $('#object_name').attr('value', get_objectName[1]);
        $('#counter_span').html(get_objectName[0]);

        var itemURL = $('.slide').children('img:visible').attr('src');
        var launchId = getId;
        var launchSrc = itemURL.substr(0, itemURL.length - 6) + '_b.' + origExt[1];

        $('a#editPicture').data('id', launchId);
        $('a#editPicture').data('src', launchSrc);
    }

    function createObjectDataTree(data) {
        var stringJSON = '';

        // Arma recursivamente el JSON para dibujar el arbol
        $.each(data, function(index, val) {
            categories_stores.push(val.id);
            stringJSON += "{";
            stringJSON += '"id" : "' + val.id + '",';
            stringJSON += '"text" : "' + val.name + '",';
            stringJSON += '"state" : { "opened" : true},';
            stringJSON += '"a_attr" : { "href" : "#' + val.id + '"}';

            if (typeof val.subcats != 'undefined' && val.subcats.length > 0) {
                stringJSON += ',"children" : [';
                stringJSON += createObjectDataTree(val.subcats);
                stringJSON += "]";
            }

            stringJSON += "}";
            if ((index + 1) < data.length)
                stringJSON += ",";
        });

        return stringJSON;
    }

    function validate_field(id) {

        var groupName = new RegExp(/^[a-zA-ZÁÉÍÓÚáéíóúñÑäëïöüÄËÏÖÜ\s]+$/);
        var opcionName = new RegExp(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑäëïöüÄËÏÖÜ\/\-\.\s]+$/);
        var error = false;

        switch (id) {

            case "grupo_opt":
                var field_value = $('.' + id).val();
                if (!groupName.test(field_value) || field_value.length < 1 || field_value.length > 20) {
                    error = true;
                    $('.' + id).css('border', '1px solid #A22F40');
                } else {
                    $('.' + id).css('border', '1px solid #80B437');
                }
                break;

            case "opcion_opt":
                var found = {};
                $('.opcion_opt').each(function() {
                    var field_value = $(this).val();
                    if (!opcionName.test(field_value) || field_value.length < 1 || field_value in found || field_value.length > 20) {
                        error = true;
                        $(this).css('border', '1px solid #A22F40');
                    } else {
                        found[field_value] = true;
                        $(this).css('border', '1px solid #80B437');
                    }
                });
                break;

            case "select_opt":
                var field_value = $('.' + id).val();
                if (field_value !== 'select') {
                    error = true;
                    $('.' + id).css('border', '1px solid #A22F40');
                } else {
                    $('.' + id).css('border', '1px solid #80B437');
                }
                break;

        }

        return error;

    }

    function validate_all_fields() {

        var fields_submit = ['grupo_opt', 'opcion_opt', 'select_opt'];
        var count = 0;

        for (var i = 0; i < fields_submit.length; i++) {
            if (validate_field(fields_submit[i])) {
                count++;
            }
        }

        if (count != 0) {
            return false;
        } else {
            return true;
        }

    }

    function save_purchase_opts() {
        $(".opciones .nombre").removeClass("error");
        var validate = false;

        if ($("#group_name").val() !== "") {
            $(".opciones .nombre").each(function() {
                if ($(this).val() == "") {
                    $(this).addClass("error");
                    validate = false;
                }
            });
            validate = true;
        }

        var save = $('#save_purchase_opts');
        var add = $('#boton_append_1');
        save.attr('disabled', 'disabled');
        add.attr('disabled', 'disabled');
        save.text('Guardando');


        var r = new Array();
        $(".opciones").find(".opcion").each(function(i, e) {
            var k = $(e).find(".nombre").val();
            if (k) {
                var v = $(e).find("input[data-role=tagsinput]").tagsinput('items');
                if (v.length > 0) {
                    for (var i in v) {
                        if (v[i][0] === " ") {
                            v[i] = v[i].replace(" ", "");
                        }
                        r.push(k + ":" + v[i]);
                    }
                } else {
                    r.push(k);
                }
            }
        });

        var query_data = {
            item_id: item_id,
            store_id: store_id,
            group_name: $("#group_name").val(),
            group_type_display: "select",
            options: r
        };


        if (validate) {

            call_api('/api/items/add_purchase_option_group', 'post', query_data, function(response) {
                try {
                    var ajax_result = jQuery.parseJSON(response);
                    if (ajax_result.data === true) {
                        location.reload();
                    } else {
                        ShowMessage('alert', 'Ocurri&oacute; un error al procesar acci&oacute;n', function() {
                            save.removeAttr('disabled');
                            add.removeAttr('disabled');
                            save.text('Guardar');
                        });
                    }
                } catch (e) {
                    ShowMessage('alert', 'Ocurri&oacute; un error al procesar acci&oacute;n', function() {
                        save.removeAttr('disabled');
                        add.removeAttr('disabled');
                        save.text('Guardar');
                    });
                }
            });
        } else {
            ShowMessage('alert', 'Los nombres de las opciones no deben contener caracteres extraños', function() {
                save.removeAttr('disabled');
                add.removeAttr('disabled');
                save.text('Guardar');
            });
        }

    }

    function doTreeItem(tree, plugins, data) {
        if (plugins == undefined)
            plugins = [];

        /*
         * Data que se pasará al arbol para que se dibuje
         */
        var dataTree = '[';

        dataTree += "{";
        dataTree += '"text" : "All",';
        dataTree += '"state" : { "opened" : true, "disabled" : true},';
        dataTree += '"a_attr" : { "href" : "#"}';
        dataTree += ',"children" : [';
        if (data.length > 0) {
            dataTree += createObjectDataTree(data);
        }

        dataTree += "]";
        dataTree += "}";
        dataTree += "]";
        dataTree = jQuery.parseJSON(dataTree.toString());

        $(tree).jstree({
            "checkbox": {
                real_checkboxes: true
            },
            "xml_data": {
                "ajax": {
                    cache: false
                }
            },
            "core": {
                "animation": 0,
                "check_callback": true,
                "themes": {"dots": true, "stripes": true},
                "data": dataTree
            },
            "types": {
                "#": {"max_children": 1, "max_depth": 6, "valid_children": ["root"]},
                "root": {"icon": "glyphicon glyphicon-tags", "valid_children": ["default"], "max_depth": 5},
                "default": {"icon": "glyphicon glyphicon-tag", "valid_children": ["default", "file"]}
            },
            "plugins": plugins
        });

    }

    function AddOptionDisplay(data) {
        var html = '';

        $.each(data, function(i, val) {
            html += '<h2 style="font-weight:300;margin:0 10px">';
            html += '    <div style="width:90px;float:left"><small>' + val.option_name + '</small></div>';
            html += '    <textarea name="optDisplay_' + val.id + '" id="display_option_value_' + i + '" rows="4" class="form-control" style="margin-top:5px;text-align:left" >' + (val.option_values != undefined ? val.option_values : '') + '</textarea>';
            html += '</h2>';
        });
        $('#settings_opts_panel_2').html(html);
    }

    function AddOptionPurchase(data) {
        var html = '';
        var disabled = (manager_k) ? 'disabled="disabled"' : '';

        html += data.group_name;

        $.each(data.options, function(i, val) {
            html += '<div style="width: 80%; margin-left: auto; margin-right: auto;" class="input-group">';
            html += '	<span style="width: 30%;" class="input-group-addon">' + val.label + '</span>';
            html += '	<input ' + disabled + ' name="optBuy_' + val.label_encode + '" value="' + val.units + '" type="text" class="form-control" id="' + val.label_encode + '"';
            html += '		    placeholder="Num Units">';
            html += '</div>';
        });
        $('#settings_opts_panel_1 > #option_item').html(html);
    }
    function ShowMessage(type, msg, fn) {
        var element = new Object;
        switch (type) {
            case 'alert':
                element = $('.alert-danger').html(msg).show("slow");
                break;
            case 'success':
                element = $('.alert-success').html(msg).show("slow");
                break;
        }
        setTimeout(function() {
            element.hide("slow");
        }, 5000);
        if (typeof fn == 'function')
            fn();
    }
    function AddDiscountsTable(data) {
        var html = '';
        $.each(data, function(i, val) {
            html += '<tr>';
            html += '	<td width="40%" style="text-align:center">';
            html += '		<div style="font-size:18px;">';

            if (val.coupon_code !== null && val.coupon_code != '')
                html += '				' + lang_txt.stores_itempage_discounts_code + ':<div style="font-size:12px">' + val.coupon_code + '</div>';

            if (val.order_perc !== null && val.order_perc != '' && val.order_perc != 0)
                html += '				' + val.order_perc + '%';

            if (val.order_money !== null && val.order_money != '')
                html += '				$' + val.order_money;

            html += '		</div>';
            html += '		<button type="button" id="' + val.id + '" class="btn-delete-discount btn btn-danger btn-sm">[ ' + lang_txt.stores_itempage_discounts_del + ' ]</button>';
            html += '	</td>';
            html += '	<td width="60%">';
            html += '			$ ' + val.price_discount + ' x';

            if (val.max_discounts !== null && val.max_discounts != '' && val.max_discounts > 0)
                html += '			<p><small>' + val.max_discounts + ' ' + lang_txt.stores_itempage_discounts_units + '</small></p>';

            html += '		<br/>';
            html += '		<p><small>';
            html += '			' + val.start_date;

            if (val.end_date !== null && val.end_date != '') {
                html += '				' + val.end_date;
            }
            else {
                html += '				- ' + lang_txt.stores_itempage_discounts_expiration;
            }
            html += '		</small></p>';
            html += '	</td>';
            html += '</tr>';
        });
        $('#discount_table > tbody').append(html);
    }

    /* Manejo del arbol */
    call_api('/api/items/get_categories', 'post', {"store_id": store_id}, function(cats) {
        cats = jQuery.parseJSON(cats.toString());

        if (cats !== null)
        {

            doTreeItem('#jstree_categories_items', ["wholerow", "types", "checkbox", "sort"], cats.data);

            // Selecciona categorias del item
            call_api('/api/items/get_item_categories', 'post', {"store_id": store_id, "item_id": item_id}, function(result) {
                result = jQuery.parseJSON(result.toString());
                if (result !== null) {
                    if (result.data.length > 0) {
                        $.each(result.data, function(i, val) {

                            // Verifica que la categoria pertenezca a una de las categorias de la tienda
                            if (categories_stores.lastIndexOf(val.id) !== -1)
                            {
                                /*
                                 * Selecciona siempre y cuando no tenga hijos, ya que si es padre automáticamente
                                 * selecciona todos sus hijos correspondiente
                                 */
                                if ($("#jstree_categories_items").jstree("is_parent", "#" + val.id) == 0)
                                {
                                    // Selecciona la categoria en el arbol
                                    $("#jstree_categories_items").jstree("select_node", "#" + val.id);
                                }
                                items_categoriesOld.push(val.id);
                            }
                        });
                    }
                }
                else
                    ShowMessage('alert', 'No se pudieron cargar las categorias del item');
            });
        }
        else
            ShowMessage('alert', 'No se pudieron cargar las categorias de la tienda');
    });
    /* END Manejo del arbol */

    delay(function() {
        call_api('/api/items/get_item_details', 'post', {store_id: store_id, item_id: item_id}, function(resp) {
            resp = jQuery.parseJSON(resp);
            var alt = '';
            var id = '';

            if (resp !== null) {

                // Carga de datos
                /* Items Settings */
                $('#item_name').val(resp.data.name);
                $('#description').val(resp.data.description);
                $('#item_name_eng').val(resp.data.name_eng);
                $('#description_eng').val(resp.data.description_eng);
                if (resp.data.description_eng)
                    tinymce.get('description_eng').setContent(resp.data.description_eng);
                if (resp.data.description)
                    tinymce.get('description').setContent(resp.data.description);

                $('#price').val(resp.data.precio.MXN);
                $('#priceUSD').val(resp.data.precio.USD);

                if (parseInt(resp.data.new_item) == 1) {
                    $("#new_item").prop("checked", true);
                } else {
                    $("#new_item").prop("checked", false)
                }



                if (resp.data.get_xRates != false)
                    xRate = resp.data.get_xRates;

                // Live
                if (resp.data.live == '1') {
                    $('#toggle-button').bootstrapSwitch('toggleState');
                    $('#live_text').html(lang_txt.stores_itempage_onair_text);
                }
                else {
                    $('#live_text').html(lang_txt.stores_itempage_offair_text);
                }
                if (resp.data.physical == '0') {
                    physical = false;
                }

                /* END Items Settings */

                /* Inventories */
                $('#sku').val(resp.data.sku);
                $('#units_availible').val(resp.data.units_availible);
                if (resp.data.managed_inv == true) { // Inventario administrado por Kichink!
                    manager_k = true;
                    $('#manager_inventories,#settings_opts_check_1, #new_options_item, #settings_opts_panel_2').remove();
                    $('#units_availible_read').val(resp.data.units_availible);
                    $('#item_without_options').show();
                }
                else if (resp.data.managed_inv == false) {
                    $('#inventories_kichink_units').remove();
                }

                if (resp.data.inventories == "1")
                    $('#inventories_num').attr('checked', 'checked');
                else {
                    // 1 sola unidad en inventario
                    $('#inventories_unique').attr('checked', 'checked');
                    $('#units_availible').attr('disabled', 'disabled');
                }

                if (typeof resp.data.opciones_compra.group_name != 'undefined') { // exiten opciones de compra
                    $('#settings_opts_check_1').attr('checked', 'checked');
                    $('#purchase_options_init, #new_options_item').remove();
                    AddOptionPurchase(resp.data.opciones_compra);
                }
                else {
                    $('#option_item').remove();
                    $('#new_options_item').hide();
                    $('#purchase_options_title').remove();
                }

                if (typeof resp.data.opciones_despliegue[0] != 'undefined') {
                    $('#settings_opts_check_2').attr('checked', 'checked');
                    AddOptionDisplay(resp.data.opciones_despliegue);
                }
                else {
                    $('#settings_opts_panel_2, #settings_opts_check_2').remove();
                    $('#item_without_options').show();
                }

                /* END Inventories */

                // Existen imagenes
                if (typeof resp.data.imagenes[0] != 'undefined' && resp.data.imagenes.length > 0) {

                    // Carga las imagenes
                    $.each(resp.data.imagenes, function(indice, data) {
                        if (indice == 0) {
                            $('.slide, #nav').html('');
                            $('#nav-slider').show();
                        }

                        alt = (indice + 1) + '-' + data.object_name;
                        id = data.id + '&amp;' + 'items&amp;' + data.object_name;
                        if (data.extension == 'jpeg')
                            data.extension = 'jpg';

                        // Carga las imagenes
                        $('.slide').append('<img class="img-responsive ' + data.extension + '" src="' + data.bordered + '" alt="' + alt + '" id="' + id + '" />');
                        thumbnailsImages.push({img: data.thumbnail, id: data.id});
                    });

                    $('.slide').cycle({
                        fx: 'fade',
                        speed: 'fast',
                        timeout: 0,
                        pager: '#nav-slider',
                        after: onAfter,
                        pagerAnchorBuilder: createPageImage,
                    });

                    if (thumbnailsImages.length > 1)
                    {
                        // Tooltips para imagenes, hasta que estén cargadas todas x)
                        var idInterval = setInterval(function() {
                            if ($('#nav-slider > li').length == thumbnailsImages.length) {
                                $('#nav-slider > li').tooltip();
                                clearInterval(idInterval);
                            }
                        }, 100);

                        // Ordena las imagenes
                        $("#nav-slider").sortable({
                            //distance: 5,
                            update: function() {
                                var neworder = Array();
                                $('#nav-slider li').each(function() {
                                    var id = $(this).attr('id');
                                    if (typeof id != 'undefined') {
                                        neworder.push(id);
                                    }
                                });

                                // Llamada a call_api
                                call_api('/api/items/update_images_order', 'post', {"store_id": store_id, "newOrder": neworder, "item_id": item_id}, function(resp) {
                                    resp = jQuery.parseJSON(resp);
                                    if (resp !== null) {
                                        var data = resp.data;
                                        if (data == false || data == "Error") {
                                            ShowMessage('alert', 'Ocurrio un problema al cambiar el orden, intente de nuevo');
                                            $("#nav-slider").sortable("cancel");
                                        }
                                    }
                                    else {
                                        ShowMessage('alert', 'Ocurrio un problema al cambiar el orden, intente de nuevo');
                                        $("#nav-slider").sortable("cancel");
                                    }
                                });
                            },
                            start: function(event, ui) {
                                $('#nav-slider > li').tooltip('hide');
                            }
                        });
                    }
                }
                else {
                    // Deshabilita botones
                    $('#editPicture, #deletePicture').hide();
                }
            }
            else
                ShowMessage('alert', 'No se pudieron cargar los datos del producto');
        });
    }, 4000);

    call_api('/api/items/get_shipping_options', 'post', {store_id: store_id, item_id: item_id}, function(resp) {
        resp = jQuery.parseJSON(resp);
        var data = resp.data;
        var html = '';
        if (resp !== null)
        {
            if (data !== false)
            {
                // Disponibilidad
                $('#' + data.disponibilidad.type).attr('checked', 'checked');
                if (data.disponibilidad.type == 'ava_days') {
                    $('input[name="ava_days"]').val(data.disponibilidad.value);
                }
                else if (data.disponibilidad.type == 'ava_date') {
                    $('input[name="ava_date"]').val(data.disponibilidad.value);
                }

                // Carga de tipos de envio
                $.each(data.shipment, function(i, val) {
                    html += '<div class="checkbox-label">';
                    html += '	<input class="form-control" type="radio" name="shipment_id" id="' + val.group_type + '" value="' + val.id + '"';

                    if (val.selected) {
                        html += ' checked="checked"'
                    }

                    html += ' />';
                    html += '	<label for="' + val.group_type + '" style="text-align:left">';
                    html += '		<strong>' + val.group_type + '</strong><small style="margin-left:0px;font-size:11px">(' + val.group_name + ')</small>';
                    html += '	</label>';
                    html += '</div>';
                });
                $('#shipping_types').html(html);
                if ($('input[name="shipment_id"]:checked').val() == '7' || $('input[name="shipment_id"]:checked').val() == '10') {
                    $('#shipment_locations_display').hide();
                    $('#shipment_locations_no_display').show();
                }

                // Carga de localidades para el envio
                html = '';
                if (typeof data.shipment_locations != 'undefined') {
                    $.each(data.shipment_locations, function(i, val) {
                        if (val.enabled == '1') {
                            $('#' + val.shipment_location_name).attr('checked', 'checked');
                        }

                    });
                }
            }
        }
        else
            ShowMessage('alert', 'No se pudieron cargar los datos de envio');
    });

    call_api('/api/items/get_discounts', 'post', {item_id: item_id}, function(resp) {
        resp = jQuery.parseJSON(resp);
        var html = '';
        if (resp !== null) {
            var data = resp.data;

            // Existen descuentos
            if (typeof data[0] != 'undefined') {
                $('#item_discounts_without').hide();
                AddDiscountsTable(data);
            }
            else
                $('#discounts_display').hide();
        }
        else
            ShowMessage('alert', 'No se pudieron cargar los datos de descuentos');
    });

    /*
     * Attach events
     */
    $(document).on('click', '#nav-slider > li', function(e) {
        $('#nav-slider > li').removeAttr('style');
        $(this).attr('style', 'border: 2px solid #542d65;');
    });

    $(document).on('blur', '.grupo_opt, .opcion_opt', function(event) {
        var error = false;
        var groupName = new RegExp(/^[a-zA-ZÁÉÍÓÚáéíóúñÑäëïöüÄËÏÖÜ\s]+$/);
        var opcionName = new RegExp(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑäëïöüÄËÏÖÜ\/\-\.\s]+$/);

        if ($(this).hasClass('grupo_opt')) {
            var field_value = $(this).val();
            if (!groupName.test(field_value) || field_value.length < 1 || field_value.length > 20) {
                error = true;
                $(this).css('border', '1px solid #A22F40');
            } else {
                $(this).css('border', '1px solid #80B437');
            }
        }
        else if ($(this).hasClass('opcion_opt')) {
            var found = {};
            $('.opcion_opt').each(function() {
                var field_value = $(this).val();
                if (!opcionName.test(field_value) || field_value.length < 1 || field_value in found || field_value.length > 20) {
                    error = true;
                    $(this).css('border', '1px solid #A22F40');
                } else {
                    found[field_value] = true;
                    $(this).css('border', '1px solid #80B437');
                }
            });
        }
        else if ($(this).hasClass('select_opt')) {
            var field_value = $(this).val();
            if (field_value !== 'select') {
                error = true;
                $(this).css('border', '1px solid #A22F40');
            } else {
                $(this).css('border', '1px solid #80B437');
            }
        }

        return error;
    });

    $(document).on('click', '.btn-delete-discount', function(e) {
        var id_delete = $(this).attr('id');
        var btn = $(this);
        call_api('/api/items/delete_discount', 'post', {discount_id: id_delete}, function(resp) {
            resp = jQuery.parseJSON(resp);
            var data = resp.data;
            var html = '';
            if (resp !== null) {
                if (data)
                    ShowMessage('success', 'Descuento eliminado correctamente', function() {
                        // Se debe eliminar la tr seleccionada
                        btn.parent().parent().remove();
                        if ($('#discount_table').find('tr').length == 0) {
                            $('#discounts_display').hide();
                            $('#item_discounts_without').show();
                        }
                    });
                else
                    ShowMessage('alert', 'No se puedo realizar la acción, intente de nuevo.');
            }
            else
                ShowMessage('alert', 'No se puedo realizar la acción, intente de nuevo.');
        });
        e.preventDefault();
    });

    // ON/OFF item
    $('#toggle-button').on('switch-change', function() {
        var status = $('#toggle-button').bootstrapSwitch('state');

        if (status)
            $('#live_text').html(lang_txt.stores_itempage_onair_text);
        else
            $('#live_text').html(lang_txt.stores_itempage_offair_text);

        //$('#toggle-button').bootstrapSwitch('toggleState');
    });

    $(document).on('click', '.remove-option', function(e) {
        $(this).parent().parent().remove();
    })

    $('#boton_append_1').click(function() {
        var id = Math.floor((Math.random() * 100) + 1);
        var element = ''

        element += '<div class="input-group">';
        element += '	<div class="title">Opción</div>';
        element += '	<input type="text" class="opcion_opt form-control">';
        element += '	<a href="javascript:void(0);">';
        element += '		<span data-toggle="tooltip" data-placement="bottom" data-original-title="Eliminar" class="glyphicon glyphicon-trash remove-option" style="position: absolute;top: 10px;right: -14px;color: initial;"></span>';
        element += '	</a>';
        element += '</div>';

        $('#options-items').append(element);
        $('.remove-option').tooltip();
    });

    $('#save_purchase_opts').on('click', function() {
        save_purchase_opts();
    });

    // Des/Seleccion de categorias
    $('#jstree_categories_items').on('changed.jstree', function(_event, _data) {
        switch (_data.action) {
            case 'deselect_node':
                items_categories = new Array();
                for (var inx in _data.selected) {
                    if (!isNaN(parseInt(_data.selected[inx])))
                        items_categories.push(_data.selected[inx]);
                }
                break;
            case 'select_node':
                items_categories = new Array();
                for (var inx in _data.selected) {
                    if (!isNaN(parseInt(_data.selected[inx])))
                        items_categories.push(_data.selected[inx]);
                }
                break;
        }

    });

    $('body').scrollspy({target: '#item-submenu', offset: 400});
    $('#item-submenu').on('activate.bs.scrollspy', function() {
        var nid = ($(this).find("li.active a").attr("href"));
        var v = window.location.pathname.split("/");
        formatter = "/" + v[1] + "/" + v[2] + "/" + v[3] + "/";
        var s = nid.replace("#", "");
        window.history.replaceState({}, '', formatter + s);
    });

    $('#editPicture').bind('click', function() {
        var id = $(this).data('id');
        var src = $(this).data('src');

        featherEditor.launch({
            image: id,
            url: src,
            postData: id,
            cropPresets: ['900x400']
        });
        return false;
    });

    $('#price').on('change', function() {
        convertionPrice();
    });
    $('#priceUSD').on('change', function() {
        convertionPriceUSD();
    });
    $('#pictureModalButton').on('click', function() {
        $('#progressbar').css('display', 'block');
    });
    $('input[name="inventories"]').change(function(e) {
        console.log($(this).val());
        if ($(this).val() == 'inventories_unique') {
            $('#units_availible').val('1');
            $('#units_availible').attr('disabled', 'disabled');
        }
        else {
            $('#units_availible').val('0');
            $('#units_availible').removeAttr('disabled');
        }
    });
    $(document).on('change', 'input[name="shipment_id"]', function(e) {
        if ($(this).val() == '7' || $(this).val() == '10') {
            $('#shipment_locations_display').hide();
            $('#shipment_locations_no_display').show();
        }
        else {
            $('#shipment_locations_no_display').hide();
            $('#shipment_locations_display').show();
        }
    });

    /* Buttons */

    // Update inventario
    $('#update_inventario').on('click', function() {
        var units_gral = 0;
        var units_items = 0;
        var callApi = true;

        $('#units_availible').css('border', '');
        $('#settings_opts_panel_1 > #option_item input').css('border', '');

        // Verifica cantidad de inventarios
        if ($('#purchase_options_title').length > 0 && !manager_k) {
            $.each($('#settings_opts_panel_1 > #option_item input'), function(i, val) {
                if ($(val).val() != 0 && $(val).val() > 0)
                    units_items += Number($(val).val());
            });

            if ($('input[name="inventories"]:checked').val() == 'inventories_unique')
                units_gral = 1;
            else
                units_gral = (manager_k) ? $('#units_availible_read').val() : $('#units_availible').val();

            if (units_gral != units_items) {
                // Error
                callApi = false;
                ShowMessage('alert', 'Sus valores en opciones deben coincidir con la cantidad de unidades disponible en su inventario', function() {
                    $('#units_availible').css('border', '1px solid #A22F40');
                    $('#settings_opts_panel_1 > #option_item input').css('border', '1px solid #A22F40');
                });
            }
        }

        if (callApi) {
            var post = $('#inventario_form').serializeArray();
            post.push({'name': 'store_id', 'value': store_id});
            post.push({'name': 'item_id', 'value': item_id});

            // Llamada al api para actualizar
            call_api('/api/items/update_item_inventories', 'post', post, function(resp) {
                resp = $.parseJSON(resp);
                if (resp !== null) {
                    ShowMessage('alert', 'Se actualizaron los inventarios.');
                }
                else
                    ShowMessage('alert', 'Error al actualizar sus datos, intente de nuevo.');

            });
        }


    });

    // Update envio
    $('#update_pos').on('click', function() {
        var input_post = new Array();

        $('input[name="availible_item"]').parent().css('border', '');
        $('#shipping_types,#shipment_locations_display').css('border', '');
        //console.log(typeof $('input[name="shipment_id"]:checked').val());

        // Restricciones
        if ($('input[name="availible_item"]:checked').val() == undefined) {
            ShowMessage('alert', 'Se debe seleccionar la disponibilidad del envio', function() {
                $('input[name="availible_item"]').parent().css('border', '1px solid #A22F40');
            });
        }
        else if (typeof $('input[name="shipment_id"]:checked').val() == 'undefined') {
            ShowMessage('alert', 'Se debe seleccionar al menos una opción', function() {
                $('#shipping_types').css('border', '1px solid #A22F40');
            });
        }
        else if (typeof $('input[name="location_id[]"]:checked').val() == 'undefined') {
            ShowMessage('alert', 'Se debe seleccionar al menos una opción', function() {
                $('#shipment_locations_display').css('border', '1px solid #A22F40');
            });
        }
        else {
            // Llamada al call_api
            input_post = $('#envio_form').serializeArray();
            input_post.push({name: 'item_id', value: item_id});
            input_post.push({name: 'store_id', value: store_id});

            call_api('/api/items/update_item_shipmentOptions', 'post', input_post, function(resp) {
                resp = jQuery.parseJSON(resp);
                var html = '';
                if (resp !== null) {
                    var data = resp.data;
                    location.reload();
                }
                else
                    ShowMessage('alert', 'Ocurrio un problema al actualizar');
            });
        }
    });

    // Update descuentos
    $('#update_discounts').on('click', function() {

        var post = new Array();
        $('#discount_amount,#discount_start').css('border', '');

        // Restricciones
        if ($('#discount_amount').val() == '') {
            ShowMessage('alert', 'Se debe seleccionar la cantidad del porcentaje', function() {
                $('#discount_amount').css('border', '1px solid #A22F40');
            });
        }
        else if ($('#discount_start').val() == '') {
            ShowMessage('alert', 'Se debe seleccionar la fecha de inicio del descuento', function() {
                $('#discount_start').css('border', '1px solid #A22F40');
            });
        }
        else {

            post = $('#descuentos_form').serializeArray();
            post.push({name: 'item_id', value: item_id});
            post.push({name: 'store_id', value: store_id});

            for (var n in post) {
                if (post[n].name == "coupon_code") {
                    if ((post[n].value !== "") && (post[n].value.length <= 3)) {
                        ShowMessage('alert', 'El codigo de cupon es muy corto.');
                        return;
                    }
                }
            }


            // Llamada al call_api
            call_api('/api/items/add_discount', 'post', post, function(resp) {
                resp = jQuery.parseJSON(resp);
                var data = new Array();

                if (resp !== null) {
                    data[0] = resp.data;
                    if (typeof data[0].id != 'undefined') {
                        $('#item_discounts_without').hide();
                        $('#discounts_display').show();
                        AddDiscountsTable(data);
                    }
                }
                else
                    ShowMessage('alert', 'Error al actualizar sus datos, intente de nuevo.');
            });
        }
    });


    $('#guardar-todo').click(function() {

        var post = $('#articulo_form').serializeArray();
        $.each(post, function(index, val) {
            // tinymce editor
            if (val.name == 'description')
                val.value = tinymce.get('description').getContent();
            if (val.name == 'description_eng')
                val.value = tinymce.get('description_eng').getContent();
        });
        post.push({'name': 'store_id', 'value': store_id});
        post.push({'name': 'item_id', 'value': item_id});
        post.push({'name': 'live', 'value': $('#toggle-button').bootstrapSwitch('state')});

        // Llamada al api para actualizar
        call_api('/api/items/update_item_details', 'post', post, function(resp) {

            $('#update_categorias').click();
            $("#update_inventario").click();


        });

        var input_post = new Array();

        $('input[name="availible_item"]').parent().css('border', '');
        $('#shipping_types,#shipment_locations_display').css('border', '');
        //console.log(typeof $('input[name="shipment_id"]:checked').val());

        // Restricciones
        if (($('input[name="availible_item"]:checked').val() !== undefined) && (typeof $('input[name="shipment_id"]:checked').val() == 'undefined') && (typeof $('input[name="location_id[]"]:checked').val() == 'undefined')) {
            // Llamada al call_api
            input_post = $('#envio_form').serializeArray();
            input_post.push({name: 'item_id', value: item_id});
            input_post.push({name: 'store_id', value: store_id});

            call_api('/api/items/update_item_shipmentOptions', 'post', input_post, function(resp) {
            });
        }

        var post = new Array();
        $('#discount_amount,#discount_start').css('border', '');

        // Restricciones
        if (($('#discount_amount').val() != '') && ($('#discount_start').val() != '')) {

            post = $('#descuentos_form').serializeArray();
            post.push({name: 'item_id', value: item_id});
            post.push({name: 'store_id', value: store_id});

            // Llamada al call_api
            call_api('/api/items/add_discount', 'post', post, function(resp) {

            });
        }



    });

    // Update categorias
    $('#update_categorias').on('click', function() {
        var post = new Array();
        var diff = new Array();
        post.push({'name': 'store_id', 'value': store_id});
        post.push({'name': 'json', 'value': ''});
        $('#jstree_categories_items .jstree-checkbox').css('border', '');

        // Elimina categorias del item
        diff = $.grep(items_categoriesOld, function(x) {
            return $.inArray(x, items_categories) < 0
        })

        if (diff.length > 0) {
            post[1].value = '[';
            $.each(diff, function(i, val) {
                if (i !== 0)
                    post[1].value += ',';
                post[1].value += '{"id":' + item_id + ',"cat_id":' + val + '}';
            });
            post[1].value += ']';

            // Llamada al call_api
            call_api('/api/items/remove_item_from_category', 'post', post, function(resp) {
                resp = jQuery.parseJSON(resp);
                var html = '';
                if (resp !== null) {
                    if (resp) {
                        items_categoriesOld = new Array();
                        post[1].value = '[';
                        $.each(items_categories, function(i, val) {
                            if (i !== 0)
                                post[1].value += ',';
                            post[1].value += '{"id":' + item_id + ',"cat_id":' + val + '}';
                            items_categoriesOld.push(val);
                        });
                        post[1].value += ']';

                        // Llamada al call_api
                        call_api('/api/items/add_item_to_category', 'post', post, function(resp) {
                            resp = jQuery.parseJSON(resp);
                            var html = '';
                            if (resp !== null) {
                                if (resp)
                                    ShowMessage('success', 'Se asignaron las catgorias correctamente');
                                else
                                    ShowMessage('alert', 'Ocurrio un problema al actualizar');
                            }
                            else
                                ShowMessage('alert', 'Ocurrio un problema al actualizar');
                        });
                    }
                    else
                        ShowMessage('alert', 'Ocurrio un problema al actualizar');
                }
                else
                    ShowMessage('alert', 'Ocurrio un problema al actualizar');
            });
        }
        else {

            if (items_categories.length > 0) {
                // Se asignan categorias
                items_categoriesOld = new Array();
                post[1].value = '[';
                $.each(items_categories, function(i, val) {
                    if (i !== 0)
                        post[1].value += ',';
                    post[1].value += '{"id":' + item_id + ',"cat_id":' + val + '}';
                    items_categoriesOld.push(val);
                });
                post[1].value += ']';
                // Llamada al call_api
                call_api('/api/items/add_item_to_category', 'post', post, function(resp) {
                    resp = jQuery.parseJSON(resp);
                    var html = '';
                    if (resp !== null) {
                        if (resp)
                            ShowMessage('success', 'Se asignaron las catgorias correctamente');
                        else
                            ShowMessage('alert', 'Ocurrio un problema al actualizar');
                    }
                    else
                        ShowMessage('alert', 'Ocurrio un problema al actualizar');
                });
            }
        }
    });

    // Update details
    $('#update_articulos').on('click', function() {
        var post = $('#articulo_form').serializeArray();
        $.each(post, function(index, val) {
            // tinymce editor
            if (val.name == 'description')
                val.value = tinymce.get('description').getContent();
            if (val.name == 'description_eng')
                val.value = tinymce.get('description_eng').getContent();
        });
        post.push({'name': 'store_id', 'value': store_id});
        post.push({'name': 'item_id', 'value': item_id});
        post.push({'name': 'live', 'value': $('#toggle-button').bootstrapSwitch('state')});
        post.push({'name': 'new_item', 'value': $('#new_item').prop('checked') ? 1 : 0});

        // Llamada al api para actualizar
        call_api('/api/items/update_item_details', 'post', post, function(resp) {
            resp = jQuery.parseJSON(resp);
            var html = '';
            if (resp !== null) {
                //var data = resp.data;
                location.reload();
            }
            else
                ShowMessage('alert', 'Ocurrio un problema al actualizar');
        });

    });

    $("#settings ul").find("li a").each(function(i, e) {
        $(e).click(function(event) {
            event.stopPropagation();

            var catTopPosition = $($(this).attr("href")).offset().top - 155;
            if (catTopPosition < 25)
                catTopPosition = 0;

            jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow');
        });
    });
    /* END Buttons */
});
