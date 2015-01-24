function search(){
    $(".sidebar-nav").find(".btn.btn-primary.btn-large").removeClass("btn-primary").addClass("btn-warning");
    $(".sidebar-nav").find(".btn.btn-warning.btn-large").attr("disabled","yes");
    $(".sidebar-nav").find(".btn.btn-warning.btn-large").html("Buscando...");
    search_params = {
        page:                 page,
        limit:                limit,
        order_ids:            $('#order_ids').val(),
        stores_ids:           $('#stores_ids').val(),
        store_names:          $('#store_names').val(),
        user_emails:          $('#user_emails').val(),
        no_guias:             $('#no_guias').val(),
        ref_bbva:             $('#ref_bbva').val(),
        ref_oxxo:             $('#ref_oxxo').val(),
        ref_oxxo_k:           $('#ref_oxxo_k').val(),
        ref_seven:            $('#ref_seven').val(),
        date_from:            $('#date_from').val(),
        date_to:              $('#date_to').val(),
        date_shipment_from:   $('#date_shipment_from').val(),
        date_shipment_to:     $('#date_shipment_to').val(),
        tarjeta:              $('#tarjeta').val(),
        total_price:          $('#total_price').val(),
        cash_confirm:         $('#cash_confirm').val(),
        mensaje_a_usar:       get_checkbox_group('mensajeria_a_usar'),
        status:               get_checkbox_group('status'),
        vip_status:           get_checkbox_group('vip_status'),
        tipo_envio:           get_checkbox_group('tipo_envio'),
        shipment_company:     get_checkbox_group('shipment_company'),
        settings:             get_checkbox_group('settings'),
        min_monto:      $('#min_monto').val(),
        max_monto:      $('#max_monto').val(),
        cp_search:      $('#cp_search').val(),
    };

    call_api(url_call_api, 'post',  search_params , function(data) {
        $(".sidebar-nav").find(".btn.btn-warning.btn-large").removeClass("btn-warning").addClass("btn-primary");
        $(".sidebar-nav").find(".btn.btn-primary.btn-large").attr("disabled",false);
        $(".sidebar-nav").find(".btn.btn-primary.btn-large").html("Buscar");
        ajax_result = jQuery.parseJSON(data);
        items = ajax_result.data;

        if(ajax_result !== null)
        {
            if($(items).length > 0){
              
                $.each(items, function(i, val){
                    if(val.guia_relacionada){
                        val.guia_relacionada = '<i class="icon-ok"></i>';
                    }
                });

                // Carga del numero de resultados
                $('#registros_total').html(items[0].ordenes_totales);
                $('#registros_desplegados').html(ajax_result.result_count);
                $('#user_pref_button').css('display','block');

                headers = ajax_result.header_col_names;
                if(init === true){
                    populate_pref_fields(headers);
                }
                var fields = [];
                    fields = get_selected_pref();
                var MyTable =  $("#table-container").data().DinamicTable.methods;
                    MyTable.setHeader(headers);
                    MyTable.setContent(items);
                    MyTable.drawTable();
                    MyTable.setVisibleFields(fields);

            }
            else{
                
                $('#registros_total').html(0);
                $('#registros_desplegados').html(0);
                
                var MyTable =  $("#table-container").data().DinamicTable.methods;
                    MyTable.setHeader();
                    MyTable.setContent({});
                    MyTable.drawTable();
                    MyTable.setVisibleFields([]);
            }
        }

    }, false);

}