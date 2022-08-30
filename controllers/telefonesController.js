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
            const {estNome, estEndereco, estLogo, usu_Id, cid_Id} = request.body;

            const sql = 'INSERT INTO telefones (telId, telEstabelecimento, est_Id, telObservacao) VALUES (?,?,?,?)';
            const values = [telId, telEstabelecimento, est_Id, telObservacao];
            const confirmacao = await db.query(sql, values);

            const estId = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: estId});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }

    },
};