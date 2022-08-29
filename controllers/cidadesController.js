const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarCidades(request, response) {
        try {
            const sql = 'SELECT cidId, cidNome, ufSigla FROM cidades;';
            const cidades = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: cidades[0].length, message: cidades[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};