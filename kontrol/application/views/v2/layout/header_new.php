<?php
if (isset($_GET["kntrl"])) {
    $domain = str_replace("sell3", "kontrol", $_SERVER['HTTP_HOST']);
    $domain = str_replace("kontrol", "", $domain);
    unset($_COOKIE["q1chinkv1"]);
    setcookie('q1chinkv1', '2', time(), '/', $domain);
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>
            <?= (isset($page_title) ? $page_title : $this->lang->line('kichink_html_title') . ' -- Kichink') ?>
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content=""/>
        <meta name="author" content=""/>
        <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
        <!--[if lt IE 9]>
          <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        <?php $v = "3.21"; ?>
        <script src="/js/jquery-1.9.1.min.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/jquery-ui-1.9.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/bootstrap.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/default.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/bootstrap-switch.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/jquery.callapi.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/validationK.jquery.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/ajaxq.jquery.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/jquery.cookie.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/jstree/jstree.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/feather.js"></script>
        <script type="text/javascript" src="/v2/js/preloader.jquery.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/moment-min.js?v=<?= @$v ?>"></script>
        <script type="text/javascript" src="/v2/js/calendar_function.js?v=<?= @$v ?>"></script>
        <!-- Le styles -->
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
        <!--link rel="stylesheet" href="/bootstrap3/css/bootstrap.min.css"/-->
        <!--link rel="stylesheet" href="/v2/css/font-awesome.min.css"/-->
        <link href="/bootstrap3/css/bootstrap-theme.css?v=<?= @$v ?>" rel="stylesheet"/>
        <link href="/v2/css/style.css?v=<?= @$v ?>" rel="stylesheet"/>
        <link href="/v2/css/bootstrap-switch.css?v=<?= @$v ?>" rel="stylesheet"/>
        <!--[if lte IE 8]>
        <link href="/css/introjs-ie.css" rel="stylesheet" />
        <![endif]-->

        <link href="/img/favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/img/icons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/img/icons/apple-touch-icon-114x114.png">
        <script>
            var store_id = '<?= ($this->session->userdata('active_store') ? $this->session->userdata('active_store') : @$store->id) ?>';
        </script>
    </head>
    <?php //$usrPref = @getUsrPref($this->session->userdata('user_id')); ?>
    <body>
        <!------------header-------------------->
        <header class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button class="navbar-toggle" data-target=".bs-navbar-collapse" data-toggle="collapse" type="button">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?= base_url() ?>"><img src="/img/tutorials/kontrol-logo.png" height="20px" style="margin-top:5px" alt="KICHINK!"/></a>
            </div>

            <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
                <ul class="nav navbar-nav ">
                    <li>
                        <!--a class="btn btn-default soporte" href="javascript:help();"><i class="fa fa-life-ring"></i> <?= $this->lang->line('header_menu_help_text'); ?></a-->
                        <a href="javascript:help();">
                            <img height="27px" src="/img/tutorials/btn_spt.png" style="margin-top: -3px;"/>
                        </a>
                    </li>
                    <?php if (!empty($usrPref)) { ?>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                <?= $usrPref->usr_language == 'es' ? $this->lang->line('dropdown_menu_option_es') : $this->lang->line('dropdown_menu_option_en'); ?>
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu" id='languagedrowdown'>
                                <li role="presentation" class="dropdown-header"><?= $this->lang->line('dropdown_menu_language'); ?></li>
                                <li>
                                    <a data-value='es' <?= $usrPref->usr_language == 'es' ? "class='selected'" : "" ?> href="javascript:void(0);"><?= $this->lang->line('dropdown_menu_option_es') ?></a>
                                </li>
                                <li>
                                    <a data-value='en' <?= $usrPref->usr_language == 'en' ? "class='selected'" : "" ?> href="javascript:void(0);"><?= $this->lang->line('dropdown_menu_option_en') ?></a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                <?= $this->session->userdata('name'); ?>
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li role="presentation" class="dropdown-header"><?= $this->session->userdata('name'); ?></li>
                                <li>
                                    <a href="<?= base_url() ?>user"><?= $this->lang->line('userProfile_title_text') ?></a>
                                </li>
                                <li>
                                    <a data-toggle="modal" data-target="#avisokontrol">V1</a>
                                </li>
                                <li>
                                    <a href="<?= base_url() ?>login/doLogout"><?= $this->lang->line('header_menu_logout_text'); ?></a>
                                </li>
                            </ul>
                        </li>
                    <?php } ?>
                </ul>
            </nav>
        </header>
        <div class="modal fade" id="avisokontrol" tabindex="-1" role="dialog" aria-labelledby="avisokontrol" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Aviso</h4>
                    </div>
                    <div class="modal-body" align="center">
                        La versi&oacute;n anterior estar&aacute; disponible hasta el 30 de junio. Despu&eacute;s de esta fecha, s&oacute;lo podr&aacute;s usar <b>Kontrol!</b>
                    </div>
                    <div class="modal-footer">
                        <a target="_self" type="button" href="http://mitienda.kichink.com/login?oldkntrl=true" class="btn btn-primary">OK</a>
                    </div>
                </div>
            </div>
        </div>
