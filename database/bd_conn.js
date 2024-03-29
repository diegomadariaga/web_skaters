"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conexion = void 0;
const pg_1 = require("pg");
const bcrypt = require("bcrypt"); //npm i bcrypt
/* ALTER TABLE usuarios ALTER COLUMN password TYPE varchar(100); */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
class Conexion {
    constructor() {
        this.#config = {
            user: "user",
            host: "www.amazonaws.com",
            password: "123",
            database: "db_",
            port: 5432,
            ssl: {
                rejectUnauthorized: false,
            },
            max: 4,
            idleTimeoutMillis: 5000,
            connectionTimeoutMillis: 2000,
        };
    }
    #config;
    #pool;
    async #conectar() {
        try {
            if (!this.#pool) {
                this.#pool = new pg_1.Pool(this.#config);
                console.log("crea pul");
            }
            let client = await this.#pool.connect();
            return client;
        }
        catch (e) {
            await this.#desconectar();
            console.log("error al conectar pool", e);
            throw e;
        }
    }
    async #desconectar() {
        try {
            await this.#pool.end();
        }
        catch (e) {
            console.log("error al desconectar pool", e);
            throw e;
        }
    }
    //obtiene el listado completo de skaters
    async getSkaters() {
        let cl = await this.#conectar();
        try {
            const query = {
                name: "fetch-skaters",
                text: `SELECT 
                id, email, nombre, "password", anos_experiencia, especialidad, foto, estado
                FROM skaters
                ORDER BY id
                `,
            };
            let res = await cl.query(query);
            let filas = res.rows;
            // add index to each row
            filas.forEach((fila, index) => {
                fila.index = index + 1;
            });
            return filas;
        }
        catch (error) {
            console.log("error al obtener skaters", error);
            throw error;
        }
        finally {
            cl.release();
        }
    }
    //verifica contraseña y retorna los datos del skater
    async getSkater(mail, password) {
        let cl = await this.#conectar();
        try {
            const query = {
                name: "fetch-skater",
                text: `SELECT 
                id, email, nombre, "password", anos_experiencia, especialidad, foto, estado
                FROM skaters
                WHERE email = $1
                `,
                values: [mail],
            };
            let result = await cl.query(query);
            if (result.rowCount > 0) {
                const isSame = await bcrypt.compare(password, result.rows[0].password);
                console.log("isSame: ", isSame);
                if (isSame) {
                    //no se envia el password por seguridad
                    result.rows[0].password = null;
                    return result.rows[0];
                }
                else {
                    return "Constraseña incorrecta";
                }
            }
            else {
                return result.rows[0];
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            cl.release();
        }
    }
    async createSkater(email, nombre, password, anos_experiencia, especialidad, foto) {
        let cl = await this.#conectar();
        try {
            let passwordHash = await hashPassword(password);
            const query = {
                text: `INSERT INTO public.skaters
                (email, nombre, "password", anos_experiencia, especialidad, foto, estado)
                VALUES($1, $2, $3, $4, $5, $6, false) returning *;
                `,
                values: [email, nombre, passwordHash, anos_experiencia, especialidad, foto],
            };
            let res = await cl.query(query);
            return res.rows;
        }
        catch (error) {
            console.log("error al crear skater", error);
            throw error;
        }
        finally {
            cl.release();
        }
    }
    async updateSkater(email, nombre, anos_experiencia, especialidad, password) {
        let cl = await this.#conectar();
        if (password) {
            try {
                let passwordHash = await hashPassword(password);
                const query = {
                    text: `UPDATE skaters
                    SET nombre = $1, "password" = $2, anos_experiencia = $3, especialidad = $4
                    WHERE email = $5
                    `,
                    values: [nombre, passwordHash, anos_experiencia, especialidad, email],
                };
                let res = await cl.query(query);
                return res.rows;
            }
            catch (error) {
                console.log("error al actualizar skater", error);
                throw error;
            }
            finally {
                cl.release();
            }
        }
        else {
            try {
                const query = {
                    text: `UPDATE skaters
                    SET nombre = $1,  anos_experiencia = $2, especialidad = $3
                    WHERE email = $4
                    `,
                    values: [nombre, anos_experiencia, especialidad, email],
                };
                let res = await cl.query(query);
                return res.rows;
            }
            catch (error) {
                console.log("error al actualizar skater", error);
                throw error;
            }
            finally {
                cl.release();
            }
        }
    }
    //update estado skater
    async updateEstadoSkater(email, estado) {
        let cl = await this.#conectar();
        try {
            const query = {
                text: `UPDATE skaters
                SET estado = $1
                WHERE email = $2
                `,
                values: [estado, email],
            };
            let res = await cl.query(query);
            return res.rows;
        }
        catch (error) {
            console.log("error al actualizar skater", error);
            throw error;
        }
        finally {
            cl.release();
        }
    }
    //revisar
    async deleteSkater(email) {
        let cl = await this.#conectar();
        try {
            const query = {
                text: `DELETE FROM skaters
                WHERE email = $1
                `,
                values: [email],
            };
            let res = await cl.query(query);
            return res.rows;
        }
        catch (error) {
            console.log("error al eliminar skater", error);
            throw error;
        }
        finally {
            cl.release();
        }
    }
}
exports.Conexion = Conexion;
