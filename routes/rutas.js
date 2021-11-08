"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexController_1 = require("../controllers/indexController");
//const {idxController} = require("../controllers/indexController");
const router = express_1.default.Router();
const rutasProtegidas = express_1.default.Router();
rutasProtegidas.use(indexController_1.idxController.verifyToken);
router.get("/", indexController_1.idxController.loadRoot);
router.get("/iniciar", indexController_1.idxController.getLoginView);
router.get("/registrar_skater", indexController_1.idxController.getRegisterView);
router.get("/modificar_perfil", indexController_1.idxController.getModifView);
router.get("/admin", indexController_1.idxController.getAdminView);
router.post("/validate", indexController_1.idxController.getToken);
router.post("/skater", indexController_1.idxController.createSkater);
router.put("/skater", rutasProtegidas, indexController_1.idxController.updateSkater);
router.patch("/skater", rutasProtegidas, indexController_1.idxController.updateSkaterEstado);
router.delete("/skater", rutasProtegidas, indexController_1.idxController.deleteSkater);
exports.default = router;