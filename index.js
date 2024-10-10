// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
//QUE ESTE ESCUCHANDO Y TENGAMOS UNA RUTA PRINCIPAL

const express = require("express");
const app = express();

app.use(express.json());
//en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera lo voy a utilizar

const publicacionRouter = require('./routers/publicacion.router');
app.use('/publicacion', publicacionRouter);
//Siempre que me refiera a publicaciones le coloco el prefijo

app.get("/", (req, res) => {
    res.send("Hola pressoMAP");
});

//Esta es la ruta principal del proyecto "/"

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));

