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
};