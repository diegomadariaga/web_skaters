
//iife load login.js
window.addEventListener("load",  function(){
    try {
        let usuario = getJwt();    
        
        if (usuario) {
            document.getElementById("txtEmail").value = usuario.email;
            document.getElementById("txtEmail").disabled = true;
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

//se verifica credenciales del usuario y se redirecciona a la pagina correspondiente
async function load() {
    try {
        let usuario = await getData();
        console.log("respuesta server",usuario);
        if (usuario.error) {
            alert(usuario.error)
        } else {
            localStorage.setItem("token", JSON.stringify(usuario.data));
            window.location.href = "/modificar_perfil";
        }
    } catch (error) {
        console.log("alerta",error);
    }
}

async function getData() {
    try {
        let mail = document.getElementById("txtEmail").value;
        let pass = document.getElementById("txtPass").value;

        let obj = {
            email: mail,
            password: pass,
        };
        let token = await axios.post("http://localhost:3000/validate", {
            email: mail,
            password: pass,
        });  

        return token;
    } catch (error) {        
        return error.response.data;
    }
}
