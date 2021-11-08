//import express, { Router} from "express";
const express = require('express');
//import {idxController} from "../controllers/indexController";
const { idxController } = require("../controllers/indexController");

const router = express.Router();

const rutasProtegidas = express.Router();
//middleware para proteger las rutas con token
rutasProtegidas.use(idxController.verifyToken);

//rutas
router.get("/", idxController.loadRoot);
router.get("/iniciar", idxController.getLoginView);
router.get("/registrar_skater", idxController.getRegisterView);
router.get("/modificar_perfil", idxController.getModifView);
router.get("/admin/:token", idxController.getAdminView);
router.post("/validate", idxController.getToken);
router.post("/skater", idxController.createSkater);

//rutas protegidas
router.put("/skater", rutasProtegidas, idxController.updateSkater);
router.patch("/skater", rutasProtegidas, idxController.updateSkaterEstado);
router.delete("/skater", rutasProtegidas, idxController.deleteSkater);
module.exports = router;
