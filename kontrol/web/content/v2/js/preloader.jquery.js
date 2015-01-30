/* 
 * Preloader V1.0
 * Al dia 17 de enero 2014
 */

(function($) {

    $.fn.Preloader = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('Preloader'))
                return;
            // pass options to plugin constructor
            var myplugin = new Preloader(this, options);
            // Store plugin object in this element's data
            element.data('Preloader', myplugin);
            element.data().Preloader.methods.init();
        });
    };
    var Preloader = function(target, options) {
        var componentObj = {
            text: "Loading...",
            methods: {
                init: function() {
                    
                    if (options.text != undefined){
                        componentObj.text = options.text;
                    }
                    componentObj.methods.draw({});

                },
                setText: function(t){
                    componentObj.text=t;
                },
                draw: function(li,type) {
                    var div = document.createElement("div");
                    $(div).addClass("container");
                    
                    var bar = document.createElement("div");
                    var img = document.createElement("div");
                    if(type!="error")
                        $(img).attr("id", "preloader_4");
                    
                    $(img).html((type=="error")?"<img scr='/img/dialog-error.png'/>":"<span></span><span></span><span></span><span></span><span></span>");
                    $(bar).addClass("wrapper");
                    $(bar).append(img);
                    $(div).append(bar);
                    var h2 = document.createElement("h2");
                    $(h2).html(componentObj.text);
                    $(div).append(h2);
                    var ul = document.createElement("ul");
                    for(var i in li){
                        if (li[i].issue != undefined) {
                            $(ul).append("<li>" + li[i].issue + "</li>");
                        }
                    }
                    $(div).append(ul);
                    $(target).html(div);
                    /*if (type=="error")
                        window.location.reload();*/
                },
                show: function(time) {
                    $("body").addClass("stop-scrolling");
                    time=(time==undefined)?5000:time;
                    $(target).fadeIn(1000);
                    var delay = (function() {
                        var timer = 0;
                        return function(callback, ms) {
                            clearTimeout(timer);
                            timer = setTimeout(callback, ms);
                        };
                    })();

                    delay(function() {
                        if($(target).is(":visible"))
                            $(target).fadeOut(1000);
                            $("body").removeClass("stop-scrolling");
                    }, time);
                },
                hide: function(time) {
                    time=(time==undefined)?3000:time;
                    var delay = (function() {
                        var timer = 0;
                        return function(callback, ms) {
                            clearTimeout(timer);
                            timer = setTimeout(callback, ms);
                        };
                    })();

                    delay(function() {
                        $(target).fadeOut(1000);
                        $("body").removeClass("stop-scrolling");
                    }, time);

                }

            }
        };
        return componentObj;
    };
})(jQuery);