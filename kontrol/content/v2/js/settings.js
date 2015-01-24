/*
 * V2 Sell.Kichink
 * Settings
 */
var featherEditor = new Aviary.Feather({
    apiKey: '6282e2a3c',
    apiVersion: 2,
    language: 'en',
    tools: ['crop', 'resize', 'enhance', 'effects', 'stickers', 'orientation', 'brightness', 'contrast', 'saturation', 'sharpness', 'draw', 'text', 'redeye', 'whiten', 'blemish'],
    //initTool : 'crop',
    onSave: function(id, newURL) {
        $("#" + id).attr("src", newURL);
        },
    postUrl: window.location.origin + '/mediaAv/saveAviary'

});

$(document).ready(function() {
    var to = false;


    updateOrderTable();

    $("#senmycolours").click(function() {
        call_api('/api/stores/update_design/', 'post', {last_inventory: ($("#last_inventory").is(":checked"))?1:0, store_id: store_id, text_color: $("#itemsPrice_text").val(), font_color: $("#itemsPrice_back").val()}, function(data) {
            data = jQuery.parseJSON(data.toString());
            $("#preloader").data().Preloader.methods.hide();
        }, null, function() {
            $("#preloader").data().Preloader.methods.draw([{issue: kontrol_lang['settings_paleta_colores']}]);
            $("#preloader").data().Preloader.methods.show();
        }
        );



    })

    $(".color-picker").each(function() {

        $(this).minicolors({
            control: 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: false,
            letterCase: 'uppercase',
            position: 'bottom left',
            change: function(hex, opacity) {
                if (!hex)
                    return;
                if (opacity)
                    hex += ', ' + opacity;
                try {
                    if ($(this).attr('data-target') === "font") {
                        $(".items-price").css("color", hex);
                        $(".btn.btn-default.my").css("color", hex);
                    } else {
                        $(".items-price").css("background", hex);
                        $(".btn.btn-default.my").css("background", hex);
                    }
                } catch (e) {
                }
            },
            theme: 'bootstrap'
        });

    });

    $(".btn-add-foto").each(function() {
        var img = $(this).data().img;
        var data = $(this).data();
        $(this).pekeUpload({
            url: '/media/save2',
            allowedExtensions: "jpeg|jpg|png|gif",
            btnText: 'Agregar nueva foto',
            data: JSON.stringify({"submit": "1", table: data.table, role: data.role, tableID: store_id}),
            maxSize: 2,
            field: "image",
            multi: true,
            showFilename: false,
            showPercent: false,
            showErrorAlerts: false,
            beforeSend: function() {
                $("#preloader").data().Preloader.methods.draw([{issue: kontrol_lang['settings_nueva_imagen']}, {issue: kontrol_lang['settings_asigna_imagen']}]);
                $("#preloader").data().Preloader.methods.show(30000);
            },
            onFileSuccess: function(file, data) {
                if (data.success !== undefined) {
                    $(img).attr("src", data.success);

                } else {
                    alert(data.error);
                }
                $("#preloader").data().Preloader.methods.hide(800);

            },
            onFileError: function(file, error) {
                console.log("error on file: " + file.name + " error: " + error + "");
            }
        });
    });


    $('#demo_q').keyup(function() {
        if (to) {
            clearTimeout(to);
        }
        to = setTimeout(function() {
            var v = $('#demo_q').val();
            $('#jstree_demo').jstree(true).search(v);
        }, 250);
    });

    $("#addRol").submit(function(e) {

        var ids = new Array();
        $.each($("#my-users").data().DinamicTable.methods.getSelectedContent(), function(i, val) {
            ids.push(val.id);
        });
        if (ids.length > 0) {
            call_api('/api/users/add_user_perm/', 'post', {"store_id": store_id, "id": ids, "level": $('#rol').val()}, function(result) {
                result = jQuery.parseJSON(result.toString());
                if (result !== null)
                {
                    var data = result.data;
                    if (data) {
                        window.location.reload();
                    }
                    else
                        alert(kontrol_lang['settings_problema']);
                }
                else
                    alert(kontrol_lang['settings_problema']);
            });
        }


        e.preventDefault();
    });
    $("#addUser").submit(function(e) {
        call_api('/api/users/add_user_admin/', 'post', {"store_id": store_id, "email": $("#addUser").find("input[name=emailAdmin]").val()}, function(result) {
            result = jQuery.parseJSON(result.toString());
            if (result !== null)
            {
                var data = result.data;
                if (data) {
                    window.location.reload();
                }
                else
                    alert(kontrol_lang['settings_problema']);
            }
            else
                alert(kontrol_lang['settings_problema']);
        });
        e.preventDefault();

    });

    $("#addCategories").on("submit", function() {
        var ref = $('#jstree_demo').jstree(true),
                sel = ref.get_selected();
        if (!sel.length) {
            var sid = (ref._model.data["#"].children[0]);
            ref.select_node(ref._model.data[sid]);
            sel = ref.get_selected();
        }

        ref.deselect_all();
        call_api("/api/items/add_category", 'post', {store_id: store_id, parent_id: ($("#" + sel).data().id) ? $("#" + sel).data().id : 0, name: $("#addCategories").find("input[type=text]").val(), order: 1}, function(data) {
            data = jQuery.parseJSON(data.toString());
            var ref = $('#jstree_demo').jstree(true);
            ref.deselect_all();

            var sel2 = ref.create_node(sel[0], {"data":data.data,"id":data.data.id, "text": $("#addCategories").find("input[type=text]").val(), "type": "default"});            
            if (sel2) {
                ref.open_node(sel2);
                ref.select_node(sel2);
                $(sel2).data(data.data);
            }           
            
            $("#addCategories").find("input[type=text]").val('');

        });
        return false;
    });

    $("#settings-menu").find("li a").each(function(i, e) {
        $(e).click(function() {
            v = window.location.pathname.split("/");
            formatter = "/" + v[1] + "/" + v[2] + "/" + v[3] + "/";
            if (!$(e).parent().hasClass("disabled")) {
                var s = $(e).attr("href").replace("#", "");
                window.history.replaceState({}, '', formatter + s);
            }
        });
    });

    // Details
    $('#submit_details').click(function(event) {
        if ($("#step1_details").data().validationK.methods.validate()) {
            var inputs = $('#details_store').serializeArray();
            inputs.push({'name': 'store_id', 'value': store_id});
            inputs.push({'name': 'seccion', 'value': 'info'});

            if ($("input[name='facturacion']:checked").length == 0)
                inputs.push({'name': 'facturacion', 'value': '0'});
            if ($("input[name='inventories']:checked").length == 0)
                inputs.push({'name': 'inventories', 'value': '0'});
            if ($("input[name='physical']:checked").length == 0)
                inputs.push({'name': 'physical', 'value': '0'});

            call_api('/api/stores/update_store_settings/', 'post', $.param(inputs), function(data) {
                data = jQuery.parseJSON(data.toString());
                $(".allstores .currname").html($("#step1_details").find("#name").val());
                $("#preloader").data().Preloader.methods.hide();
            }, null, function() {
                $("#preloader").data().Preloader.methods.draw([{issue: kontrol_lang['settings_updating_details']}]);
                $("#preloader").data().Preloader.methods.show();
            }
            );
        }
        event.preventDefault();
    });

    $("#my-addr").DinamicTable({
        header: {
            contacto: "nombre",
            "estado_nombre": "estado",
            "pais_nombre": "pais"
        },
        tableClass: "table table-responsive",
        numered: true, //Si va numerada
        selectable: false, //Si lleva checkboxes o no
        actions: [//Tpdas las acciones que quiero agregar
            {
                label: "Borrar",
                icon: "glyphicon-trash",
                onClick: function(obj) {
                }
            }]
    });

    $("#my-users").DinamicTable({
        tableClass: "table table-bordered table-responsive",
        numered: false, //Si va numerada
        selectable: true, //Si lleva checkboxes o no
        onDrawn: function(e) {
            $("#my-users").find("tr").each(function(i, e) {
                if ($(e).data().data != undefined) {
                    if ($(e).data().data.id == user_id) {
                        $(e).find("input[type='checkbox']").remove();
                        $(e).find(".actions button").remove();
                        $(e).find(".col-name").append(" (you)");
                        $(e).find(".col-name").css("fontWeight", "bold");
                        $(e).css("backgroundColor", "#ededed");

                    }
                }
            });
        },
        actions: [//Tpdas las acciones que quiero agregar
            {
                label: "Borrar",
                icon: "glyphicon-trash",
                onClick: function(obj) {
                    call_api('/api/users/delete_user_admin', 'post', {'store_id': store_id, 'id': obj.data.id}, function(result) {
                        $("#preloader").data().Preloader.methods.hide();
                        result = jQuery.parseJSON(result.toString());
                        if (result !== null) {
                            var data = result.data;
                            if (data)
                                $(obj.container).remove();
                            else
                                alert(kontrol_lang['settings_problema']);
                        }
                        else
                            alert(kontrol_lang['settings_problema']);

                    }, null, function() {
                        $("#preloader").data().Preloader.methods.draw([{issue: "Se está eliminando el usuario"}]);
                        $("#preloader").data().Preloader.methods.show();

                    });
                }
            }]
    });

    $("#step1_payments").submit(function() {
        if ($("#step1_payments").data().validationK.methods.validate()) {
            call_api('/api/stores/update_store_settings', 'post', $(this).serialize() + "&seccion=payments&store_id=" + store_id, function(data) {
                data = jQuery.parseJSON(data.toString());
                $("#preloader").data().Preloader.methods.hide();
            }, null, function() {
                $("#preloader").data().Preloader.methods.draw([{issue: kontrol_lang['settings_updating_bankdata']}]);
                $("#preloader").data().Preloader.methods.show();
            });
        }
        return false;
    });

    // Address
    $('#submit_pos').click(function(event) {
        var inputs = $('#step1_pos').serializeArray();
        inputs.push({'name': 'store_id', 'value': store_id});
        inputs.push({'name': 'seccion', 'value': 'add_address'});

        call_api('/api/stores/update_store_settings/', 'post', $.param(inputs), function(data) {
            data = jQuery.parseJSON(data.toString());
            if ($("#step1_pos").data().validationK.methods.validate()) {
                $("#preloader").data().Preloader.methods.hide();
                get_datos_recoleccion();
            }
        }, null, function() {
            $("#preloader").data().Preloader.methods.setText("" + kontrol_lang['layout_changes_will_be_made'] + "");
            $("#preloader").data().Preloader.methods.show();
        });
        event.preventDefault();
    });

    // Carga la información de la tienda
    call_api('/api/stores/get_store_info', 'post', {'store_id': store_id}, function(data) {
        data = jQuery.parseJSON(data.toString());
        $.each(data.data, function(campo, value) {

            if (campo == 'name')
                $('#' + campo).val(value);
            else if (campo == 'facturacion') {
                if (value == '1')
                    $('#' + campo).attr('checked', 'checked');
            }
            else if (campo == 'inventories') {
                if (value == '1')
                    $('#' + campo).attr('checked', 'checked');
            }
            else if (campo == 'physical') {
                if (value == '1')
                    $('#' + campo).attr('checked', 'checked');
            }
            else
                $('#' + campo).html(value);
        });

    }, null, function() {
        $("#preloader").data().Preloader.methods.setText(kontrol_lang['settings_loading']);
        $("#preloader").data().Preloader.methods.draw([]);
        $("#preloader").data().Preloader.methods.show(7000);
    });

    call_api('/api/items/get_categories', 'post', {"store_id": store_id}, function(cats) {
        cats = jQuery.parseJSON(cats.toString());
        if (addSubCat($("#jstree_demo #cats"), cats.data)) {
            doTree('#jstree_demo', ["ui", "wholerow", "types", "dnd"], function(data) {
                updateCategory(data);
            }, false);
        }
    });

    call_api('/api/stores/get_store_data_payment', 'post', {"store_id": store_id}, function(data) {
        data = jQuery.parseJSON(data.toString());
        if (data.data.titular)
            $("#step1_payments").find("#bank_account_titular").val(data.data.titular);
        if (data.data.account)
            $("#step1_payments").find("#bank_account").val(data.data.account);
        if (data.data.id)
            $("#step1_payments").find("#bank_id").val(data.data.id);
    });

    function get_datos_recoleccion() {
        call_api('/api/stores/get_datos_tienda_recoleccion', 'post', {"store_id": store_id}, function(data) {
            obj = jQuery.parseJSON(data.toString());
            var visible = ["contacto", "email", "telefono", "calle", "numero", "interior", "cp", "colonia", "ciudad", "estado_nombre", "pais_nombre"];
            if (obj.data.length > 0) {
                $("#my-addr").data().DinamicTable.methods.setContent(obj.data);
                $("#my-addr").data().DinamicTable.methods.setVisibleFields(visible);
                $("#my-addr").data().DinamicTable.methods.drawTable();
                updateOrderTable();
            }
        });
    }

    get_datos_recoleccion();

    call_api('/api/stores/get_store_users', 'post', {"store_id": store_id}, function(data) {
        obj = jQuery.parseJSON(data.toString());
        var visible = ["name", "email", "telefono", "items", "settings", "orders", "payments", "emails"];
        if (obj.data.length > 0) {

            $.each(obj.data, function(i, val) {
                if (val.access == null) {
                    obj.data[i].items = '';
                    obj.data[i].settings = '';
                    obj.data[i].orders = '';
                    obj.data[i].payments = '';
                    obj.data[i].emails = '';
                }
                else {
                    switch (val.access) {
                        case '1,1,1':
                            obj.data[i].items = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].settings = '';
                            obj.data[i].orders = '';
                            obj.data[i].payments = '';
                            obj.data[i].emails = '';
                            break;
                        case '2,2,2':
                            obj.data[i].items = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].settings = '';
                            obj.data[i].orders = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].payments = '';
                            obj.data[i].emails = '';
                            break;
                        case '3,3,3':
                            obj.data[i].items = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].settings = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].orders = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].payments = '';
                            obj.data[i].emails = '<span class="glyphicon glyphicon-ok"></span>';
                            break;
                        case '4,4,4':
                            obj.data[i].items = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].settings = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].orders = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].payments = '<span class="glyphicon glyphicon-ok"></span>';
                            obj.data[i].emails = '<span class="glyphicon glyphicon-ok"></span>';
                            break;
                        default:
                            obj.data[i].items = '';
                            obj.data[i].settings = '';
                            obj.data[i].orders = '';
                            obj.data[i].payments = '';
                            obj.data[i].emails = '';
                            break;
                    }
                }
            });

            $("#my-users").data().DinamicTable.methods.setContent(obj.data);
            $("#my-users").data().DinamicTable.methods.setVisibleFields(visible);
            $("#my-users").data().DinamicTable.methods.drawTable();

        }
    });

    $("#btn-edit-foto").click(function() {
        //var id=$("#mylogo").attr("id");
        var src = $("#mylogo").attr("src");
        var post = $("#mylogo").data().image[0].media_id + "&" + $("#mylogo").data().image[0].role + "&" + $("#mylogo").data().image[0].object_name;
        featherEditor.launch({
            image: "mylogo",
            url: src,
            postData: post,
            cropPresets: ['160x160']
        });

    });

    $("#btn-edit-items").click(function() {

        // var id=$("#imageCover img").attr("id");
        var src = $("#imageCover img").attr("src");
        var post = $("#imageCover img").data().image[0].media_id + "&" + $("#imageCover img").data().image[0].role + "&" + $("#imageCover img").data().image[0].object_name;
        featherEditor.launch({
            image: "mycover",
            url: src,
            postData: post,
            cropPresets: ['980x250']
        });

    });


    $("#step1_pos").validationK();
    $("#step1_details").validationK();
    $("#step1_payments").validationK();
});

function demo_create() {
    var ref = $('#jstree_demo').jstree(true),
            sel = ref.get_selected();
    if (!sel.length) {
        return false;
    }
    sel = sel[0];
    sel = ref.create_node(sel, {"type": "default"});
    if (sel) {
        ref.edit(sel);
    }
}

function demo_rename() {
    var ref = $('#jstree_demo').jstree(true),
            sel = ref.get_selected();
    if (!sel.length) {
        return false;
    }
    //sel = sel[0];

    if (!$("#" + sel[0]).hasClass("jstree-disabled")) {
        ref.edit(sel);
    }
}

function demo_delete() {
    var ref = $('#jstree_demo').jstree(true), sel = ref.get_selected();
    if (!sel.length) {
        return false;
    }
    if (!$("#" + sel[0]).hasClass("jstree-disabled")) {
        console.log($("#" + sel[0]).data());
        call_api('/api/items/delete_category', 'post', {store_id: store_id, cat_id: $("#" + sel[0]).data().id}, function() {
        });

        ref.delete_node(sel);
    }

}

function updateOrderTable() {

    if ($("#my-addr table").find("tbody tr[class!=noaddr]").length > 0)
        $(".noaddr").hide();
    else
        $(".noaddr").show();
    $("#my-addr table").find("tbody tr[class!=noaddr]").each(function(i, e) {
        $(this).find("td:first-child").html(i + 1);
    });

    $("#my-addr table").find(".borrar").unbind("click");
    $("#my-addr table").find(".borrar").click(function() {
        var tr = $(this);
        
        if(tr.closest('tbody').find('tr').length > 1)
        {
            call_api('/api/stores/remove_store_address/', 'post', {"store_id": store_id, "address_id": $(this).closest("tr").data().data.id}, function(result) {
                result = $.parseJSON(result);
                if(result !== null)
                {
                    if(result.data == true){
                        updateOrderTable();
                        tr.closest("tr").fadeOut("slow");
                        tr.closest("tr").remove();
                    }
                }
            });
        }
        else{
            alert('Debe existir al menos una dirección de recolección');
        }
    });
}

function updateCategory(data) {
    console.log(data);
    var parent_id = ($("#" + data.node.parent).data().id != undefined) ? $("#" + data.node.parent).data().id : 0;
    if((parent_id==data.node.data.id) ||(data.node.parent=="j1_1"))
        parent_id=0;
    var obj = {
        "store_id": store_id,
        "cat_id": data.node.data.id,
        "name": data.node.text,
        "order": data.position,
        "parent_id": parent_id
    };
    call_api('/api/items/edit_category', 'post', obj, function() {

    });
}
