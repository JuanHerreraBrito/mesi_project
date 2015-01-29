/**
 * callapi.js
 * Version 1.2
 * 2014-01-28
 **/
function call_api(url, method, vars, callback, keep, b4,name) {
    keep = keep || false;
    name= (name==undefined)?"sell":name;
    $.ajaxq(name,{
        type: method,
        url: url,
        beforeSend: function() {
            if (b4 != undefined)
                b4();
        },
        data: vars
    }).done(function(data) {
        if (data) {
            var result = jQuery.parseJSON(data);
            if (!result.status || result.status != 'OK') {
                if (!keep) {

                    err('Request failed (1)');
                    location.reload();
                } else {
                    var response = [];
                    response = {data: "Requested failed (2)", keep: keep};
                    callback(JSON.stringify(response));
                }
            } else {
                if(result['3rr']==undefined){
                    var response = [];
                    response = result;
                    response.keep = keep;
                    callback(JSON.stringify(response));
                }else{
                    err(result['3rr']);
                    location.reload();
                }
            }
        }
    }).fail(function(jqXHR, textStatus) {
        if (!keep) {
            err(textStatus);
            location.reload();
        } else {
            var response = [];
            response = {data: "Requested failed (4)", keep: keep};
            callback(JSON.stringify(response));
        }
    });
}
function err(e) {
    if ($("#preloader").length) {
        $("#preloader").hide();
        $("#preloader").data().Preloader.methods.setText("Ups! Ha ocurrido un error. <br/>Por favor intenta esta operaci&oacute;n m&aacute;s tarde.");
        $("#preloader").data().Preloader.methods.draw([{issue:e}], "error");
        $("#preloader").data().Preloader.methods.show();
    }
    else
        alert(e);
}