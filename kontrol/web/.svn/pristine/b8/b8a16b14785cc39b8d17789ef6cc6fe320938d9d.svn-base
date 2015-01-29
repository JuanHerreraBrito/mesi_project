<nav class="navbar navbar-inverse navbar-fixed-top header-bottom" role="navigation">       
        <ul class="nav navbar-nav pull-left" id="loginmenu">
            <li class="active">
                <a class="items" href="#login" >Login</a>						
            </li>
            <li>
                <a class="items" href="#tutorial" >Conoce Kontrol!</a>						
            </li>
        </ul>
</nav>
<script>
    $(document).ready(function() {
        $("#loginmenu").find("a").each(function(i, e) {
            $(e).click(function(event) {
                event.preventDefault();
                var catTopPosition = $($(this).attr("href")).offset().top - 155;
                if (catTopPosition < 25)
                    catTopPosition = 0;
                jQuery('html, body').animate({scrollTop: catTopPosition}, 'slow');
            });
        });
    });

</script>