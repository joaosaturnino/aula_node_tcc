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
        proImagem: 'http://10.67.23.132:3333/public/upload/produtos/' + e.proImagem,
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


            // const sqlCount = ('SELECT COUNT(*) AS pro_id FROM favoritos WHERE usu_id like ? AND pro_id like ?;');
            // const valuesCont = [nomeProd, usu_id, pro_id];
            // const n_fav = await db.query(sqlCount, valuesCont);

            const sql = ('SELECT pd.proId, pd.proNome, cat.catNome, pd.est_Id, pd.proImagem, pd.proPreco, pd.proDescricao, est.estNome, est.estTelefone, est.estEndereco, est.estWhatsapp, est.lnk_face, est.lnk_inst, est.lnk_ifood, est.lnk_much, est.lnk_aiqfome, tm.tamNome, fv.pro_id, fv.usu_id FROM Favoritos fv Inner join Produtos pd ON fv.pro_id = pd.proId INNER JOIN Tamanhos tm ON pd.tam_Id = tm.tamId INNER JOIN Categorias cat ON pd.cat_Id = cat.catId INNER JOIN Estabelecimentos est ON pd.est_Id = est.estId WHERE fv.usu_Id = ?;');
            const values = [usu_id];
            const favoritos = await db.query(sql, values);

            const resultado = favoritos[0].map(geraUrl);

            return response.status(200).json({confirma: 'Sucesso', nResults: favoritos[0].length, message: resultado});
            /*const sql = 'SELECT usu_id, pro_id, favAvaliacao, favFavorito FROM favoritos;';
            const favoritos = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: favoritos[0].length, message: favoritos[0]});*/
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
            const {usu_id, pro_id, favAvaliacao, favFavorito } = request.body;

            const sql = 'INSERT INTO FAVORITOS (usu_id, pro_id, favAvaliacao, favFavorito) VALUES (?, ?, ?, ?);';
            const values = [usu_id, pro_id, favAvaliacao, favFavorito];
            const confirmacao = await db.query(sql, values);
            const usuid = confirmacao[0].insertId;
            const proid = confirmacao[0].insertId;
            const dados = {usu_id, pro_id, favAvaliacao, favFavorito};
            return response.status(200).json({confirma: 'Sucesso', message: dados});
            //return response.status(200).json({confirma: 'Sucesso', message: proid});
        }catch(error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async update(request, response) {
        try {
                //parametros passados via corpo requiseção
            const { usu_id, pro_id, favAvaliacao, favFavorito } = request.body;
                //parametros passado via url na chamada da api pelo front end
            const {usuId} = request.params;
                //instrução sql para atualização
            const sql = 'UPDATE USUARIOS SET usuNome = ?, usuEmail = ?, usuSenha = ?, usuTipo = ?, usuDocumento = ?, usuModeracao = ? WHERE usuId = ?;';
                //definição de array com os parametros que receberam os valores do front-end
            const values = [usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao, usuId];
                //executa a instrução de atualização no banco de dados
            const atualizacao = await db.query(sql, values);
                //mensagem de retorno no formato json
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});

        }catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async delete(request, response) {
        try {
            //parametro passado via url na chamada da api pelo front-end
            const { usu_id, pro_id} = request.params;
            //const { pro_id } = request.params;
            //const usuId = request.headers.authorization; // controle de acesso para execucao das funcoes

            //comando de exclusao
            const sql = 'DELETE FROM favoritos WHERE usu_id = ? AND pro_id = ?';
            //definicao de array com os parametros que receberem os valores do front-end
            const values = [ usu_id, pro_id ];
            //const values = [ pro_id];
            //executa a instrucao de exclusao no banco de dados
            await db.query(sql, values);
            //mensagem de retorno no formato json;
            return response.status(200).json({confirma : 'Sucesso', message: 'Favorito com id ' + usu_id + ' excluída com sucesso'});
        }catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        } 
    },



};
