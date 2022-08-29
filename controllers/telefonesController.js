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
};