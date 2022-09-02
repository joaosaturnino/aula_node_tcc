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
    async create(request, response){
        try{
            const {estNome, estEndereco, estLogo, usu_Id, cid_Id} = request.body;

            const sql = 'INSERT INTO estabelecimentos (estNome, estEndereco, estLogo, usu_Id, cid_Id) VALUES (?,?,?,?,?)' ;
            const values = [estNome, estEndereco, estLogo, usu_Id, cid_Id];
            const confirmacao = await db.query(sql, values);

            const estId = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: estId});
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

            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};