function comprobarClave(){
  clave1 = document.formNewUser.password.value
  clave2 = document.formNewUser.password2.value
  
  if(clave1 == clave2)
    document.formNewUser.submit();
  else
    alert("Las contraseñas no coinciden")
    
  
}
