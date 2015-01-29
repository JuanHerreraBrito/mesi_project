/* 
 * V2 Sell.Kichink
 * Apps
 */


$(document).ready(function() {
    var icons_apps={
        'estadisticas':'fa-bar-chart-o',
        'b2b':'fa-suitcase',
        'boletos':'fa-ticket',
        'inventarios':'fa-truck',
        'editor-de-plantillas':'fa-bug',
        'phoenix':'fa-file-text',
        'pink-martini':'fa-file-text'
    }
    call_api('/api/stores/get_store_apps', 'post', {"store_id": store_id}, function(data) {
                obj = jQuery.parseJSON(data.toString());
                console.log(obj);
                if(obj.data.installed!=undefined){
                    for (var i in obj.data.installed){
                        var div=document.createElement("div");
                        $(div).addClass("app");
                        $(div).attr("data-id",obj.data.installed[i].app_id);
                        $(div).addClass("installed");
                        var span=document.createElement("span");
                        $(span).addClass("fa");
                        $(span).addClass(icons_apps[convertToSlug(obj.data.installed[i].app_name)]);
                        $(div).append(span);
                        var title=document.createElement("div");
                        $(title).html(obj.data.installed[i].app_name);
                        $(title).addClass("title");
                        $(div).append(title);
                        var desc=document.createElement("div");
                        $(desc).html(obj.data.installed[i].app_description);
                        $(desc).addClass("desc");
                        $(div).append(desc);
                        var button=document.createElement("a");
                        $(button).addClass("btn");
                        $(button).addClass("btn-default");
                        $(button).attr("href",obj.data.installed[i].app_url+store_id);
                        $(button).html(kontrol_lang["payments_view_detail"]);
                        $(div).append(button);
                        $(".appset#installed").append(div);
                    }
                }else{
                    $("#installed").find(".empty").show();
                }
                    
    });


$(".btn-buy").each(function(i, e) {
        $(e).click(function() {
            if ($(this).hasClass("btn-info")) {
                $(this).removeClass("btn-info");
                $(this).addClass("btn-success");
                $(this).animate({width:120});
                $(this).html("Are you Sure?");
            } else {
                
                $("#preloader").data().Preloader.methods.draw({issue: "Se instalará una aplicación"});
                $("#preloader").data().Preloader.methods.show();
                
                
                $(this).html("Installed");
                $(this).removeClass("btn-success");
                $(this).removeClass("btn-buy");
                $(this).addClass("disabled");
                $(this).addClass("btn-default");
                var d = $(this).closest(".app").clone();
                $(this).closest(".app").remove();
                $(".appset#installed").append(d);
                $("#preloader").data().Preloader.methods.hide();


            }
        });
    });
});