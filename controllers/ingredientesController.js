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
    async create(request, response){
        try{
            const {igtId, igtNome} = request.body;

            const sql = 'INSERT INTO ingredientes (igtId, igtNome) VALUES (?,?)';
            const values = [igtId, igtNome];
            const confirmacao = await db.query(sql, values);

            const ingtId = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: ingtId});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};