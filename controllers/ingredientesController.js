// Eduardo

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarIngredientes(request, response) {
        try {
            const sql = 'SELECT igtId, igtNome FROM ingredientes;';
            const ingredientes = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: ingredientes[0].length, message: ingredientes[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};