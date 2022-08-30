// João Guilherme

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarProdIng(request, response) {
        try {
            const sql = 'SELECT pro_id, igtId FROM prod_ing;';
            const proding = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: proding[0].length, message: proding[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response){
        try{
            const {pro_id, igtId} = request.body;

            const sql = 'INSERT INTO prod_ing (pro_id, igtId) VALUES (?, ?)';
            const values = [pro_id, igtId];
            const confirmacao = await db.query(sql, values);

            const idInst = confirmacao[0].insertId

            return response.status(200).json({confirma: 'sucesso', message: idInst})
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error})
        }
    }
};
