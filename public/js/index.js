function salir(){
    localStorage.removeItem("token");
    window.location.href = "/";
}

window.addEventListener("load",  function(){
    try {
        let usuario = getJwt();    
        let token = JSON.parse(localStorage.getItem("token")) ;
        if (usuario) {
            document.getElementById("btn_admin").href = "/admin/"+token;
            if (document.getElementById("txtEmail")) {
                document.getElementById("txtEmail").value = usuario.email;
                document.getElementById("txtEmail").disabled = true;
                
            }
        }
    } catch (error) {
        console.log("alerta",error);
    }
});

    
//obtener datos del usuario logueado (token guardado en localStorage) y mostrar en el formulario de modificar datos 
 function getJwt(){
    let jwt =  JSON.parse(localStorage.getItem("token"));
    
    if(jwt != null){      
        return getDataJwt(jwt).data;
    }
    else{
        return null;
    }
}
//decode jwt token
 function getDataJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    let result =  JSON.parse(window.atob(base64));
    
    return result;
}