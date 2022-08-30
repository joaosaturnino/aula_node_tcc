// Eduardo

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarTelefones(request, response) {
        try {
            const sql = 'SELECT telId, telEstabelecimento, est_Id, telObservacao FROM telefones;';
            const telefones = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: telefones[0].length, message: telefones[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response){
        try{
            // parametros passados via corpo da requisição
            const {telEstabelecimento, est_Id, telObservacao} = request.body;
            // instrução SQL para inserção
            const sql = 'INSERT INTO telefones (telEstabelecimento, est_Id, telObservacao) VALUES (?,?,?)';
            // definição de array com parametros que receberão os valores do front-end
            const values = [telEstabelecimento, est_Id, telObservacao];
            // executa a instrução de inserção no banco de dados
            const confirmacao = await db.query(sql, values);
            // Exibe o id do registro inserido
            const telId = confirmacao[0].insertId;
            // Mensagem de retorno no retorno JSON
            return response.status(200).json({confirma: 'Sucesso', message: telId});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }

    },
    async update(request, response){
        try{
            const {telEstabelecimento, est_Id, telObservacao} = request.body;

            // parametro passado via url na chamada da api pelo front-end
            const {telId} = request.params;
            const sql = 'UPDATE telefones SET telEstabelecimento = ?, est_Id = ?, telObservacao = ? WHERE telId = ?';
            const values = [telEstabelecimento, est_Id, telObservacao, telId];
            const atualizacao = await db.query(sql, values);
            // const estId = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};