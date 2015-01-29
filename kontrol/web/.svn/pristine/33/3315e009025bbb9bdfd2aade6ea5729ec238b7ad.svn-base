$(document).ready(function() {
        $("#my-account").validationK();
        delay(function() {
            if ($(".signin-card .content .alert").is(":visible"))
                $(".signin-card .content .alert").fadeOut(1000);
        }, 4000);
        $("#my-account").on('click', function(event) {
            var is_ok = $(this).data().validationK.methods.validate();
            if (is_ok) {
                call_api('/api/users/update_user_data', 'post', {"password": $(this).find("input[name=password]").val(), "store_id":store_id, "current_password": $(this).find("input[name=current_password]").val()}, function(data) {
                     data = jQuery.parseJSON(data.toString());

                     var msg = 'La contrase&ntilde;a se ha actualizado correctamente';
                     var class_alert = 'alert-success';
                     if(typeof data.data['3rrC'] != 'undefined'){
                        msg = data.data['3rr'];
                        class_alert = 'alert-danger';
                     }

                    $(".alert").remove();
                    $(".signin-card .content").prepend('<div class="alert '+class_alert+' alert-dismissable" style="display:none">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                            '<b>Message:</b> ' + msg +
                            '</div>');
                    $(".signin-card .content .alert").fadeIn("slow");
                    delay(function() {
                        if ($(".signin-card .content .alert").is(":visible")){
                            $(".signin-card .content .alert").fadeOut(1000);

                            if(typeof data.data['3rrC'] == 'undefined'){
                                delay(function() {
                                        window.location.reload();
                                    },4000);
                            }
                        }
                    }, 4000);
                    $("input[type=password]").val("");

                });
            }
        });

});
