"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express, { Application, Request, Response,  } from "express";
const express = require("express");
const { Application, Request, Response } = require("express");
//import path from "path";
const path = require("path");
const rutas_1 = __importDefault(require("./routes/rutas"));
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
app.use(express.static(__dirname + "/public/"));
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/mainLayout"),
    partialsDir: path.join(__dirname, "/views/Componentes"),
}));
app.set("view engine", "handlebars");
//querystring = ?=
//params = /:algo
//rutas handlebar_________________________________________________________________________
app.get("/", rutas_1.default);
app.get("/iniciar", rutas_1.default);
app.get("/modificar_perfil", rutas_1.default);
app.get("/registrar_skater", rutas_1.default);
app.get("/admin", rutas_1.default);
//validate user and provide token
app.post("/validate", rutas_1.default);
//routes api rest
app.post("/skater", rutas_1.default);
app.patch("/skater", rutas_1.default);
//route update user profile
app.put("/skater", rutas_1.default);
//route delete user profile
app.delete("/skater", rutas_1.default);
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
app.get("*", (req, res) => {
    try {
        res.render("aviso", { mensaje: "esta pagina no existe 😒" });
    }
    catch (e) {
        console.log(e);
        res.render("error 404");
    }
});
