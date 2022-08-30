// João G

const { json, response } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarCategorias(request, response) {
        try {
            const sql = 'SELECT catId, catNome, catIcone FROM categorias;';
            const categorias = await db.query(sql);
            
            return response.status(200).json({confirma: 'Sucesso', nResults: categorias[0].length, message: categorias[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response){
        try{
            const {catNome, catIcone} = request.body;

            const sql = 'INSERT INTO categorias (catNome, catIcone) VALUES (?, ?)';
            const values = [catNome, catIcone];
            const confirmacao = await db.query(sql, values);

            const idInst = confirmacao[0].insertId

            return response.status(200).json({confirma: 'sucesso', message: idInst})
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error})
        }
    }
};