<div id="sidebar-right">
    <a href="#" class="close close-help" aria-hidden="true">&times;</a>
    <div class="col-lg-12">
        <h3><?= $this->lang->line('header_menu_help_text'); ?></h3>
        <ul>
            <li><a href="/tutorials">Tutoriales</a></li>
            <li><a href="https://kichink.desk.com/">Chat</a></li>
            <li><a href="tel:5541607999">(55) 4160-7999</a></li>
            <li><a href="mailto:contacto@kichink.com">contacto@kichink.com</a></li>
            <li><a class="social" href="http://www.twitter.com/kichinkayuda" target="_blank"><i class="fa fa-twitter fa-2"></i>Twitter</a></li>
            <!--li><a class="social" href="http://www.facebook.com/kichink" target="_blank"><i class="fa fa-facebook fa-2"></i>Facebook</a></li>
            <li><a class="social" href=" https://plus.google.com/+Kichink/videos" target="_blank"><i class="fa fa-google-plus"></i>Google+</a></li-->
        </ul>
    </div>
</div>
<div id="preloader" data-rotate="0"></div>
<footer>&copy; <?=@date("Y")?> Kichink!</footer>

<? if(strpos($this->session->userdata('username'), '@kichink.com') OR $this->session->userdata('username') == 'lili.fdez@gmail.com'){ ?>
<!-- Bugherd script -->
<script type='text/javascript'>
(function (d, t) {
  var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
  bh.type = 'text/javascript';
  bh.src = '//www.bugherd.com/sidebarv2.js?apikey=exmva9srbxrynrzfyy2saa';
  s.parentNode.insertBefore(bh, s);
  })(document, 'script');
</script>
<? } ?>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-32304914-2', 'kichink.com');
ga('send', 'pageview');
</script>
</body>
</html>
