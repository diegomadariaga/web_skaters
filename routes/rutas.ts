import express, { Router} from "express";
import {idxController} from "../controllers/indexController";
//const {idxController} = require("../controllers/indexController");


const router: Router = express.Router();
const rutasProtegidas: Router = express.Router();
rutasProtegidas.use(idxController.verifyToken); 

router.get("/", idxController.loadRoot);
router.get("/iniciar", idxController.getLoginView);
router.get("/registrar_skater", idxController.getRegisterView);
router.get("/modificar_perfil", idxController.getModifView);
router.get("/admin", idxController.getAdminView);
router.post("/validate", idxController.getToken);
router.post("/skater", idxController.createSkater);

router.put("/skater",rutasProtegidas, idxController.updateSkater);
router.patch("/skater",rutasProtegidas, idxController.updateSkaterEstado);
router.delete("/skater",rutasProtegidas, idxController.deleteSkater);


export default router;
