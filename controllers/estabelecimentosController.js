// Eduardo

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarEstabelecimentos(request, response) {
        try {
            const sql = 'SELECT e.estId, e.estNome, e.estEndereco, e.estLogo, u.usuNome, c.cidNome FROM estabelecimentos e INNER JOIN cidades c ON c.cidId = e.cid_Id INNER JOIN usuarios u ON u.usuId = e.usu_Id;';
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
            const {estNome, estEndereco, estLogo, usu_Id, cid_Id} = request.body;

            const sql = 'INSERT INTO estabelecimentos (estNome, estEndereco, estLogo, usu_Id, cid_Id) VALUES (?,?,?,?,?);' ;
            const values = [estNome, estEndereco, estLogo, usu_Id, cid_Id];
            const confirmacao = await db.query(sql, values);

            const estId = confirmacao[0].insertId;
            const dados = {id: estId, estNome, estEndereco, estLogo, cid_Id}
            return response.status(200).json({confirma: 'Sucesso', message: dados});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async update(request, response){
        try{
            const {estNome, estEndereco, estLogo, usu_Id, cid_Id} = request.body;

            // parametro passado via url na chamada da api pelo front-end
            const {estId} = request.params;
            const sql = 'UPDATE estabelecimentos SET estNome = ?, estEndereco = ?, estLogo = ?, usu_Id = ?, cid_Id = ? WHERE estId = ?';
            const values = [estNome, estEndereco, estLogo, usu_Id, cid_Id, estId];
            const atualizacao = await db.query(sql, values);
            // const estId = confirmacao[0].insertId;
            const dados = {estNome, estEndereco, estLogo, usu_Id, cid_Id}
            return response.status(200).json({confirma: 'Sucesso', message: dados});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async delete (request, response){
        try{
            const {estId} = request.params;

            const sql = 'DELETE FROM estabelecimentos WHERE estId = ?';
            const values = [estId];

            await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', message: 'Dados excluídos'});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async listarUnicoEstabelecimento(request, response) {
        try {
            const {estId} = request.params;
            const sql = 'SELECT estId, estNome, estEndereco, estLogo, usu_Id, cid_Id FROM estabelecimentos WHERE estId = ?;';
            const values = [estId];
            const estabelecimento = await db.query(sql,values);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: estabelecimento[0].length, message: estabelecimento[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};