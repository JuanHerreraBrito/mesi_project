var evt = new Event(), m = new Magnifier(evt);

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$(document).ready(function() {

    delay(function() {
        $("#menu-settings").find("span[class!=caret2]").fadeOut("slow");
    }, 3000);

    var v = window.location.pathname.split("/");
    var stickyTop = $('#menu-shopping').offset().top + $('#menu-shopping').height(); // returns number 
    var behavior = false;
    var iframe = false;
    var unique_item = ($("#items .item").length > 1) ? false : true;
    if (window.self !== window.top) {
        behavior = "twitter";
        iframe = true;
    }

    if (iframe) {
        $(window).unbind('.infscr');
        $('a#next_content').click(function() {
            //$('#items-grid').infinitescroll('retrieve');
            $(document).trigger('retrieve.infscr');
            return false;
        });
    }

    if (!unique_item) {

        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) {
                $('.scrollup').fadeIn(500);
            } else {
                $('.scrollup').fadeOut(500);
            }
        });

        $('.scrollup').click(function() {
            $("html, body").animate({scrollTop: 0}, 600);
            return false;
        });

        $("#items").find("li.item").on("click", function(event) {
            event.stopPropagation();
            $("html, body").animate({scrollTop: $("#header").height()}, 600);
            load_item($(this).data(), true);
        });

        $("button.close").click(function() {
            v = window.location.pathname.split("/");
            window.history.replaceState({}, '', "/stores/" + v[3]);
            document.title = v[3];


            $("#item-container").animate({bottom: -1170}, 500, function() {
                $(this).hide();
                $("#categories").fadeIn(500);
                $("#items").fadeIn(500);
                if ($("#menu-shopping").width() < $(".container").width()) {
                    $("#menu-shopping").fadeIn(500);
                }
            });

        });
        if ($("#items").find(".item").length >= 12) {
            $('#items').infinitescroll({
                loading: {
                    finishedMsg: "<div id='loading-items-empty'>No tenemos m&aacute;s art&iacute;culos para desplegar</div>",
                    msgText: "<div id='loading-items'><div id='left-loading-items'>Cargando</div><div id='right-loading-items'>productos</div></div>",
                    img: "/img/kichink-loading-64.gif",
                    speed: 0
                },
                navSelector: "a#next_content:last",
                nextSelector: "a#next_content:last",
                itemSelector: "#items .item",
                behavior: behavior,
                debug: false
            });
            /*$("#items").fadeIn(1000);*/
        }
    } else {
        $("#categories").remove();
        $(".cover-bottom").remove();
        $("#item-detail button.close").remove();
        load_item({id: $($("#items").find(".item").get(0)).data().id}, false);
        $("#items").remove();
    }

    $(".search form input[type=text]").focus(function() {
        $(this).closest(".input-group").addClass("focus");
    });
    $(".search form input[type=text]").blur(function() {
        $(this).closest(".input-group").removeClass("focus");
    });

    $("#login.card").click(function(event) {
        event.stopPropagation();
    });

    if (v[1] == "buy") {
        load_item({id: v[2]}, true);
    }
    // if (!$("#header #menu-settings ul span").is(":visible"))
    $("#menu-settings").find("li").tooltip();

    function load_item(data, animated) {
        v = window.location.pathname.split("/");
        var time = 1000;

        $("#item-container").show();
        if (!animated) {
            time = 0;
        }
        else {
            $("#items").fadeOut("slow");
            $("#categories").fadeOut("slow");
            if ($("#menu-shopping").width() < $(".container").width())
                $("#menu-shopping").fadeOut();
            var store_name = (v[1] == "buy") ? v[3] : v[2];
            document.title = store_name + ": " + data.name;
            window.history.replaceState({}, '', "/buy/" + data.id + "/" + store_name + "/" + data.name);
        }

        $("#item-container").animate({bottom: 0}, time, function() {

            $('#thumbs').carouFredSel({
                responsive: true,
                auto: false,
                width: '95%',
                prev: '#prev',
                next: '#next',
                scroll: {
                    /*onBefore: function(data) {
                     data.items.old.eq(1).removeClass('selected');
                     data.items.visible.eq(1).addClass('selected');
                     }*/
                },
                items: {
                    width: 110,
                    visible: {
                        min: 2,
                        max: 5
                    }
                }
            });

            $('#thumbs').find("img").each(function(i, e) {
                $(e).click(function() {
                    $('#thumbs').find("img").removeClass("selected");
                    $(this).addClass("selected");
                    $("#preview").find("img").attr("src", $(this).attr("src"));
                });
            });

            m.attach({
                thumb: "#thumb",
                large: $("#thumb").attr("src"),
                mode: 'inside',
                zoom: 2,
                zoomable: false,
                largeWrapper: 'preview'
            });
        });
    }

    $(".checkout-btn").click(function() {
        $("#checkout").modal("show");
    });

    if ($("#menu-shopping").width() >= $(".container").width()) {
        $(window).scroll(function() {
            // scroll event  
            var windowTop = $(window).scrollTop(); // returns number
            if (stickyTop > windowTop) {
                if ($('#menu-shopping').hasClass("navbar-fixed-top")) {
                    //$('#menu-shopping .navbar-header').hide();
                    $('#menu-shopping').addClass("navbar-static-top");
                    $('#menu-shopping').removeClass("navbar-fixed-top");
                    $('#menu-shopping > .container').addClass("container-fluid");
                    $('#menu-shopping > .container').removeClass("container");
                }
            }
            else {
                if ($('#menu-shopping').hasClass("navbar-static-top")) {
                    $('#menu-shopping').removeClass("navbar-static-top");
                    $('#menu-shopping').addClass("navbar-fixed-top");
                    $('#menu-shopping > .container-fluid').addClass("container");
                    $('#menu-shopping > .container-fluid').removeClass("container-fluid");
                }
            }

        });


    }

var url="http://www.kichink.nb9.mx/api/stores/get_store_details"
    $.ajax({
        type: "POST",
        async: false,
        data: {
            store_id: 146,
            limit: 10,
            offset:0
        },
        url: url,
        success: function(data) {
            console.log(data);
        }
    });



});

