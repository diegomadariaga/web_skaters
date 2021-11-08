"use strict";

//iife 
(function () {
  try {
    var usuario = getJwt();

    if (!usuario) {
      alert("por favor vuelva a iniciar sesion");
    } else {
      document.getElementById("nombre").value = usuario.nombre;
      document.getElementById("email").value = usuario.email;
      document.getElementById("experiencia").value = usuario.anos_experiencia;
      document.getElementById("especialidad").value = usuario.especialidad;
      document.getElementById("foto").src = "./uploads/".concat(usuario.foto);
      document.getElementById("foto").alt = usuario.foto;
    }
  } catch (error) {
    console.log("alerta", error);
  }
})(); //obtener datos del usuario logueado (token guardado en localStorage) y mostrar en el formulario de modificar datos 


function getJwt() {
  var jwt = JSON.parse(localStorage.getItem("token"));

  if (jwt != null) {
    return getDataJwt(jwt).data;
  } else {
    return null;
  }
} //decode jwt token


function getDataJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
} //send token to validate user and update data


function updateData() {
  var token, nombre, email, pass, pass2, experiencia, especialidad, response;
  return regeneratorRuntime.async(function updateData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = JSON.parse(localStorage.getItem("token"));
          nombre = document.getElementById("nombre").value;
          email = document.getElementById("email").value;
          pass = document.getElementById("password").value;
          pass2 = document.getElementById("password2").value;
          experiencia = document.getElementById("experiencia").value;
          especialidad = document.getElementById("especialidad").value;

          if (!(pass != pass2)) {
            _context.next = 13;
            break;
          }

          alert("Las contraseñas no coinciden");
          return _context.abrupt("return");

        case 13:
          if (!(pass == "" || pass2 == "" || nombre == "" || experiencia == "" || especialidad == "")) {
            _context.next = 18;
            break;
          }

          alert("los campos no pueden estar vacios");
          return _context.abrupt("return");

        case 18:
          if (!(email == "")) {
            _context.next = 23;
            break;
          }

          alert("El email no puede estar vacio");
          return _context.abrupt("return");

        case 23:
          if (pass == "12345678" && pass2 == "12345678") {
            pass = null;
            pass2 = null;
          }

        case 24:
          _context.next = 26;
          return regeneratorRuntime.awrap(axios.put("http://localhost:3000/skater", {
            token: token,
            nombre: nombre,
            email: email,
            pass: pass,
            anos_experiencia: experiencia,
            especialidad: especialidad
          }));

        case 26:
          response = _context.sent;
          console.log(response);
          alert(response.data.mensaje);

          if (response.data.mensaje == "Datos actualizados") {
            window.location.href = "./";
          } else {
            alert(response.data.mensaje);
            window.location.href = "./iniciar";
          }

          _context.next = 38;
          break;

        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          window.location.href = "./iniciar";
          alert("Error al actualizar los datos");
          return _context.abrupt("return", _context.t0.response.data);

        case 38:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 32]]);
} //send token to validate user and delete account


function deleteAccount() {
  var token, email, foto, response;
  return regeneratorRuntime.async(function deleteAccount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = JSON.parse(localStorage.getItem("token"));
          email = document.getElementById("email").value;
          foto = document.getElementById("foto").alt;
          console.log(token);
          alert(token);
          _context2.next = 8;
          return regeneratorRuntime.awrap(axios["delete"]("http://localhost:3000/skater", {
            data: {
              token: token,
              email: email,
              foto: foto
            }
          }));

        case 8:
          response = _context2.sent;
          console.log(response);
          alert(response.data.mensaje);

          if (response.data.mensaje == "Usuario eliminado") {
            window.location.href = "./";
          } else {
            alert(response.data.mensaje);
            window.location.href = "./iniciar";
          }

          _context2.next = 20;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          window.location.href = "./iniciar";
          alert("Error al eliminar la cuenta");
          return _context2.abrupt("return", _context2.t0.response.data);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}