var avalibleTimes = new Array();
var hour = 9;
var minutes1 = '00';
var minutes2 = "30";

function generateHours () {
	for (var i = 0 - 1; i < 10; i++) {
		if (i%2 == 0) {
			avalibleTimes[i] = hour+':'+minutes1;
		}else{
			avalibleTimes[i] = hour+':'+minutes2;
		}
	}
}

function hideTimes () {
	$('.invisible').css('visibility','hidden');
}

function getSelectedDay(id){
	return $("#"+id).value();
}

function postAvalibleTimes (argument) {
	$.post("http://sell3.kichink.nb9.mx/api/cop/getCitas", {'selct_day' : getSelectedDay},
		function(data){
			$.each(data.items, function(i,item){
				console.log("value: "+item.value)
			});
		}, "json"
	);
}

