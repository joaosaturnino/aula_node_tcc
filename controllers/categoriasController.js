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
    },

    async update(request, response){
        try{
            // Paraetros passados via corpo da requisição 
            const {catNome, catIcone} = request.body;
            // Parametro passado via url na chamada da API pelo front end 
            const {catId} = request.params;
            // Instrução SQL para atualização
            const sql = "UPDATE categorias SET catNome = ?, catIcone = ? WHERE catId = ?;";
            // Definição de array com os parametros que receberam os valores do front-end
            const values = [catNome, catIcone, catId];
            // Executa a instrução no banco de dados
            const atualização = await db.query(sql, values);
            //
            return response.status(200).json({Confirma :"Sucesso", message: "Dados Atualizados"})
        } catch(error){
            return response.status(500).json({confirma: "Erro", message: error})
        }
    }

};