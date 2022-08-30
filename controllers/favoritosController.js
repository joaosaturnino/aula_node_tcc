//joaohenrique
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarFavoritos(request, response) {
        try {
            const sql = 'SELECT usu_id, pro_id FROM favoritos;';
            const favoritos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: favoritos[0].length, message: favoritos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
            const {usu_id, pro_id } = request.body;

            const sql = 'INSERT INTO FAVORITOS (usu_id, pro_id) VALUES (?, ?);';
            const values = [usu_id, pro_id];
            const confirmacao = await db.query(sql, values);
            const usuid = confirmacao[0].insertId;
            const proid = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: usuid});
            return response.status(200).json({confirma: 'Sucesso', message: proid});
        }catch(error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};