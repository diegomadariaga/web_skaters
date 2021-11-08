//import express, { Application, Request, Response,  } from "express";
const express = require("express");
const { Application, Request, Response } = require("express");
//import path from "path";
const path = require("path");


import rutas from "./routes/rutas";
const exphbs = require("express-handlebars");


const expressFileUpload = require("express-fileupload");


const port: number = 3000;
const app: any = express();

app.listen(port, () => console.log(`iniciado puerto 3000 http://localhost:${port}/`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    expressFileUpload({
        // se define que el límite para la carga de imágenes es de 5MB
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        //se responde con un mensaje indicando que se sobrepasó el límite especificado
        responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
    })
);
app.use(express.static(__dirname + "/public/"));
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "/views/mainLayout"),
        partialsDir: path.join(__dirname, "/views/Componentes"),
    })
);
app.set("view engine", "handlebars");

//querystring = ?=
//params = /:algo


//rutas handlebar_________________________________________________________________________
app.get("/", rutas); 
app.get("/iniciar", rutas); 
app.get("/modificar_perfil", rutas);
app.get("/registrar_skater", rutas);
app.get("/admin/:token", rutas);
//validate user and provide token
app.post("/validate", rutas);
//routes api rest
app.post("/skater", rutas);
app.patch("/skater", rutas);
//route update user profile
app.put("/skater", rutas );
//route delete user profile
app.delete("/skater", rutas);

/* app.get("/skaters", async (req: Request, res: Response) => {
    try {
        let filas = await conexion.getSkaters();
        res.status(201).send(filas);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}); */




//default route_________________________________________________________________________
app.get("*", (req: any, res: any) => {
    try {
        res.render("aviso", { mensaje: "esta pagina no existe 😒" });
    } catch (e) {
        console.log(e);
        res.render("error 404");
    }
});