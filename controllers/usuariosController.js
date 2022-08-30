//joaohenrique
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = 'SELECT usuId, usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao FROM usuarios;';
            const usuarios = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].length, message: usuarios[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
            const {usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao } = request.body;

            const sql = 'INSERT INTO USUARIOS (usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao) VALUES (?, ?, ?, ?, ?, ?);';
            const values = [usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao];
            const confirmacao = await db.query(sql, values);
            const usuId = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: usuId});
        }catch(error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async update(request, response) {
        try {
                //parametros passados via corpo requiseção
            const { usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao } = request.body;
                //parametros passado via url na chamada da api pelo front end
            const {usuId} = request.params;
                //instrução sql para atualização
            const sql = 'UPDATE USUARIOS SET usuNome = ?, usuEmail = ?, usuSenha = ?, usuTipo = ?, usuDocumento = ?, usuModeracao = ? WHERE usuId = ?;';
                //definição de array com os parametros que receberam os valores do front-end
            const values = [usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao, usuId];
                //executa a instrução de atualização no banco de dados
            const atualizacao = await db.query(sql, values);
                //mensagem de retorno no formato json
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});

        }catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};