import { Conexion } from "../database/bd_conn";
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const secretKey = "Shhhh";
const fs = require("fs");
const uuid = require("uuid");

const conexion: Conexion = new Conexion();
class indexController {
    constructor() {}

    public async loadRoot(req: Request, res: Response): Promise<void> {
        try {
            let filas = await conexion.getSkaters();

            res.render("index", { filas: filas });
        } catch (e) {
            console.log(e);
            res.render("aviso", {
                mensaje: "no se pudo cargar el listado de participantes 💔",
            });
        }
    }
    public async getLoginView(req: Request, res: Response): Promise<void> {
        try {
            res.render("login");
        } catch (e) {
            console.log(e);
            res.render("error 404");
        }
    }
    public async getRegisterView(req: Request, res: Response): Promise<void> {
        try {
            res.render("register");
        } catch (e) {
            console.log(e);
            res.render("aviso", {
                mensaje: "no se pudo cargar el formulario de registro 💔",
            });
        }
    }
    public async getModifView (req: Request, res: Response): Promise<void> {
        try {
            res.render("modificar_datos");
        } catch (e) {
            console.log(e);
            res.render("aviso", {
                mensaje: "no se pudo cargar el formulario de modificación de datos 💔",
            });
        }
    }
    /* public async getAdminView (req: Request, res: Response): Promise<void> {
        try {
            let filas = await conexion.getSkaters();
            res.render("admin", { filas: filas });
        } catch (e) {
            console.log(e);
            res.render("aviso", {
                mensaje: "no se pudo cargar el listado de participantes 💔",
            });
        }
    } */
    public async getAdminView (req: Request, res: Response): Promise<void> {
        const { token } = req.params;
        if (token=="1") {
            
            res.render("aviso", {
                mensaje: "debe iniciar sesion para acceder a la administracion",
            });
        }
        console.log(token);
        // decode token
        if (token) {
            // verifica el token y su expiración
            jwt.verify(token, secretKey, async function (err: any, decoded: any) {
                if (err) {
                    console.log("error de autenticacion del token: ", err);
                    res.render("aviso", {
                        mensaje: "su sesion expiro, debe iniciar sesion nuevamente",
                    });
                } else {
                    // si el token es válido, obtiene los datos del usuario
                    try {
                        let filas = await conexion.getSkaters();
                        res.render("admin", { filas: filas });
                    } catch (e) {
                        console.log(e);
                        res.render("aviso", {
                            mensaje: "no se pudo cargar el listado de participantes 💔",
                        });
                    }
                }
            });
        } else {
            // si no hay token, retorna error
            console.log("no hay token");
            res.render("aviso", {
                mensaje: "debe iniciar sesion para acceder",
            });
        }

        
    }
    public async getToken (req: Request, res: Response) {
        let { email, password } = req.body;
        try {
            let user = await conexion.getSkater(email, password);
            if (user) {
                if (user.estado && user.email) {
                    const token = jwt.sign(
                        {
                            exp: Math.floor(Date.now() / 1000) + 580,
                            data: user,
                        },
                        secretKey
                    );
                    res.send(token);
                } else if (!user.estado && user.email) {
                    res.status(401).send({
                        error: "Este usuario está desactivado",
                        code: 401,
                    });
                } else {
                    res.status(401).send({
                        error: user,
                        code: 401,
                    });
                }
            } else {
                res.status(404).send({
                    error: "Este usuario no está registrado en la base de datos",
                    code: 404,
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "Ocurrió un error al verificar el usuario",
                code: 500,
            });
        }
    }
    public async createSkater (req: any, res: Response): Promise<void> {
        const { email, nombre, password, password2, anos_experiencia, especialidad } = req.body;
        if (password !== password2) {
            console.log("pasword diferentes");
            res.render("aviso", { mensaje: "la confirmacion de contraseña no coincide"});
        } else if (email && nombre && password && password2 && anos_experiencia && especialidad && req.files) {
            const { foto } = req.files;
            console.log("foto data",foto);
            //crea carpeta uploads si no existe
            fs.existsSync("./public/uploads/") || fs.mkdirSync("./public/uploads/");
    
            let nombrefoto: string = uuid.v4().slice(0, 16) + req.files.foto.name;
            try {
                await conexion.createSkater(email, nombre, password, anos_experiencia, especialidad, nombrefoto);
                
                foto.mv(`./public/uploads/${nombrefoto}`, (error: any) => {
                    if (error) {
                        console.log("error al mover foto:",error);
                        res.render("aviso", { mensaje: "Lo siento, ocurrió un error al guardar el archivo seleccionado" });
                    }else {
                        res.redirect("/");
                    }
                });
                
            } catch (error) {
                if (error.code == "23505") {
                    res.render("aviso", { mensaje: "Lo siento, este correo ya esta registrado" });
                } else {
                    res.render("aviso", { mensaje: "Lo siento, ocurrió un error al crear un skater" });
                }
            }
        } else {
            res.render("aviso", { mensaje: "debe llenar todos los campos para continuar" });
        }
    }
    public async updateSkaterEstado (req: any, res: Response) {
        const { email, estado, token } = req.body;
        try {
            
            await conexion.updateEstadoSkater(email, estado);
            res.status(201).send({
                mensaje: "Datos actualizados",
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async updateSkater (req: any, res: Response) {
        const { nombre, anos_experiencia, especialidad } = req.body;
        const { email } = req.body;
        const { pass } = req.body;
        try {
            if (pass) {
                await conexion.updateSkater(email, nombre, anos_experiencia, especialidad, pass);
            } else {
                await conexion.updateSkater(email, nombre, anos_experiencia, especialidad);
            }
            res.status(201).send({
                mensaje: "Datos actualizados",
            });
        } catch (error) {
            res.status(500).send({
                mensaje: "Lo siento, ocurrió un error al actualizar los datos",
            });
        }
    }
    async deleteSkater (req: any, res: Response) {
        const { email } = req.body;
        const { foto } = req.body;
        console.log(foto, "foto", email, "email");
        try {
            await conexion.deleteSkater(email);
            //delete file
            try {
                fs.unlinkSync(`../public/uploads/${foto}`);
            } catch (error) {
                console.log("error al borrar archivo", error);
            }
            res.status(201).send({
                mensaje: "Usuario eliminado",
            });
        } catch (error) {
            res.status(500).send({
                mensaje: "Lo siento, ocurrió un error al eliminar el usuario",
            });
        }
    }
    public verifyToken (req: any, res: Response, next: NextFunction): Response<any, Record<string, any>> {
        const token = req.body.token;
    
        // decode token
        if (token) {
            // verifica el token y su expiración
            jwt.verify(token, secretKey, function (err: any, decoded: any) {
                if (err) {
                    console.log("error de autenticacion del token: ", err);
                    return res.status(401).send({
                        error: err.message,
                        code: 401,
                    });
                } else {
                    // si esta todo ok, guarda  el request para poder usarlo en el resto de las rutas
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // si no hay token, retorna error
            console.log("no hay token");
            return res.status(401).send({
                error: "Token no proveído",
                code: 401,
            });
        }
    }
}
export const idxController: indexController = new indexController();
