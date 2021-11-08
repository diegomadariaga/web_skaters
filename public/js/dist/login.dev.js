"use strict";

//se verifica credenciales del usuario y se redirecciona a la pagina correspondiente
function load() {
  var usuario;
  return regeneratorRuntime.async(function load$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getData());

        case 3:
          usuario = _context.sent;
          console.log("respuesta server", usuario);

          if (usuario.error) {
            alert(usuario.error);
          } else {
            localStorage.setItem("token", JSON.stringify(usuario.data));
            window.location.href = "/modificar_perfil";
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log("alerta", _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getData() {
  var mail, pass, obj, token;
  return regeneratorRuntime.async(function getData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          mail = document.getElementById("txtEmail").value;
          pass = document.getElementById("txtPass").value;
          obj = {
            email: mail,
            password: pass
          };
          _context2.next = 6;
          return regeneratorRuntime.awrap(axios.post("http://localhost:3000/validate", {
            email: mail,
            password: pass
          }));

        case 6:
          token = _context2.sent;
          return _context2.abrupt("return", token);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", _context2.t0.response.data);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}