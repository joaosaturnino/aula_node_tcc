const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = 'SELECT usuId, usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao FROM usuarios;';
            const usuarios = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].length, message: usuarios[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response){
        try{
            const {usuNome, usuDocumento, usuEmail, usuSenha} = request.body

            const sql = 'INSERT INTO usuarios (usuNome, usuDocumento, usuEmail, usuSenha) VALUES (?, ?, ?, ?);'
            const values = [usuNome, usuDocumento, usuEmail, usuSenha]
            const confirmacao = await db.query(sql, values);
            
            const idInst = confirmacao[0].insertId

            const dados = {nome: usuNome, CPF: usuDocumento, Email: usuEmail, Senha: usuSenha}

            return response.status(200).json({confirma: 'sucesso',Info: dados, message: idInst})
    } catch(err){
            return response.status(500).json({confirma: 'Erro', message: err})
    }
    },

    async update(request, response){
                try{

                    const {usuNome} = request.body;

                    const {usuId} = request.params;

                    const sql = "UPDATE usuarios SET usuNome = ? WHERE usuId = ?;";

                    const values = [usuNome, usuId];

                    const atualização = await db.query(sql, values);
 
                    return response.status(200).json({Confirma :"Sucesso", message: "Dados Atualizados"})
                } catch(error){
                    return response.status(500).json({confirma: "Erro", message: error})
                }
    }
}
