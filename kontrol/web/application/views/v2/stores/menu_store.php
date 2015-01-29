<?php
    $menu_elements = array('items' => '444', 'orders'=> '444', 'payments' => '444', 'settings' => '444', 'apps' => '444', 'cop' => '444');
?>
<script type="text/javascript" src="/v2/js/store_details.js"></script>
<nav class="navbar navbar-inverse navbar-fixed-top header-bottom" role="navigation">       
    <ul class="nav navbar-nav pull-left" id="menu-store">
        <li class="dropdown allstores">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <span class="currname"></span>&nbsp;
                <b class="caret"></b>
            </a>
            <div class="search">
                <input type="text" class="form-control" placeholder="Search">
                <span class="glyphicon glyphicon-search"></span>
            </div>
            <ul class="dropdown-menu" id="my-stores"></ul>
        </li>
        <? if(isset($menu_elements['items']) AND $menu_elements['items']){ ?>
        <li <?= (($this->uri->segment(1) == "stores") && ($this->uri->segment(2) == "id")) ? "class='active'" : "" ?>>
            <a class="items" href="/stores/id/<?= $store->id ?>" >Items
                <span class="badge">0</span>
            </a>						
        </li>
        <? } ?>
        <? if(isset($menu_elements['orders']) AND $menu_elements['orders']){ ?>
        <li <?= ($this->uri->segment(1) == "orders") ? "class='active'" : "" ?>>
            <a class="orders" href="/orders/store/<?= $store->id ?>">Orders
                <span class="badge">0</span>
            </a>						
        </li> 
        <? } ?>     
        <? if(isset($menu_elements['payments']) AND $menu_elements['payments']){ ?>  
        <li <?= ($this->uri->segment(1) == "payments") ? "class='active'" : "" ?>>
            <a class="payments" href="/payments/store/<?= $store->id ?>">Pagos
                <span class="badge">0</span>
            </a>						
        </li>
        <? } ?>
        <? if(isset($menu_elements['settings']) AND $menu_elements['settings']){ ?>
        <li <?= ($this->uri->segment(2) == "settings") ? "class='active'" : "" ?>>
            <a href="/stores/settings/<?= $store->id ?>">Configuración</a>
        </li>
        <? }else{ 
            echo "<style>#requ_publish{display:none;}</style>";
        }?>
        
        <? if(isset($menu_elements['apps']) AND $menu_elements['apps']){ ?>
        <li <?= ($this->uri->segment(2) == "apps") ? "class='active'" : "" ?>>
            <a href="/stores/apps/<?= $store->id ?>">Apps</a>
        </li>
        <? } ?>

        <? if(isset($menu_elements['cop']) AND $menu_elements['cop']){ ?>
        <li <?= ($this->uri->segment(2) == "cop") ? "class='active'" : "" ?>>
            <a href="/cop/id/<?= $store->id ?>">Citas</a>
        </li>
        <? } ?>
    </ul>
    <ul class="nav navbar-nav pull-right" id="menu-store-status"></ul>
</nav>
<div class="clear-header"></div>
<!-----------///header bottom close here----------------->
<? if (true or ($store->live_store == 1 && $store->tienda_pruebas == 0)) { ?>

    <div class="modal fade" id="websiteModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close">×</button>
                    <h3 class="modal-title"><?=$this->lang->line('v3_layout_menu_modal_website_code_title')?></h3>
                </div>
                <div class="modal-body">
                    <p><?=$this->lang->line('v3_layout_menu_modal_website_code_msg')?></p>
                    <pre id="pre" style="height:350px;overflow:auto">
&lt;html&gt;
    &lt;head&gt;
        &lt;!-- <?=$this->lang->line('v3_layout_menu_modal_website_add_store_name')?> --&gt;
        &lt;title&gt;<?=$this->lang->line('v3_layout_menu_modal_website_store_name')?>&lt;/title&gt;
        &lt;!-- <?=$this->lang->line('v3_layout_menu_modal_website_add_keywords_description')?> --&gt;
        &lt;meta name="description" content="Nombre de tu tienda | Tienda en l&iacute;nea" /&gt;
        &lt;style&gt;
            body{
                margin:0px; padding:0px;
                font-family:Arial, Helvetica, sans-serif; 
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div style="width:100%; height:100%; position:absolute; top:0px; left:0px;"&gt;
        &lt;!-- <?=$this->lang->line('v3_layout_menu_modal_website_add_store_id')?> --&gt;
        &lt;iframe src="https://www.kichink.com/stores/id/<?= $store->id ?>" width="100%" height="100%" frameborder="0"&gt;
            &lt;div style="width:300px; margin:40% auto; font-size:20px;"&gt;
                Tu navegador no permite mostrar la tienda en esta ventana. 
                &lt;!-- Agregar ID de tienda --&gt;
                &lt;a href="https://www.kichink.com/stores/id/<?= $store->id ?>"&gt;
                    Haz clic para abrir a en una nueva ventana.
                &lt;/a&gt;
            &lt;/div&gt;
        &lt;/iframe&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
                    </pre>
                </div>      
                <div class="modal-footer">
                    <a class="btn btn-primary" data-dismiss="modal" href="#"><?=$this->lang->line('v3_layout_menu_modal_website_close')?></a>
                </div>
            </div>
        </div>
    </div>
<? } ?>
