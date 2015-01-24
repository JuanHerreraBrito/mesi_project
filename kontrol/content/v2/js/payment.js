/*
 * V2 Sell.Kichink
 * Payment Details
 */
$(document).ready(function() {
    
    function addOrderMovs(order)
    {
        var divAccordion= "accordion-movs";
        var movs        = order.movimientos;
        var id          = "mov"+order.order_id;
        var o = '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                    '<a data-toggle="collapse" data-parent="#'+divAccordion+'" href="#collapse-' + id + '">' +
                    '<div class="panel-title">' +
                    '<b>No. ' + order.order_id + '</b>' +
                    //'<i class="articulo">' + movs[i].name + '</i>' +
                    '<span>$' + order.movs + '</span>' +
                    '</div>' +
                    '</a>' +
                    '</div>'+
                    '<div id="collapse-' + id + '" class="panel-collapse collapse">'+
                        '<div class="panel-body">'+
                    '		<div class="panel panel-primary">'+
                    '			<div class="panel-heading">DETALLES MOVIMIENTOS</div>'+
                    '			<div class="panel-body">'+
                    '				<table class="table" id="movimientos-table-' + id + '">'+
                    '					<thead>'+
                    '						<tr>'+
                    '							<th>Absorve</th>'+
                    '							<th>Creación</th>'+
                    '							<th>Concepto</th>'+
                    '							<th>Descripción</th>'+
                    '							<th>Usuario</th>'+
                    '							<th>Tipo</th>'+
                    '							<th>Importe</th>'+
                    '						</tr>'+
                    '					</thead>'+
                    '					<tbody id="movimientos-content-' + id + '">';
        
        for (i in movs) {
                o+= '					    <tr>'+
                    '						    <td>'+movs[i].absorve.toUpperCase()+'</td>'+
                    '						    <td>'+movs[i].fecha+'</td>'+
                    '						    <td>'+movs[i].concepto.toUpperCase()+'</td>'+
                    '						    <td>'+movs[i].descripcion.toUpperCase()+'</td>'+
                    '						    <td>'+movs[i].usuario.toUpperCase()+'</td>'+
                    '						    <td>'+movs[i].operacion.toUpperCase()+'</td>'+
                    '						    <td>'+movs[i].importe+'</td>'+
                    '					</tr>';
        }
                o+= '					</tbody>'+
                    '				</table>'+
                    '			</div>'+
                    '		</div>'+
                    '   </div>' +
                    '</div>'+
                '</div>';
        $("#"+divAccordion).append(o);
    }
    
    $('.deuda_detail').hide();
    call_api('/api/pagos/get_payment_order_details', 'post', {"store_id": store_id, "type": payment_id}, function(data) {
        var ajax_request = jQuery.parseJSON(data.toString());
        var obj = ajax_request.data.pago;
        var show_movs = false;
        
        $(".resumen").find(".res-item .payments").html(obj.stats.payments_count);
        $(".resumen").find(".res-item .orders").html(obj.stats.orders_count)
        $(".resumen").find(".res-item .items").html(obj.stats.items_count);

        var table_container = '<table class="table">';
        var table_header    = "<tr><th>No. "+kontrol_lang['payment_order']+"</th><th style='text-align:center'>"+kontrol_lang['payment_items']+"</th><th style='text-align:center'>Total</th></tr>";
        var table_content   = "";
        for (var j in obj.pagos) {
            for(var k in obj.pagos[j]){
                table_content += "<tr><td><b>No. " + obj.pagos[j][k].order_id + "</b></td>"+
                    "<td align='center'>" + obj.pagos[j][k].items_count +" "+ kontrol_lang['payment_items'].toLowerCase() +" "+kontrol_lang['payment_with_units'] +" "+obj.pagos[j][k].units+" "+kontrol_lang['payment_units']+"</td>";
                
                if(obj.pagos[j][k].movimientos.length != 0){
                    show_movs = true;
                    addOrderMovs(obj.pagos[j][k]);
                    
                    //x += "<td align='right'>$" + number_format(obj.pagos[j][k].order_total, 2, ".", ",") + "</td></tr>";
                }
                
                table_content += "<td align='right'>$" + number_format(obj.pagos[j][k].order_total, 2, ".", ",") + "</td></tr>";
                    
                //if(obj.pagos[j][k].movimientos.length != 0){
                //    show_movs = true;
                //    addOrderMovs(obj.pagos[j][k]);
                //}
            }
        }
        if(!show_movs)  $('.order-movs').remove();
        else            $('.order-movs').show();
        
        table_content += "</table>";
        $("#resumen-pagos-orden").html(table_container+table_header+table_content);

        for (i in obj.items) {

            var id = i;

            var o = '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                    '<a data-toggle="collapse" data-parent="#accordion-pagos" href="#collapse-' + i + '">' +
                    '<div class="panel-title">' +
                    '<b>No. ' + obj.items[i].id + '</b>' +
                    '<i class="articulo">' + obj.items[i].name + '</i>' +
                    '<span>' + obj.items[i].units + ' '+kontrol_lang['payment_units']+'</span>' +
                    '</div>' +
                    '</a>' +
                    '</div>';
            if (obj.items[i].purchase_options) {
                o += '<div id="collapse-' + i + '" class="panel-collapse collapse">' +
                        '<div class="panel-body">' +
                        '<ul>';
                for (k in obj.items[i].purchase_options) {
                    o += '<li>' + k + ' - ' + obj.items[i].purchase_options[k] + ' '+kontrol_lang['payment_units']+'</li>';
                }
                o += '</ul>' +
                        '</div>' +
                        '</div>';
            }
            o += '</div>';

            $("#accordion-pagos").append(o);

        }

        $(".resumen-pago .subtotal").html("$" + number_format(obj.pagos_resume.subtotal, 2, ".", ","));
        $(".resumen-pago .comision").html("-$" + number_format(obj.pagos_resume.comision_k, 2, ".", ","));
        $(".resumen-pago .total").html("$" + number_format(obj.pagos_resume.pago_total, 2, ".", ","));
        
        if(obj.pagos_resume.deuda.abono_por_pago){
            $('.deuda_detail').show();
            $('.deuda_detail').eq(0).find('td:eq(1) > .total').html(obj.pagos_resume.deuda.abono_pago);
            $('.deuda_detail').eq(1).find('td:eq(1) > .total').html(obj.pagos_resume.pago_total_deuda);
        }
        else{
            $('.deuda_detail').remove();
        }

    });
});
