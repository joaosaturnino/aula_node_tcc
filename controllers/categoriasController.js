const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarCategorias(request, response) {
        try {
            const sql = 'SELECT catId, catNome, catIcone FROM categorias;';
            const categorias = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: categorias[0].length, message: categorias[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};