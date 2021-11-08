# web_skaters
 -iniciar con comando npm install para instalar dependencias de node.js
 -ejecutar comando npm run start (ejecuta nodemon con el app.js que es el archivo principal)
 -no sera necesario crear ni modificar la base de datos, ya que está desplegada en un servidor de heroku
 -abrir en el navegador http://localhost:3000/
 -podra crear un nuevo skater con el formulario disponible en la barra de navegacion navbar (en la parte superior)
    debera llenar el formulario con los datos del skater y presionar el boton de registrar, esto guardara sus datos en la base de datos,y la imagen en el servidor con un uuid para identificarla.
 -para iniciar sesion con su usuario creado primero debera iniciar sesion con una cuenta activa, 
    e ir al apartado administrador en el navbar, en la parte izquierda de la pantalla y presionar el checkbox de activacion de cuenta,
    si no posee una cuenta podra usar la cuenta por defecto
    user: admin@skatepark.cl
    password: 1234
-para actualizar los datos de su cuenta debera introducir su contraseña previamente.


- DDL de la tabla utilizada para guardar los skaters:

        CREATE TABLE public.skaters (
            id serial4 NOT NULL,
            email varchar(50) NOT NULL,
            nombre varchar(25) NOT NULL,
            "password" varchar(100) NOT NULL,
            anos_experiencia int4 NOT NULL,
            especialidad varchar(50) NOT NULL,
            foto varchar(255) NOT NULL,
            estado bool NOT NULL,
            CONSTRAINT skaters_pk PRIMARY KEY (email)
        );

## Construido con 🛠️

- Javascript (transpilado con typescript)
- HTML
- CSS
- nodeJS(https://nodejs.org/en/)
- npm(https://www.npmjs.com/)
- typescript(https://www.typescriptlang.org/)
- postgresql(https://www.postgresql.org/)

#### Usando las librerías:

- [Express](https://expressjs.com/es/)
- [Express File Upload](https://www.npmjs.com/package/express-fileupload)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Handlebars](https://handlebarsjs.com/)
- [Bootstrap](https://getbootstrap.com/)

## Autor ✒️

- **Diego Madariaga**