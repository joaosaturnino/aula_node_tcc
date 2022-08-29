// Eduardo

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarEstabelecimentos(request, response) {
        try {
            const sql = 'SELECT estId, estNome, estEndereco, estLogo, usu_Id, cid_Id FROM estabelecimentos;';
            const estabelecimentos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: estabelecimentos[0].length, message: estabelecimentos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};