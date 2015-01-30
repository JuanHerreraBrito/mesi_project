(function($) {

    $.fn.validationK = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('validationK'))
                return;
            // pass options to plugin constructor
            var myplugin = new validationK(this, options);
            // Store plugin object in this element's data
            element.data('validationK', myplugin);
            element.data().validationK.methods.init();
        });
    };
    var validationK = function(target, options) {
        var componentObj = {
            instantly: false,
            methods: {
                init: function() {
                    $(target).find("input[type=text],input[type=password]").each(function(i, e) {
                        $(e).popover({
                            trigger: "manual",
                            title: "Error",
                            container: target,
                            placement: "top"
                        });
                        $(e).on("focus", function() {
                            $(e).popover("hide");
                            $(e).removeClass("error");
                        });
                        $(e).on('hidden.bs.popover', function() {

                        })
                        $(e).on('shown.bs.popover', function() {
                            $(target).find("input[type=text],input[type=password]").each(function(j, f) {
                                if (i != j) {
                                    $(f).popover("hide");
                                    $(f).removeClass("error");
                                }
                            });
                        })
                    });
                },
                validate: function() {

                    valid = true;
                    $(target).find("input[type=text],input[type=password]").each(function(i, e) {
                        if ($(e).hasClass("myown-validation")) {
                            return true;
                        }
                        if ($(e).hasClass("text-validation")) {
                            if (!isText($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("email-validation")) {
                            if (!isEmail($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("phone-validation")) {
                            if (!isPhone($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("clabe-validation")) {
                            if (!isClabe($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("numericonly-validation")) {
                            if (!isNumeric($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("numericorempty-validation")) {
                            if ($(e).val() != "") {
                                if (!isNumeric($(e).val())) {
                                    valid = false;
                                }
                            }
                        }
                        if ($(e).hasClass("cvv-validation")) {
                            if (!isCVV($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("cvvuser-validation")) {
                            if (!isCVVuser($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("address-validation")) {
                            if (!isAddress($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("expirymonth-validation")) {
                            if (!cc_expiryMonth($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("expiryyear-validation")) {
                            if (!cc_expiryYear($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("password-validation")) {
                            if (!isPassword($(e).val())) {
                                valid = false;
                            }
                        }
                        if ($(e).hasClass("samepassword-validation")) {
                            if ($(e).val() == "") {
                                valid = false;
                            }
                            if ($(e).val()!=$(".samepassword2-validation").val()) {
                                valid = false;
                            }

                        }
                        if (!valid) {
                            $(e).popover("show");
                            $(e).addClass("error");
                            return valid;
                        }

                    });
                    return valid;
                    //Validaciones
                    function isEmail(email) {
                        var patternMail = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
                        if (!patternMail.test(email)) {
                            return false;
                        }
                        return true;
                    }

                    function isText(name) {
                        var patternName = new RegExp(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/);
                        if (!patternName.test(name)) {
                            return false;
                        }
                        return true;
                    }
                    function isPhone(phone) {
                        var patternPhone = new RegExp(/^[0-9-ext()+ ]+$/);
                        if (!patternPhone.test(phone) || phone.length < 10) {
                            return false
                        }
                        return true;
                    }
                    function isClabe(clabe) {
                        var patternPhone = new RegExp(/^[0-9-ext()+ ]+$/);
                        if (!patternPhone.test(clabe) || clabe.length != 18) {
                            return false
                        }
                        return true;
                    }
                    function isNumeric(n) {
                        return !isNaN(parseFloat(n)) && isFinite(n);
                    }
                    function isPassword(password){
                         var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{10,}$/;
                         return re.test(password);
                    }
                    function isAddress(addr) {
                        var patternAddress = new RegExp(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\-().,# ]+$/);
                        if (!patternAddress.test(addr)) {
                            return false
                        }
                        return true;
                    }
                    function isCVV(cvv) {
                        var patternCVV = new RegExp(/^[0-9]+$/);
                        if (!patternCVV.test(cvv) || cvv.length < 3 || cvv.length > 4) {
                            return false;
                        }
                        return true;
                    }
                    function isCVVuser(cvv) {
                        var patternCVV = new RegExp(/^[A-Z0-9-]+$/);
                        if (!patternCVV.test(cvv) || cvv.length < 3 || cvv.length > 4) {
                            return false;
                        }
                        return true;
                    }
                    function cc_expiryMonth(d) {
                        if ((d > 12) || (d <= 0)) {
                            return false;
                        }
                        return true;
                    }
                    function cc_expiryYear(d) {
                        if (d != "") {
                            if (d < new Date().getFullYear() - 2000) {
                                return false;
                            }
                        }
                        else
                            return false;

                        return true;
                    }
                }
            }
        }

        return componentObj;
    };
})(jQuery);

