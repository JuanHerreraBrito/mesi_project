var ds_i_date = new Date();
ds_c_month = ds_i_date.getMonth() + 1;
ds_c_year = ds_i_date.getFullYear();

//The actual date.
var currrent_month, current_day, current_year;
var days_month;

// Get the element how jQuery object
function ds_getEl(id){
	return $("#"+id);
}

// Get hte left and the top of the element.
function ds_getleft(el){
	var tmp = el.offset();
	tmp = tmp.left;
	ell = tmp.top;
	while(ell){
		tmp += tmp.left;
		ell = tmp.offsetParent();
	}
	return tmp;
}
function ds_getTop(el){
	var tmp = el.offset();
	tmp = tmp.top;
	ell = tmp.offsetParent();
	while(ell){
		tmp += tmp.top;
		ell = tmp.offsetParent();
	}
	return tmp;
}

// Output element
var ds_oe = ds_getEl('ds_calclass');
// Container 
var ds_ce = ds_getEl('ds_conclass');

//Output Buffering
var ds_ob = null;
function ds_ob_clean () {
	ds_ob = null;
}

function ds_ob_flush () {
	ds_oe.html(ds_ob);
	ds_ob_clean();
}
function ds_echo (t) {
	ds_ob += t
}

var ds_element; //Text Element...

var ds_monthNames = [
'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembr'
]; // You can translate it for your language.

var ds_dayNames = [
'Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'
]; // You can translate it for your language.

// Calendar template
function ds_template_main_above (t) {
	return '<table cellpadding="3" cellspacing="1" class="ds_tbl">'
    	 + '<tr>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_py();"><<</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_pm();"><</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_hi();" colspan="3">[Close]</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_nm();">></td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_ny();">>></td>'
		 + '</tr>'
    	 + '<tr>'
		 + '<td colspan="7" class="ds_head">' + t + '</td>'
		 + '</tr>'
		 + '<tr>';
}

function ds_template_day_row(t){
	return '<tr class = "ds_subhead">'+t+'</td>';
}

function dstemplate_new_week () {
	return '</tr><tr>'
}

function ds_template_blank_cell (colspan) {
	return '<td colspan="'+colspan+'"></td>'
}

function ds_template_day (d, m, y) {
	return '<td class = "ds_cell" onclick="ds_onclick('+d+','+m+','+'y'+')">'+d+'</td>';
}

function ds_template_main_bellow(){
	return '</tr>'
		+ '</table>';
}

// This one draws the calendar
function ds_draw_calendar (m, y, d) {
	//First clean the output buffer.
	ds_ob_clean();
	//Here we go, do the header.
 	s_echo(ds_template_main_above(d + ' ' + ds_monthNames[m-1] + ' ' + y) );
 	for (var i = 0; i < 7; i++) {
 		//Put the days.
 		ds_echo(ds_template_day_row(ds_dayNames[i]));
 	}

 	// Make the date object.
 	var ds_dc_date = new Date();
 	ds_dc_date.setMonth(m - 1);
	ds_dc_date.setFullYear(y);
	ds_dc_date.setDate(1);
	if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		days = 31;
		days_month = days;
	} else if (m == 4 || m == 6 || m == 9 || m == 11) {
		days = 30;
		days_month = days;
	} else {
		days = (y % 4 == 0) ? 29 : 28;
		days_month = days;
	}
	var first_day = ds_dc_date.getDay();
	var first_loop = 1;
	// Start the first week
	ds_echo (ds_template_new_week());
	// If sunday is not the first day of the month, make a blank cell...
	if (first_day != 0) {
		ds_echo (ds_template_blank_cell(first_day));
	}
	var j = first_day;
	for (i = 0; i < days; i ++) {
		// Today is sunday, make a new week.
		// If this sunday is the first day of the month,
		// we've made a new row for you already.
		if (j == 0 && !first_loop) {
			// New week!!
			ds_echo (ds_template_new_week());
		}
		// Make a row of that day!
		ds_echo (ds_template_day(i + 1, m, y));
		// This is not first loop anymore...
		first_loop = 0;
		// What is the next day?
		j ++;
		j %= 7;
	}
	// Do the footer
	ds_echo (ds_template_main_below());
	// And let's display..
	ds_ob_flush();
	// Scroll it into view.
	ds_ce.scrollIntoView();
} 

// A function to show the calendar.
// When user click on the date, it will set the content of t.
function ds_sh (t) {
	// Set the element to set... 
	ds_element = t;
	// Make a new date, and set the current date.
	var ds_sh_date = new Date();
	ds_c_month = ds_sh_date.getMonth()+1;
	ds_c_year = ds_sh_date.getFullYear();
	current_day = ds_sh_date.getDay();
	currrent_month = ds_sh_date.getMonth();
	current_year = ds_c_year;
	// Draw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year, current_day);
	// To change the position properly, we must show it first
	ds_ce
}

$(function(){

});
