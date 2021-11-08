"use strict";

var changeStatus = function changeStatus(email) {
  var estado, token;
  return regeneratorRuntime.async(function changeStatus$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          estado = chekbox.checked;
          token = JSON.parse(localStorage.getItem("token"));
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.patch("http://localhost:3000/skater", {
            token: token,
            email: email,
            estado: estado
          }));

        case 5:
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          alert("Error al cambiar estado");

        case 11:
          alert(estado ? "Usuario habilitado" : "Usuario deshabilitado");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 7]]);
}; // exist token in localStorage


if (localStorage.getItem("token")) {
  // get token from localStorage
  var token = JSON.parse(localStorage.getItem("token"));
} else {
  // redirect to login
  window.location.href = "/iniciar";
}