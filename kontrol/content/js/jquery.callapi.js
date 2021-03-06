/**
* callapi.js
* Version 1.2
* 2014-01-21
**/
function call_api(url, method, vars, callback, keep) {
	keep = keep || false;
	$.ajax({
		type: method,
		url: url,
		data: vars
	}).done(function( data ) {
		var result = jQuery.parseJSON(data);
		if(result){
			if(!result.status || result.status != 'OK'){
				if(!keep){
					console.log('Request failed (1)');
					location.reload();
				}else{
					var response = [];
					response = {data:"Requested failed (2)",keep:keep};
					callback(JSON.stringify(response));
	  			}
			} else {
			  var response = [];
			  response = result;
			  response.keep = keep;
			  callback(JSON.stringify(response));
			}
		}
	}).fail(function(jqXHR, textStatus) {
		if(!keep) {
		  console.log('Request failed (3)');
		  //location.reload();
		}else{
		  var response = [];
		  response = {data:"Requested failed (4)",keep:keep};
		  callback(JSON.stringify(response));
		}
	});
}