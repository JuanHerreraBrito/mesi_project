<div class="col-lg-2 col-md-2 col-sm-2" id="sidebar-left">  
    <div align="center">
        <a href="#" class="fotoTienda">
            <img src="http://placehold.it/160x160" alt="" height="160px" width="160px"/>
        </a>
    </div>    
    <div align="center">    
        <button style="width:160px" class="btn btn-primary form-control add-item"><span class="glyphicon glyphicon-plus-sign"></span> <?=$this->lang->line('v3_layout_sidebar_add_item')?></button>
    </div>
    <div class="border"></div>
    <div class="col-lg-12 col-md-12 col-sm-12 ">
        <a href="/stores/notifications/<?= $store->id ?>">
        <span class="fa fa-envelope-o"></span>&nbsp;<b><?=$this->lang->line('v3_layout_sidebar_messages')?></b>&nbsp;<span id='notif_total' class="badge">0</span>
        </a>
    </div>
    <div class="border"></div>
    <div class="col-lg-12 col-md-12 col-sm-12 ">
        <div><span class="glyphicon glyphicon-stats"></span>&nbsp;<?=$this->lang->line('v3_layout_sidebar_stats_today')?><!--<a class="publish" href="#">today<span style="font-size:x-small" class="glyphicon glyphicon-chevron-down"></b</a>--></div>
        <div id="stats" >
            <div class="stats-box col-lg-12" data-toggle="tooltip" title="<?=$this->lang->line('v3_layout_sidebar_sales_desc')?>">
                <h2 id="sales">$0.00</h2>
                <p><?=$this->lang->line('v3_layout_sidebar_in_sales')?></p>
            </div>
            <br/>
            <div class="stats-box col-lg-12" data-toggle="tooltip" title="<?=$this->lang->line('v3_layout_sidebar_pageviews_desc')?>">
                <h2 id="views">0</h2>
                <p><?=$this->lang->line('v3_layout_sidebar_pageviews')?></p>
            </div>
        </div>
    </div>
</div>