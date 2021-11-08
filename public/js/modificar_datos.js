
//iife 
( function () {
    try {
        let usuario = getJwt();        
        if (!usuario) {
            alert("por favor vuelva a iniciar sesion");
        } else {         
            document.getElementById("nombre").value = usuario.nombre;
            document.getElementById("email").value = usuario.email;
            document.getElementById("experiencia").value = usuario.anos_experiencia;
            document.getElementById("especialidad").value = usuario.especialidad;
            document.getElementById("foto").src=`./uploads/${usuario.foto}`; 
            document.getElementById("foto").alt = usuario.foto;
        }
    } catch (error) {
        console.log("alerta",error);
    }
})();

//obtener datos del usuario logueado (token guardado en localStorage) y mostrar en el formulario de modificar datos 
function getJwt(){
    var jwt = JSON.parse(localStorage.getItem("token"));
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
    return JSON.parse(window.atob(base64));
}



//send token to validate user and update data
async function updateData() {
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        let pass2 = document.getElementById("password2").value;
        let experiencia = document.getElementById("experiencia").value;
        let especialidad = document.getElementById("especialidad").value;
        if (pass != pass2) {
            alert("Las contraseñas no coinciden");
            return;
        }else if (pass == "" || pass2 == "" || nombre == ""|| experiencia == ""|| especialidad == "") {
            alert("los campos no pueden estar vacios");
            return;
        }else if (email == "") {
            alert("El email no puede estar vacio");
            return;
        }else if (pass == "12345678" && pass2 == "12345678") {
            pass = null;
            pass2 = null;
        }
        let response = await axios.put("http://localhost:3000/skater", {
            token: token,
            nombre: nombre,
            email: email,
            pass: pass,
            anos_experiencia: experiencia,
            especialidad: especialidad
        });
        console.log(response);
        alert(response.data.mensaje);
        if (response.data.mensaje == "Datos actualizados") {
            window.location.href = "./";
        }else{
            alert(response.data.mensaje);
            window.location.href = "./iniciar";
        }
    } catch (error) {
        console.log(error);
        window.location.href = "./iniciar";
        alert("Error al actualizar los datos");
        return error.response.data;
    }
}
//send token to validate user and delete account
async function deleteAccount() {
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        let email = document.getElementById("email").value;
        let foto = document.getElementById("foto").alt;
        console.log(token);
        
        
        let response = await axios.delete("http://localhost:3000/skater", {
            data: {
                token: token,
                email: email,
                foto: foto
            }
        });   
        console.log(response);
        alert(response.data.mensaje);
        if (response.data.mensaje == "Usuario eliminado") {
            localStorage.removeItem("token");
            window.location.href = "./";
        }else{
            alert(response.data.mensaje);
            window.location.href = "./iniciar";
        }
    } catch (error) {
        console.log(error);
        window.location.href = "./iniciar";
        alert("Error al eliminar la cuenta");
        return error.response.data;
    }
}
