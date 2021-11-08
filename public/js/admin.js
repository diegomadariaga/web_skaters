const changeStatus = async (email) => {
    
    let estado = document.getElementById("chekbox").checked
    
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.patch("http://localhost:3000/skater", {
        token,
        email,
        estado
      }); 
      
    } catch (error) {
      console.log(error);
      alert("Error al cambiar estado")
    }

    alert(estado ? "Usuario habilitado" : "Usuario deshabilitado")
};
// exist token in localStorage
if (localStorage.getItem("token")) {
    // get token from localStorage
    let token = JSON.parse(localStorage.getItem("token"));
} else {
    // redirect to login
    window.location.href = "/iniciar";
}



