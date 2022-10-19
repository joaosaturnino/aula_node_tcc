// Eduardo

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarEstabelecimentos(request, response) {
        try {
            const sql = 'SELECT estId, estNome, estDocumento, estEndereco, estTelefone, estWhatsapp, estLogo, estEmail, estSenha, cid_Id FROM estabelecimentos;';
            const estabelecimentos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: estabelecimentos[0].length, message: estabelecimentos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response){
        try{
            const {estNome,estDocumento, estEndereco, estTelefone, estWhatsapp, estLogo, usu_Id, cid_Id} = request.body

            const sql = 'INSERT INTO estabelecimentos (estNome,estDocumento, estEndereco, estTelefone, estWhatsapp, estLogo, estEmail, estSenha, cid_Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
            const values = [estId, estNome,estDocumento, estEndereco, estTelefone, estWhatsapp, estLogo, usu_Id, cid_Id]
            const confirmacao = await db.query(sql, values);
            
            const idInst = confirmacao[0].insertId

            const dados = {nome: estNome, CNPJ: estDocumento, Endereco: estEndereco, Senha: usuSenha}

            return response.status(200).json({confirma: 'sucesso',Info: dados, message: idInst})
    } catch(err){
            return response.status(500).json({confirma: 'Erro', message: err})
    }
    }
};
