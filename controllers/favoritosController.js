//joaohenrique
const { json } = require("express");
const db = require("../database/connection");

function geraUrl(e) {
    const produto = {
        usu_id: e.usu_id,
        pro_id: e.pro_id,
        proNome: e.proNome,
        cat_Id: e.cat_Id,
        est_Id: e.est_Id,
        proImagem: 'http://10.67.23.146:3333/public/upload/produtos/' + e.proImagem,
        proAtualizacao: e.proAtualizacao,
        proPreco: e.proPreco,
        proDescricao: e.proDescricao,
        estNome: e.estNome,
        estTelefone: e.estTelefone,
        estEndereco: e.estEndereco,
        estWhatsapp: e.estWhatsapp,
        lnk_face: e.est_face,
        lnk_inst: e.lnk_inst,
        lnk_ifood: e.lnk_ifood,
        lnk_much: e.lnk_much,
        lnk_aiqfome: e.lnk_aiqfome,
        tamNome: e.tamNome
    }
    return produto;
}

module.exports = {
    async listarFavoritos(request, response) {
        try {
            const {usu_id} = request.params;

            const sql = ('SELECT pd.proId, pd.proNome, cat.catNome, pd.est_Id, pd.proImagem, pd.proPreco, pd.proDescricao, est.estNome, est.estTelefone, est.estEndereco, est.estWhatsapp, est.lnk_face, est.lnk_inst, est.lnk_ifood, est.lnk_much, est.lnk_aiqfome, tm.tamNome, fv.pro_id, fv.usu_id FROM Favoritos fv Inner join Produtos pd ON fv.pro_id = pd.proId INNER JOIN Tamanhos tm ON pd.tam_Id = tm.tamId INNER JOIN Categorias cat ON pd.cat_Id = cat.catId INNER JOIN Estabelecimentos est ON pd.est_Id = est.estId WHERE fv.usu_Id = ?;');
            const values = [usu_id];
            const favoritos = await db.query(sql, values);

            const resultado = favoritos[0].map(geraUrl);

            return response.status(200).json({confirma: 'Sucesso', nResults: favoritos[0].length, message: resultado});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
            const {usu_id, pro_id} = request.body;

            const sql = 'INSERT INTO FAVORITOS (usu_id, pro_id) VALUES (?, ?);';
            const values = [usu_id, pro_id];
            const confirmacao = await db.query(sql, values);
            const usuid = confirmacao[0].insertId;
            const proid = confirmacao[0].insertId;
            const dados = {usu_id, pro_id};
            return response.status(200).json({confirma: true, message: dados});
        }catch(error){
            return response.status(500).json({confirma: false, message: error});
        }
    },
    async update(request, response) {
        try {
            const { usu_id, pro_id, favAvaliacao, favFavorito } = request.body;

            const {usuId} = request.params;

            const sql = 'UPDATE USUARIOS SET usuNome = ?, usuEmail = ?, usuSenha = ?, usuTipo = ?, usuDocumento = ?, usuModeracao = ? WHERE usuId = ?;';

            const values = [usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao, usuId];

            const atualizacao = await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});

        }catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async delete(request, response) {
        try {
            const { usu_id, pro_id} = request.params;

            const sql = 'DELETE FROM favoritos WHERE usu_id = ? AND pro_id = ?';
            const values = [ usu_id, pro_id ];

            await db.query(sql, values);
            return response.status(200).json({confirma : true, message: 'Favorito com id ' + pro_id + ' excluída com sucesso'});
        }catch (error) {
            return response.status(500).json({confirma: false, message: error});
        } 
    },

    async verificarFavoritos(request, response) {
        try {
            const {usu_id, pro_id} = request.params;

            const sql = ('SELECT pd.proId, pd.proNome, cat.catNome, pd.est_Id, pd.proImagem, pd.proPreco, pd.proDescricao, est.estNome, est.estTelefone, est.estEndereco, est.estWhatsapp, est.lnk_face, est.lnk_inst, est.lnk_ifood, est.lnk_much, est.lnk_aiqfome, tm.tamNome, fv.pro_id, fv.usu_id FROM Favoritos fv Inner join Produtos pd ON fv.pro_id = pd.proId INNER JOIN Tamanhos tm ON pd.tam_Id = tm.tamId INNER JOIN Categorias cat ON pd.cat_Id = cat.catId INNER JOIN Estabelecimentos est ON pd.est_Id = est.estId WHERE fv.usu_Id = ? AND fv.pro_id = ?;');
            const values = [usu_id, pro_id];
            const favoritos = await db.query(sql, values);

            const resultado = favoritos[0].map(geraUrl);

            return response.status(200).json({confirma: true, nResults: favoritos[0].length, message: resultado});
        } catch (error) {
            return response.status(500).json({confirma: false, message: error});
        }
    },



};
