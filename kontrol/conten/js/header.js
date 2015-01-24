    $(document).ready(function()
      { 
      
      $(".boton").click(function(){
	$("#desplegable").slideToggle("slow");
	  });
	$("#desplegable").css({ display: 'none' });
      

      
      $(".printer").bind("click",function()
	{
		
		alert("Imprimiendo¡");
	});
      
      
        var p = 0;

        $('#point').click(function()
        {

          if(p==0){
            $(this).css("fill","red");
            p=1;
          /*sipoint*/
          }

          else{
              $(this).css("fill","white");
              p=0;
              /*nopoint*/
              }
        });
	
	
$('#open').click(function()
	      {
		  $('#popup').fadeIn('slow');
		  $('.popup-overlay').fadeIn('slow');
		  $('.popup-overlay').height($(window).height());
		  return false;
	      });
    
	     $('#close').click(function()
	     {
	      $('#popup').fadeOut('slow');
	      $('.popup-overlay').fadeOut('slow');
	      return false;
	    });
	  
	  /* mas js document.ready*/	 
	      
	      
	      $('#submit').click(function()
	      {
		var user = $('#user').val();
		var password = $('#password').val();
		  if(user=='' || password =='')
		  {
		    alert('No dejar campos en blanco');
		    $('#user').focus();
		  }
		  else{
		  
		    $.post('../../../kontrol/index.php/welcome/valid',
			    { 'user':user,
			     'password':password
			    }, 
			    
			      function(result)	
			      {
				  if(result)
				  {
				    
				    alert(result);
				     $('#popup').fadeOut('slow');
				      $('.popup-overlay').fadeOut('slow');
				      window.location.href="../../../kontrol/index.php/welcome/active_ar";
				      return false;
				  }
				  
				  else{
				  alert("Usuario o Contraseña Incorrecto");
				  $('#user').focus();
				  }
				  
			      }
			  );		 
		  }  
		  
	      });	
	
	
	
    
      
      });
    