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

    async create(request, response) {
        try {
            const { lnkId, lnkDescricao, lnkLink, lnkIcone, est_Id } = request.body;

            const sql = 'INSERT INTO links (lnkDescricao, lnkLink, lnkIcone, est_Id) VALUES (?, ?, ?, ?)';
            const values = [lnkDescricao, lnkLink, lnkIcone, est_Id];
            const confirmacao = await db.query(sql, values);
            const link_id = confirmacao[0].insertId;
        
            return response.status(200).json({confirma: 'Sucesso', message: link_id});            
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});            
        }        
    },    

    async update(request, response) {
        try {
            const { lnkDescricao, lnkLink, lnkIcone, est_Id } = request.body;
            const { lnkId } = request.params;

            const sql = 'UPDATE links SET lnkDescricao = ?, lnkLink = ?, lnkIcone = ?, est_Id = ? WHERE lnkId = ?';
            const values = [lnkDescricao, lnkLink, lnkIcone, est_Id, lnkId];
            const atualizacao = await db.query(sql, values);
        
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});            
        }        
    },
    
    async listarLink(request, response) {
        try {
            const { lnkId } = request.params;
            const sql = 'SELECT lnkId, lnkDescricao, lnkLink, lnkIcone, est_Id FROM links WHERE lnkId = ?;';
            const values = [lnkId];
            const link = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', message: link[0]});
        }catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});            
        }
    },
};
