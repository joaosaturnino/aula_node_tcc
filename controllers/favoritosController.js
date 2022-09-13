//joaohenrique
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarFavoritos(request, response) {
        try {

            const {page = 1, limit = 20} = request.query;
            const inicio = (page -1) * limit;

            const {usu_id = '%%'} = request.body;
            const {pro_id = '%%'} = request.body;
            const {proNome = '%%'} = request.body;

            const nomeProd = proNome === '%%' ? '%%' : '%' + proNome + '%';

            const sqlCount = ('SELECT COUNT(*) AS pro_id FROM favoritos WHERE usu_id like ? AND pro_id like ?;');
            const valuesCont = [nomeProd, usu_id, pro_id];
            const n_fav = await db.query(sqlCount, valuesCont);

            const sqlCampos = ('SELECT fv.usu_id, fv.pro_id, fv.favAvaliacao, fv.favFavorito, pd.proNome FROM favoritos fv ');
            const sqlJoin = ('INNER JOIN produtos pd ON fv.pro_id = pd.proid ');
            const sqlFiltro = ('WHERE pd.proNome like ? AND fv.pro_id like ? LIMIT 0, 10;');
            const values = [nomeProd, pro_id, parseInt(inicio), parseInt(limit)];
            const favoritos = await db.query(sqlCampos + sqlJoin + sqlFiltro, values);

            response.header('X-Total-Count', n_fav[0][0].cont_fav);
            return response.status(200).json({confirma: 'Sucesso', nResults: favoritos[0].length, message: favoritos[0]});
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