const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarLinks(request, response) {
        try {
            const sql = 'SELECT lnkId, lnkDescricao, lnkLink, lnkIcone, est_Id FROM links;';
            const links = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: links[0].length, message: links[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};