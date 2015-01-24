/*
 * 
 /* 
 * Dinamic Table V2.3.2
 * Al dia 16 de enero 2014
 */

(function($) {

    $.fn.DinamicTable = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('DinamicTable'))
                return;
            // pass options to plugin constructor
            var myplugin = new DinamicTable(this, options);
            // Store plugin object in this element's data
            element.data('DinamicTable', myplugin);
            element.data().DinamicTable.methods.init();
        });
    };
    var DinamicTable = function(target, options) {
        var componentObj = {
            header: {},
            dataTable: null,
            selectable: false, //Si lleva o no checkboxes
            selectableField: '', //identificador unico
            selectableContent: '',
            controller: '',
            numered: true,
            actionsLabel: "Actions",
            actions: [],
            tableClass: "table", //La clase de la tabla
            result: [], //los datos que estan seleccionados
            visibleFields: [],
            types: {},
            content: {}, //Es un JSON
            onSelect: function() {
            },
            onDrawn: function() {
            },
            methods: {
                init: function() {
                    if (options.selectableContent != undefined)
                        componentObj.selectableContent = options.selectableContent;
                    if (options.actionsLabel != undefined)
                        componentObj.actionsLabel = options.actionsLabel;
                    if (options.actions != undefined)
                        componentObj.actions = options.actions;
                    if (options.onDrawn != undefined)
                        componentObj.onDrawn = options.onDrawn;
                    if (options.onSelect != undefined)
                        componentObj.onSelect = options.onSelect;
                    if (options.controller != undefined)
                        componentObj.controller = options.controller;
                    if (options.types != undefined)
                        componentObj.types = options.types;
                    if (options.numered != undefined)
                        componentObj.numered = options.numered;
                    if (options.tableClass != undefined)
                        componentObj.tableClass = options.tableClass;
                    if (options.selectable != undefined)
                        componentObj.selectable = options.selectable;
                    if (options.selectableField != undefined)
                        componentObj.selectableField = options.selectableField;
                    if (options.content != undefined)
                        componentObj.methods.setContent(options.content);
                    if (options.header != undefined)
                        componentObj.methods.setHeader(options.header);
                    //componentObj.methods.drawTable();

                },
                setHeader: function(newHeader, callbak) {
                    componentObj.header = newHeader;
                    if (callbak !== undefined)
                        callback();
                },
                setContent: function(newContent, callbak) {
                    componentObj.content = newContent;
                    if (callbak !== undefined)
                        callback();
                },
                getSelectedContent: function() {
                    res = new Array();
                    if (componentObj.selectableField != '') {
                        for (n in componentObj.result) {
                            if (componentObj.result[n][componentObj.selectableField] != undefined) {
                                if (componentObj.selectableContent != '') {
                                    m = componentObj.selectableContent;
                                    if (componentObj.result[n][componentObj.selectableField][m] != undefined) {
                                        res.push(componentObj.result[n][componentObj.selectableField][m]);
                                    }
                                }
                                else {
                                    res.push(componentObj.result[n][componentObj.selectableField]);
                                }
                            }
                        }
                        return res;
                    } else {
                        return componentObj.result;
                    }
                },
                drawTable: function() { //Vuelve a dibujar la tablita
                    var index = 1;
                    var style = '@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px){\n';
                    table = document.createElement('table');
                    if (componentObj.tableClass)
                        $(table).addClass(componentObj.tableClass);
                    //Header de la tabla predefinido
                    thead = document.createElement('thead');
                    if (componentObj.content[0] != undefined) {
                        tr = document.createElement('tr');
                        //Si es selectable agregamos el checkbox
                        if (componentObj.selectable || componentObj.numered) {
                            th = document.createElement('th');
                            $(th).addClass("selectable");
                            if (componentObj.selectable) {
                                checkbox = document.createElement("input");
                                $(checkbox).attr("type", "checkbox");
                                $(checkbox).attr("id", "_check_all");
                                $(checkbox).on("click", function() {
                                    $(this).closest('table').find("tbody").find("input:checkbox").each(function(i, e) {
                                        $(e).prop("checked", $("#_check_all").prop("checked"));
                                    });
                                    componentObj.methods.loadSelectedContent();
                                    componentObj.onSelect();
                                });
                                $(th).append(checkbox);
                            } else {
                                $(th).append("<b>#</b>");
                                if ($(target).attr("id") != undefined) {
                                    style += '#' + $(target).attr("id") + ' table td:nth-of-type(' + index + '):before { content: "#" !important; }\n';
                                    index++;
                                }
                            }
                            $(tr).append(th);
                        }

                        //Traemos las etiquetas por 'default'
                        var x = 0;
                        do {
                            for (i in componentObj.content[0]) {
                                if ((i == componentObj.visibleFields[x]) || componentObj.visibleFields.length < 1) {
                                    value = componentObj.content[0][i];
                                    th = document.createElement('th');
                                    name = i;
                                    for (a in componentObj.header) {
                                        if (componentObj.header[a].name == i) {
                                            name = componentObj.header[a].label;
                                        }
                                    }
                                    $(th).addClass("col-" + i);
                                    $(th).html(name);
                                    $(tr).append(th);
                                    if ($(target).attr("id") != undefined) {
                                        style += '#' + $(target).attr("id") + ' table td:nth-of-type(' + index + '):before { content: "' + name + '" !important; }\n';
                                    }
                                    index++;
                                }
                            }
                            x++;
                        } while (componentObj.visibleFields.length > x);



                        /*for (i in componentObj.content[0]) {
                         value = componentObj.content[0][i];
                         th = document.createElement('th');
                         name = i;
                         for (a in componentObj.header) {
                         if (componentObj.header[a].name == i) {
                         name = componentObj.header[a].label;
                         }
                         }
                         $(th).addClass("col-" + i);
                         $(th).html(name);
                         $(tr).append(th);
                         if ($(target).attr("id") != undefined) {
                         style += '#' + $(target).attr("id") + ' table td:nth-of-type(' + index + '):before { content: "' + name + '" !important; }\n';
                         }
                         index++;
                         }*/

                        if (componentObj.actions.length > 0) {
                            th = document.createElement("th");
                            $(th).addClass("actions");
                            $(th).html(componentObj.actionsLabel);
                            $(th).width((80 * componentObj.actions.length) + 23);
                            $(tr).append(th);
                            if ($(target).attr("id") != undefined) {
                                style += '#' + $(target).attr("id") + ' table td:nth-of-type(' + index + '):before { content: "' + componentObj.actionsLabel + '" !important; }\n';
                            }
                        }
                        style += "\n}";
                        $(target).parent().prepend("<style>" + style + "</style>");

                        $(thead).append(tr);
                    }
                    $(table).append(thead);
                    //Cuerpo de la tabla
                    tbody = document.createElement('tbody');
                    for (j in componentObj.content) {
                        tr = document.createElement('tr');
                        $(tr).data("data", componentObj.content[j]);

                        if (componentObj.selectable || componentObj.numered) {
                            td = document.createElement('td');
                            $(td).addClass("selectable");
                            if (componentObj.selectable) {
                                checkbox = document.createElement("input");
                                $(checkbox).attr("type", "checkbox");
                                //$(checkbox).data("obj", componentObj.content[j]);
                                $(checkbox).on("click", function(event) {
                                    event.stopPropagation();
                                    componentObj.methods.loadSelectedContent();
                                    componentObj.onSelect();
                                });
                                $(td).append(checkbox);
                                $(tr).click(function() {
                                    $(this).find("input:checkbox").click();
                                });
                            }

                            if (componentObj.numered) {
                                $(td).append('<small>' + (parseInt(j) + 1) + '</small>');
                            }

                            $(tr).append(td);
                        }

                        x = 0;
                        do {
                            for (k in componentObj.content[j]) {
                                if ((k == componentObj.visibleFields[x]) || componentObj.visibleFields.length < 1) {
                                    value = componentObj.content[j][k];
                                    td = document.createElement('td');
                                    //Contenido especifico por tipo de campo
                                    $(td).addClass("col-" + k);
                                    $(td).html(componentObj.methods.drawElement(k, value));
                                    $(tr).append(td);
                                }
                            }
                            x++;

                        } while (componentObj.visibleFields.length > x);

                        /*
                         for (k in componentObj.content[j]) {
                         value = componentObj.content[j][k];
                         td = document.createElement('td');
                         //Contenido especifico por tipo de campo
                         $(td).addClass("col-" + k);
                         $(td).html(componentObj.methods.drawElement(k, value));
                         $(tr).append(td);
                         }*/
                        if (componentObj.actions.length > 0) {
                            td = document.createElement("td");
                            $(td).addClass("actions");
                            for (a = 0; a < componentObj.actions.length; a++) {
                                if (componentObj.actions[a].type == "href") {
                                    btn = document.createElement("a");
                                    $(btn).attr("data-index", a);
                                    $(btn).addClass(componentObj.actions[a].label.toLowerCase());
                                    $(btn).attr("href", componentObj.actions[a].href+componentObj.content[j].id);
                                    $(btn).html(componentObj.actions[a].label);
                                    $(td).append(btn);
                                } else {
                                    btn = document.createElement("button");
                                    $(btn).attr("data-index", a);
                                    $(btn).addClass("btn");
                                    $(btn).addClass("btn-default");
                                    $(btn).addClass("btn-sm");
                                    $(btn).addClass(componentObj.actions[a].label.toLowerCase());
                                    if (componentObj.actions[a].icon != "") {
                                        spn = document.createElement("span");
                                        $(spn).addClass("glyphicon");
                                        $(spn).addClass(componentObj.actions[a].icon);
                                        $(btn).append(spn);
                                        $(btn).append("&nbsp;");
                                    }
                                    $(btn).append(componentObj.actions[a].label);
                                    $(btn).click(function() {
                                        event.stopPropagation();
                                        var obj = $(this).closest("tr").data();
                                        obj.container = $(this).closest("tr");
                                        componentObj.actions[$(this).data().index].onClick(obj);
                                        componentObj.methods.loadSelectedContent();
                                        $(target).find("tr").each(function(i, e) {
                                            $(e).find("td small").html(i);
                                        });
                                    });
                                    $(td).append(btn);
                                }
                                $(td).append("&nbsp;");

                            }
                            $(tr).append(td);
                        }

                        $(tbody).append(tr);
                    }

                    $(table).append(tbody)

                    if (componentObj.content != undefined) {
                        $(target).html(table);
                    }

                    if (componentObj.dataTable == null && options.dataTable != undefined) {
                        componentObj.dataTable = options.dataTable;
                        $(target).find("table").dataTable(componentObj.dataTable);
                    }

                    componentObj.onDrawn();
                },
                loadSelectedContent: function() {
                    componentObj.result = [];
                    if (componentObj.selectable) {
                        $(target).find("tbody").find("input[id!=_check_all]:checked").each(function(i, e) {
                            componentObj.result.push($(e).closest("tr").data().data);
                        });
                    }
                    else {
                        $(target).find("tbody").find("tr").each(function(i, e) {
                            componentObj.result.push($(e).data().data);
                        });
                    }
                },
                drawElement: function(key, value) {

                    if (Object.prototype.toString.call(value) == '[object Array]') {
                        ul = "<ul>";
                        for (i = 0; i < value.length; i++) {
                            ul += "<li>" + value[i] + "</li>";
                        }
                        ul += "</ul>";
                        return ul;
                    }

                    if ((componentObj.types[key] == undefined) || value == undefined)
                        return value;
                    switch (componentObj.types[key]) {
                        case "yesno":
                            {
                                if ((value == '') || (value == 0) || (value.toLowerCase() == "false") || !value)
                                    return "No";
                                return "Yes";
                                break;
                            }
                        case "date":{
                                var d=new Date(value);
                                var meses=new Array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
                                return meses[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear();
                        }
                        case "vip":
                            {
                                if ((value == '') || (value == 0) || (value.toLowerCase() == "false") || !value)
                                    return "";
                                return '<span class="label vip"><i class="icon-star icon-white"></i>VIP</span>';
                                break;
                            }
                        case "label":
                            {
                                return '<span class="label ' + key + ' ' + value.toLowerCase() + '">' + value.replace("_", "") + "</span>";
                                break;
                            }
                        case "link":
                            {
                                return '<a target="_blank" href="/v2/' + componentObj.controller + '/id/' + value + '">' + value + '</a>';
                                break;
                            }
                        case "money":
                            {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                //return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                break;
                            }
                        case "image":
                            {
                                return "<img src='" + value.toString() + "'/>";
                                break;
                            }
                            case "checkbox":
                            {
                                return "<input class='"+key+"' type='checkbox'" + (((value!=undefined)&&(value!="")&&(value!="0")&&(value!=false))?"checked":"") + "'/>";
                                break;
                            }
                        case "time_ago":
                            {
                                date_formats = {
                                    past: [
                                        {ceiling: 60, text: "hace $seconds segundos"},
                                        {ceiling: 3600, text: "hace $minutes minutos"},
                                        {ceiling: 86400, text: "hace $hours horas"},
                                        {ceiling: 2629744, text: "hace $days dias"},
                                        {ceiling: 31556926, text: "hace $months meses"},
                                        {ceiling: null, text: "hace $years a&ntilde;os"}
                                    ],
                                    future: [
                                        {ceiling: 60, text: "en $seconds segundos"},
                                        {ceiling: 3600, text: "en $minutes minutos"},
                                        {ceiling: 86400, text: "en $hours horas"},
                                        {ceiling: 2629744, text: "en $days dias"},
                                        {ceiling: 31556926, text: "en $months meses"},
                                        {ceiling: null, text: "en $years a&ntilde;os"}
                                    ]
                                };
                                time_units = [
                                    [31556926, 'years'],
                                    [2629744, 'months'],
                                    [86400, 'days'],
                                    [3600, 'hours'],
                                    [60, 'minutes'],
                                    [1, 'seconds']
                                ];
                                var t = value.toString().split(/[- :]/);
                                date = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                                ref_date = new Date();
                                var seconds_difference = (ref_date - date) / 1000;
                                var tense = 'past';
                                if (seconds_difference < 0) {
                                    tense = 'future';
                                    seconds_difference = 0 - seconds_difference;
                                }

                                function get_format() {
                                    for (var i = 0; i < date_formats[tense].length; i++) {
                                        if (date_formats[tense][i].ceiling == null || seconds_difference <= date_formats[tense][i].ceiling) {
                                            return date_formats[tense][i];
                                        }
                                    }
                                    return null;
                                }

                                function get_time_breakdown() {
                                    var seconds = seconds_difference;
                                    var breakdown = {};
                                    for (var i = 0; i < time_units.length; i++) {
                                        var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
                                        seconds = seconds - (time_units[i][0] * occurences_of_unit);
                                        breakdown[time_units[i][1]] = occurences_of_unit;
                                    }
                                    return breakdown;
                                }

                                function render_date(date_format) {
                                    var breakdown = get_time_breakdown();
                                    var time_ago_text = date_format.text.replace(/\$(\w+)/g, function() {
                                        return breakdown[arguments[1]];
                                    });
                                    return depluralize_time_ago_text(time_ago_text, breakdown);
                                }

                                function depluralize_time_ago_text(time_ago_text, breakdown) {
                                    for (var i in breakdown) {
                                        if (breakdown[i] == 1) {
                                            var regexp = new RegExp("\\b" + i + "\\b");
                                            time_ago_text = time_ago_text.replace(regexp, function() {
                                                return arguments[0].replace(/s\b/g, '');
                                            });
                                        }
                                    }
                                    return time_ago_text;
                                }

                                return render_date(get_format());
                                break;
                            }

                    }

                    return value;
                },
                setVisibleFields: function(fields) {
                    $(target).find("th").hide();
                    $(target).find("td").hide();
                    $(target).find(".selectable").show();
                    $(target).find(".actions").show();
                    for (f = 0; f < fields.length; f++) {
                        cls = ".col-" + fields[f];
                        $(target).find(cls).show();
                    }
                    componentObj.visibleFields = fields;
                }
            }
        };
        return componentObj;
    };
})(jQuery);

$.extend(true, $.fn.dataTable.defaults, {
    "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
    "sPaginationType": "bootstrap",
    "oLanguage": {
        "sLengthMenu": "_MENU_ records per page"
    }
});


/* Default class modification */
$.extend($.fn.dataTableExt.oStdClasses, {
    "sWrapper": "dataTables_wrapper form-inline"
});


/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings)
{
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": oSettings._iDisplayLength === -1 ?
                0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": oSettings._iDisplayLength === -1 ?
                0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
};


/* Bootstrap style pagination control */
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function(oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function(e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).append(
                    '<ul class="pagination pull-right">' +
                    '<li class="prev disabled"><a href="#">' + oLang.sPrevious + '</a></li>' +
                    '<li class="next disabled"><a href="#">' + oLang.sNext + '</a></li>' +
                    '</ul>'
                    );
            $(nPaging).append('<form  class="input-group gotoPage"><input type="text" class="form-control currPage"/><span class="input-group-btn"><button class="btn btn-default" type="submit">Go!</button></span></form>');

            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', {action: "previous"}, fnClickHandler);
            $(els[1]).bind('click.DT', {action: "next"}, fnClickHandler);


        },
        "fnUpdate": function(oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, ien, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }
            var vg = $($(oSettings.oInstance)[0]).parent();

            if (oPaging.iTotalPages == 1)
                vg.find(".dataTables_paginate.paging_bootstrap").hide();

            vg.find(".currPage").val(oPaging.iPage + 1);
            vg.find(".gotoPage").unbind("submit");
            vg.find(".gotoPage").submit(function(e) {

                if (parseInt(vg.find(".gotoPage").find("input").val(), 10) <= iEnd) {
                    e.preventDefault();
                    oSettings._iDisplayStart = (parseInt($(this).find("input").val(), 10) - 1) * oPaging.iLength;
                    fnDraw(oSettings);
                }
                else {
                    vg.find("input").val(oPaging.iPage + 1);
                }
                return false;
            });

            for (i = 0, ien = an.length; i < ien; i++) {
                // Remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // Add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                            .insertBefore($('li:last', an[i])[0])
                            .bind('click', function(e) {
                        e.preventDefault();
                        oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                        fnDraw(oSettings);
                    });
                }

                // Add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ($.fn.DataTable.TableTools) {
    // Set the classes that TableTools uses to something suitable for Bootstrap
    $.extend(true, $.fn.DataTable.TableTools.classes, {
        "container": "DTTT btn-group",
        "buttons": {
            "normal": "btn",
            "disabled": "disabled"
        },
        "collection": {
            "container": "DTTT_dropdown dropdown-menu",
            "buttons": {
                "normal": "",
                "disabled": "disabled"
            }
        },
        "print": {
            "info": "DTTT_print_info modal"
        },
        "select": {
            "row": "active"
        }
    });

    // Have the collection use a bootstrap compatible dropdown
    $.extend(true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
        "collection": {
            "container": "ul",
            "button": "li",
            "liner": "a"
        }
    });
}

