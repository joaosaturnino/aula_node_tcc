const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarProdIng(request, response) {
        try {
            const sql = 'SELECT pro_id, igt_Id FROM prod_ing;';
            const proding = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: proding[0].length, message: proding[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};