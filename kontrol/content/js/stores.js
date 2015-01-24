$(document).ready(function() {
    $('.allstores input').width($('.allstores').width() - 60);

    $('.allstores').on('show.bs.dropdown', function() {
        $(".search").animate({width: '100%'}, 200, function() {
            $(".search").find("input[type=text]").focus();
        });
    });

    $('.allstores').on('hide.bs.dropdown', function() {
        $(".search").animate({width: 0}, 200);
    });

    $('.allstores input').click(function(e) {
        e.stopPropagation();
    });

    $("#solicitar-deposito-btn").click(function() {
        $("#modal-pagos").modal("show");
    });

    $(".viewtoggle").find("button").each(function(i, e) {
        $(e).click(function() {
            if (!$(e).hasClass("active")) {
                $(".viewtoggle").find("button").removeClass("active");
                $(e).addClass("active");
                if ($(e).data().setToggle == "itemList") {
                    $(".itemBox").addClass("itemList");
                    $(".itemList").removeClass("itemBox");
                } else {
                    $(".itemList").addClass("itemBox");
                    $(".itemBox").removeClass("itemList");
                }
            }
        });
    });

    $("#sortable_items").sortable({
        update: function() {
            var neworder = Array();
            $('#sortable_items .itemBox').each(function() {
                var id = $(this).attr('id');
                neworder.push(id);
            });
            call_api('/api/stores/update_items_order', 'post', {store_id: store_id, neworder: neworder}, function(data) {
            });
        }
    });

    call_api('/api/stores/get_user_stores', 'post', {}, function(data) {
        var ajax_result = jQuery.parseJSON(data.toString());
        $("#my-stores").append('<li role="presentation" class="dropdown-header">Mis tiendas</li>');
        try {
            var stores = ajax_result.data;
            if (stores != undefined) {
                if (stores.length > 0) {
                    for (var i = 0; i < stores.length && i < 10; i++) {
                        var item = stores[i];
                        $("#my-stores").append('<li><a href="/stores/id/' + item.id + '">' + item.name + '</a></li>');
                    }
                    $("#my-stores").append('<li role="presentation" class="divider"></li>');
                    $("#my-stores").append('<li role="presentation" class="dropdown-header"><button type="button" href="/stores" class="btn btn-primary pull-right">Add Store</button></li>');
                }
            }
        } catch (e) {
            console.log(e);
        }
    });

    call_api('/api/stores/get_store_items', 'post', {"store_id": store_id, "category": "all"}, function(data) {
        var ajax_result = jQuery.parseJSON(data.toString());

        try {

            var storeItems = ajax_result.data;
            if (storeItems != undefined) {

                if (storeItems.length > 0) {

                    //Llenar grid de items
                    var rowItems = '';
                    for (var i = 0; i < storeItems.length; i++) {

                        var item = storeItems[i];
                        rowItems += '<li class="itemBox" id="' + item.id + '">';
                        rowItems += "<input type='checkbox'/>"
                        if (item.thumb != "none" && item.thumb != "" && item.thumb != undefined) {
                            rowItems += '<div style="background-image:url(' + item.thumb + ')" class="img"></div><a href="/items/id/' + item.id + '"><p>' + item.name + '</p></a>';
                        }
                        else {
                            rowItems += '<div style="background-image:url(http://placehold.it/160x160)" class="img"></div><a href="/items/id/' + item.id + '"><p>' + item.name + '</p></a>';
                        }

                        rowItems += '<span class="live"><input class="switch-small" type="checkbox" ' + (item.live ? "checked" : "") + ' data-text-label="LIVE" data-on="primary" data-off="danger"/></span>';
                        rowItems += '<span class="price">$' + item.price + '</span>';
                        rowItems += '</li>';
                    }

                    $("#sortable_items").prepend(rowItems);

                    $("#sortable_items").find("input[type=checkbox]").each(function(i, e) {
                        $(e).click(function() {
                            $(this).parent().toggleClass("checked");

                        });
                    });

                    $('.live input[type="checkbox"]').bootstrapSwitch();

                }
            }
        } catch (e) {
            console.log(e);
        }
        //alert('aqui: ' + data);

    });

    call_api('/api/stores/get_store_details', 'post', {"store_id": store_id}, function(data) {
        var ajax_request = jQuery.parseJSON(data.toString());
        var response = ajax_request.data;
        $("#menu-store .allstores span.currname").html(response.name);
        $("#menu-store a.items").find(".badge").html(response.items_count);
        $("#menu-store a.orders").find(".badge").html(response.orders_count);
        var ep = response.estado_publicacion;
        if (ep.status == "offline") {
            var percentage = 0;
            var step=0;
            var message = "", html = "";
            if (ep.motivo_offline.header) {
                percentage += 20;
                step++;
            } else {
                message = (message != "") ? message : "Header image is required";
            }
            if (ep.motivo_offline.logo) {
                percentage += 20;
                step++;
            } else {
                message = (message != "") ? message : "Logo image is required";
            }
            if (ep.motivo_offline.item) {
                percentage += 20;
                step++;
            } else {
                message = (message != "") ? message : "Your store does not have any items";
            }
            if (ep.motivo_offline.pickup_data) {
                percentage += 20;
                step++;
            } else {
                message = (message != "") ? message : "Pickup data is empty";
            }
            if (ep.motivo_offline.bank_data) {
                percentage += 20;
                step++;
            } else {
                message = (message != "") ? message : "You must provide your bank account information";
            }

            if (percentage < 100) {
                html = '<li id="incomplete-profile" data-toggle="tooltip" data-placement="bottom" data-title="' + message + '">' +
                        '<a href="#">' +
                        '<span class="glyphicon glyphicon-exclamation-sign"></span>&nbsp;' +
                        '<span class="tip">'+ step+' / 5'+ ' ' + message + '</span>' +
                        '<div class="progress">' +
                        '<div class="progress-bar" role="progressbar" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percentage + '%;background-color: #3dc5f5;">' +
                        '<span class="sr-only">' + percentage + '% Complete</span>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>';

            } else {
                html = '<li><a href="' + response.liga_preview + '" target="_blank" >Preview Store</a></li>';
                html += '<li><a class="publish" href="#" target="_blank" >Request for publishing</a></li>';
            }
        } else {
            html = '<li><a href="' + response.liga_preview + '" target="_blank" >Preview Store</a></li>';
            html += '<li id="install-store" class="dropdown">' +
                    '<a class="dropdown-toggle publish" data-toggle="dropdown" href="#">Install</a>' +
                    '<ul class="dropdown-menu">' +
                    '<li>' +
                    '<a href="#" onclick="javascript:add_to_fb_page();">' +
                    '<span class="glyphicon fa fa-facebook fa-2"></span>&nbsp;Install in Facebook' +
                    '</a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#" data-toggle="modal" data-target="#websiteModal">' +
                    '<span class="glyphicon glyphicon-globe"></span>&nbsp;Install in website' +
                    '</a>' +
                    '</li>' +
                    '</ul>' +
                    '</li>';
        }

        $("#menu-store-status").html(html);
        $("#incomplete-profile").tooltip();

        if (response.logo != "" && response.logo != undefined)
            $("#fotoTienda").attr("src", response.logo);
        else
            $("#fotoTienda").attr("src", "http://placehold.it/160x160");

        if (response.sales > 0) {
            set_sales(response.sales);
            set_views(response.pageviews);
            $("#stats #sales").html(response.sales);
            $("#stats #pageviews").html(response.pageviews);
        }
    });

    //var cats = {"status": "OK", "function": "items\/get_categories", "response_time": "0.0189", "result_count": 10, "data": [{"id": "3617", "name": "Peliculas y Series", "subcats": []}, {"id": "3625", "name": "Dos", "subcats": [{"id": "3626", "name": "Tres", "subcats": []}, {"id": "3628", "name": "Cinco", "subcats": [{"id": "3623", "name": "Cases", "subcats": []}, {"id": "3622", "name": "Portraits", "subcats": []}]}, {"id": "3627", "name": "Cuatro", "subcats": []}]}, {"id": "3624", "name": "Una", "subcats": []}, {"id": "3621", "name": "Peluches", "subcats": []}, {"id": "3620", "name": "Juegos", "subcats": []}, {"id": "3619", "name": "Discos", "subcats": []}, {"id": "3618", "name": "Dinero", "subcats": []}, {"id": "3616", "name": "Playeras", "subcats": []}, {"id": "1268", "name": "Figuras eva", "subcats": []}, {"id": "1269", "name": "Figuras kitty", "subcats": []}], "header_col_names": [{"name": "id", "label": "Id", "order": 1}, {"name": "name", "label": "Name", "order": 2}, {"name": "subcats", "label": "Subcats", "order": 3}]};
    call_api('/api/items/get_categories', 'post', {"store_id": store_id}, function(cats) {
        cats = jQuery.parseJSON(cats.toString());
        addSubCat($("#jstree_categories #maincats"), cats.data, doTree($("#jstree_categories")));
    });


    $("#addCategories").on("submit", function() {

        $.ajax({
            url: "/stores/addCategory/" + store_id,
            type: "post",
            data: $(this).serialize(),
            beforeSend: function() {

                var ref = $('#jstree_demo').jstree(true),
                        sel = ref.get_selected();

                if (!sel.length) {
                    var sid = (ref._model.data["#"].children[0]);
                    ref.select_node(ref._model.data[sid]);
                    sel = ref.get_selected();
                    //return false;
                }

                // sel = sel[0];

                sel2 = ref.create_node(sel[0], {"text": $("#addCategories").find("input[type=text]").val(), "type": "default"});
                if (sel2) {
                    ref.open_node(sel);
                    ref.select_node(sel);
                }

                $("#addCategories").find("input[type=text]").val('');

            },
            success: function(data) {

            }
        });
        return false;
    });
    /*
     function set_btn_actions() {
     $("ul#category_list").find("li").each(function(i, e) {
     $(e).find(".optionsCat").find(".remove").click(function() {
     $.post("/stores/deleteCategory/", {cat_id: $(e).data().idCategory});
     $(e).slideUp("fast", function() {
     $(e).remove();
     });
     });
     $(e).find(".optionsCat").find(".edit").click(function() {
     $(e).find(".optionsCat").find("a").toggle();
     v = document.createElement("input");
     $(v).attr("type", "text");
     $(v).val($(e).find(".titleCat").text());
     $(e).find(".titleCat").html(v);
     //$.post("/stores/deleteCategory/<?= $store->id ?>");
     });
     
     $(e).find(".optionsCat").find(".ok").click(function() {
     cat = $(e).find(".titleCat input").val();
     if (cat != "" && ($("ul#category_list").find("li[data-category=" + cat + "]").length <= 1)) {
     $(e).find(".titleCat").html(cat);
     $(e).attr("data-category", cat);
     $(e).data("category", cat);
     $.post("/stores/updateCategory/", {cat_id: $(e).data().idCategory, name: cat});
     }
     $(e).find(".titleCat input").remove();
     $(e).find(".optionsCat").find("a").toggle();
     
     });
     
     });
     $("ul#category_list").sortable({
     update: function() {
     var neworder = Array();
     
     $('#category_list .category').each(function() {
     var id = $(this).data().idCategory;
     neworder.push(id);
     });
     $.post("/stores/updateCategoriesOrder/<?= $store->id ?>", {neworderCats: neworder}, function(data) {
     });
     }
     });
     $("#delete_category").click(function() {
     var ref = $('#jstree_demo').jstree(true), sel = ref.get_selected();
     if (!sel.length) {
     
     }
     if (ref.get_node(sel).parent != "#") {
     for (e = 0; e < sel.length; e++) {
     $.post("/stores/deleteCategory/", {cat_id: $("#" + sel[e]).data().idCategory});
     }
     ref.delete_node(sel);
     }
     });
     
     }*/




    $("#checkall").click(function() {
        if ($(this).hasClass("btn-success")) {
            $("#sortable_items").find("input[type=checkbox]").prop("checked", true);
            $(this).removeClass("btn-success");
            $(this).addClass("btn-danger");
            $(this).html('<span class="glyphicon glyphicon-unchecked"></span>&nbsp;');
            $(this).append($(this).data().uncheckedText);
        } else {
            $("#sortable_items").find("input[type=checkbox]").prop("checked", false);
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-success");
            $(this).html('<span class="glyphicon glyphicon-check"></span>&nbsp;');
            $(this).append($(this).data().checkedText);
        }
    });

    $("#btn-add-categories").click(function() {
        $(".floatcategories").fadeIn("fast");
    });

    $(".floatcategories").on("mouseleave", function() {
        $(".floatcategories").fadeOut("fast");
    });

});



function set_views(endVal) {
    var inc = 1;
    if (!endVal)
        endVal = 0;
    var currentVal = 0;

    if (endVal > 300)
        inc = endVal / 300;


    var i = setInterval(function()
    {
        if (currentVal >= endVal)
        {
            clearInterval(i);
            $("#stats #views").text(Math.round(endVal));
        }
        else
        {
            currentVal += inc;
            $("#stats #views").text(Math.round(currentVal));
        }
    }, 1);
}

function set_sales(endVal) {
    var inc = 1;
    var prefix = '$';
    var currentVal = 0;
    if (endVal > 300)
        inc = endVal / 300;

    var i = setInterval(function()
    {
        if (currentVal >= endVal)
        {
            clearInterval(i);
            $("#stats #sales").text(prefix + number_format(endVal, 2, '.', ','));
        }
        else
        {
            currentVal += inc;
            $("#stats #sales").text(prefix + number_format(currentVal, 2, '.', ','));
        }
    }, 1);
}

// Add to FB
window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId: '689942954354946', // App ID from the app dashboard
        channelUrl: '//sell.kichink.com/utils/fb_channel_file', // Channel file for x-domain comms
        status: true, // Check Facebook Login status
        xfbml: true                                  // Look for social plugins on the page
    });

    // Additional initialization code such as adding Event Listeners goes here
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var pages = [];
function add_to_fb_page() {
    FB.ui(
            {
                method: 'pagetab'
            },
    function(response) {
        if (response != null && response.tabs_added != null) {

            $.each(response.tabs_added, function(pageid) {
                save_fb_page_id(pageid);
            });
        }
    }
    );
}
function save_fb_page_id(page_id) {
    call_api('/api/stores/associate_fb_page_id', 'post', {store_id: store_id, page_id: page_id}, function(data) {
        alert('Se ha instalado tu tienda en tu pagina de facebook con exito');
    });
}

function addSubCat(container, arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (obj != undefined) {
            var li = $(document.createElement("li"));
            li.attr("data-id", obj.id);
            li.html(obj.name);
            if (obj.subcats.length > 0) {
                var ul = $(document.createElement("ul"));
                li.addClass("jstree-open");
                li.append(addSubCat(ul, obj.subcats));
            }
            container.append(li);
        }
    }
    if (callback != undefined)
        callback();
    return container;
}


function doTree(tree) {

    tree.jstree({
        "xml_data": {
            "ajax": {
                cache: false
            }
        },
        "core": {
            "animation": 0,
            "check_callback": true,
            "themes": {"dots": true, "stripes": true},
        },
        "ui" : { select_multiple_modifier : false},
        "types": {
            "#": {"max_children": 1, "max_depth": 6, "valid_children": ["root"]},
            "root": {"icon": "glyphicon glyphicon-tags", "valid_children": ["default"], "max_depth": 5},
            "default": {"icon": "glyphicon glyphicon-tag", "valid_children": ["default", "file"]}
        },
        "plugins": ["wholerow", "state", "types", "checkbox"]
    });

}

function manageCategory() {
    $("#modal-categories").modal("show");
}