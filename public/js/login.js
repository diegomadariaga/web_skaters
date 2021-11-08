


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
