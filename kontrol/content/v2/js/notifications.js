/* 
 * V2 Sell.Kichink
 * Payment Details
 */
$(document).ready(function() {
    call_api('/api/notifications/get_notifications', 'post', {"store_id": store_id}, function(data) {
        var obj = jQuery.parseJSON(data.toString());
        for (i in obj.data) {
            var type = "";
            switch (obj.data[i].type) {
                case "important":
                    {
                        type = "fa-warning";
                        break;
                    }
                case "simple":
                    {
                        type = "fa-bell-o";
                        break;
                    }
                default:
                    {
                        type = "fa-link";
                        break;
                    }
            }


            var o = document.createElement("div");
            $(o).addClass("panel");
            $(o).addClass("panel-default");
            $(o).addClass(obj.data[i].read ? "read" : "unread");
            $(o).attr("data-url", obj.data[i].url);
            $(o).attr("data-id", obj.data[i].id);
            $(o).attr("data-title", obj.data[i].title);

            $(o).append(
                    '<div class="panel-heading">' +
                    '<a data-toggle="collapse" data-parent="#accordion-pagos" href="#collapse-' + i + '">' +
                    '<div class="panel-title">' +
                    '<b><i class="fa ' + type + '"></i></b>' +
                    '<i class="articulo">' + obj.data[i].title + '</i>' +
                    '<span>' + date_ago(obj.data[i].created) + '</span>' +
                    '</div>' +
                    '</a>');


            if (obj.data[i].message != "") {
                $(o).append('<div id="collapse-' + i + '" class="panel-collapse collapse">' +
                        '<div class="panel-body">' +
                        obj.data[i].message + "<br/>" +
                        '</div>' +
                        '</div>');

                if (obj.data[i].url) {
                    var a = document.createElement("a");
                    $(a).html(kontrol_lang['notificacions_ver_info']);
                    $(a).addClass("btn");
                    $(a).addClass("btn-default");
                    $(a).addClass("pull-right");

                    if (obj.data[i].type == "important") {
                        $(a).attr("href", "javascript:void(0);");
                        $(a).data("url",obj.data[i].url);
                        $(a).data("title",obj.data[i].title);
                        $(a).click(function() {
                            var u = $(this).data().url;
                            var v = getdatafromvideo(u);
                            if (v != undefined) {
                                if (v.videourl != "") {
                                    u = v.videourl + "?rel=0&autoplay=1";
                                }
                            }
                            $("#modal-notification").find(".modal-title").html($(this).data().title);
                            $("#modal-notification").find(".modal-body > iframe").attr("src", u);
                            $("#modal-notification").modal("show")
                        });
                    } else {
                        $(a).attr("href", obj.data[i].url);
                    }
                    $(o).find(".panel-body").append(a);
                }
            }


            $('#modal-notification').on('hidden.bs.modal', function (e) {
                $("#modal-notification").find(".modal-body > iframe").attr("src", "");
            });

            $(o).click(function() {
                if ($(this).hasClass("unread")) {
                    call_api('/api/notifications/notification_read', 'post', {"store_id": store_id, "notification_id": $(this).closest(".panel").data().id}, function() {
                        $(o).removeClass("unread");
                        $(o).addClass("read");
                        var n = parseInt($("#notif_total").html());
                        if(n>0)
                            n--;
                        $("#notif_total").html(n);

                    });
                }
            });

            $("#accordion-notifications").append(o);

        }


    });
});


