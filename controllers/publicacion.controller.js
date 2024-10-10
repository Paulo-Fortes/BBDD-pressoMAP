//controladores del modulo

    //----Campos tabla----
    //idUsuario
    //nombreUsuario
    //nombreLocal
    //fechaComentario
    //campoComentario

const db = require("../db/db");

//metodo get

//para todos los comentarios
const allComments = (req, res) => {
    const sql = "SELECT * FROM publicacion";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//para un comentario
const showComments = (req, res) => {
    const {idUsuario} = req.params;
    const sql = "SELECT * FROM publicacion WHERE idUsuario = ?";
    db.query(sql, [idUsuario], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el comentario buscado"});
        };
        res.json(rows[0]);
        //me muestra el elemento en la posicion cero si existe.
    });
};

//metodo post
const storeComments = (req, res) => {
    const {nombreUsuario, nombreLocal, fechaComentario, campoComentario} = req.body;    
    const sql = "INSERT INTO publicacion (nombreUsuario, nombreLocal, fechaComentario, campoComentario) VALUES (?,?,?,?)";
    db.query(sql, [nombreUsuario, nombreLocal, fechaComentario, campoComentario], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const publicacion = {...req.body, id: result.insertId}; //... reconstruye el objeto del body
        res.status(201).json(publicacion); //muestra creado con éxito el elemento
    });
    

};

//metodo put
const updateComments = (req, res) => {
    const {idUsuario} = req.params;
    const {nombreUsuario, nombreLocal, fechaComentario, campoComentario} = req.body;
    const sql = "UPDATE publicacion SET nombreUsuario = ?, nombreLocal = ?, fechaComentario = ?, campoComentario = ? WHERE idUsuario = ?";
    db.query(sql, [nombreUsuario, nombreLocal, fechaComentario, campoComentario, idUsuario], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La publicacion a modificar no existe"});
        };

        const publicacion = {...req.body, ...req,params}; //... reconstruye el objeto del body

        res.json(publicacion); //acá muestro luego de reconstruir
    });
};


//metodo delete

const destroyComments = (req, res) => {
    const {idUsuario} = req.params;
    const sql = "DELETE FROM publicacion WHERE idUsuario = ?";
    db.query(sql,[idUsuario], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La publicacion a borrar no existe"});
        };
        res.json({mesaje: "Comenario Eliminado"});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allComments, 
    showComments,
    storeComments,
    updateComments,
    destroyComments
};