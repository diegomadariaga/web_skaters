const express = require("express");
const path = require("path");
const rutas = require("./routes/rutas");
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload");

const port = 3000;
const app = express();

app.listen(port, () => console.log(`iniciado puerto 3000 http://localhost:${port}/`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressFileUpload({
    // se define que el límite para la carga de imágenes es de 5MB
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    //se responde con un mensaje indicando que se sobrepasó el límite especificado
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
}));

//se disponibiliza la carpeta public para que se pueda acceder desde la web
app.use(express.static(__dirname + "/public/"));
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/mainLayout"),
    partialsDir: path.join(__dirname, "/views/Componentes"),
}));

//se establece el motor de plantillas
app.set("view engine", "handlebars");

//rutas handlebars_________________________________________________________________________
app.get("/", rutas);
app.get("/iniciar", rutas);
app.get("/modificar_perfil", rutas);
app.get("/registrar_skater", rutas);
app.get("/admin/:token", rutas);

//provee el token para el usuario
app.post("/validate", rutas);


//routes api rest_____________________________________________________________________
app.post("/skater", rutas);
//actualiza estado del skater
app.patch("/skater", rutas);
//actualiza datos del skater
app.put("/skater", rutas);
//elimina skater
app.delete("/skater", rutas);


//default route_________________________________________________________________________
app.get("*", (req, res) => {
    try {
        res.render("aviso", { mensaje: "esta pagina no existe 😒" });
    }
    catch (e) {
        console.log(e);
        res.render("error 404");
    }
});
