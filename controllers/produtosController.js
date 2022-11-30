// João Guilherme

const { json } = require("express");
const db = require("../database/connection");

function geraUrl(e) {
    const produto = {
        proId: e.proId,
        proNome: e.proNome,
        cat_Id: e.cat_Id,
        catNome: e.catNome,
        est_Id: e.est_Id,
        proImagem: 'http://10.67.23.176:3333/public/upload/produtos/' + e.proImagem,
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
        tamNome: e.tamNome,
    }
    return produto;
}

module.exports = {
    async listarProdutos(request, response) {
        try {
            const { page = 1, limit = 20 } = request.query;
            const inicio = (page - 1) * limit;

            const { proNome = '%%' } = request.body;
            const { cat_Id = '%%' } = request.body;
            const { est_Id = "%%" } = request.body;
            const { proDescricao = "%%" } = request.body;


            const proNomeProd = proNome === '%%' ? '%%' : '%' + proNome + '%';
            const categoria = cat_Id == 0 ? '%%' : cat_Id

            const sqlCount = ('SELECT COUNT(*) AS countProd FROM produtos WHERE proNome LIKE ? AND cat_Id LIKE ? AND est_Id LIKE ?;');
            const valuesCount = [proNomeProd, categoria, est_Id, proDescricao];
            const n_prod = await db.query(sqlCount, valuesCount);

            const sql = ('SELECT pd.proId, pd.proNome, cat.catNome, pd.est_Id, pd.proImagem, pd.proPreco, pd.proDescricao, est.estNome, est.estTelefone, est.estWhatsapp, est.lnk_face, est.lnk_inst, est.lnk_ifood, est.lnk_much, est.lnk_aiqfome, tm.tamNome FROM produtos pd Inner join Categorias cat ON cat_Id = cat.catId INNER JOIN Estabelecimentos est ON est_Id = est.estId INNER JOIN Tamanhos tm ON pd.tam_Id = tm.tamId Where proNome LIKE ? AND cat_Id LIKE ? AND est_Id LIKE ? AND proDescricao LIKE ? ORDER BY proPreco LIMIT ?, ?;');

            const values = [proNomeProd, categoria, est_Id, proDescricao, parseInt(inicio), parseInt(limit)];
            const produtos = await db.query(sql, values);

            const sqlT = 'SELECT proId, proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao FROM produtos WHERE proNome LIKE ?;';
            const valuesCountT = [proNome];
            const produtosT = await db.query(sqlT, valuesCountT);

            const resultado = produtos[0].map(geraUrl);

            response.header('X-Total-Count', n_prod[0][0].countProd);

            return response.status(200).json({ confirma: 'Sucesso', nResults: produtos[0].length, Total: produtosT[0].length, message: resultado });
        } catch (error) {
            return response.status(500).json({ confirma: 'Erro', message: error });
        }
    },

    async create(request, response) {
        try {
            const { proNome, cat_Id, est_Id, proAtualizacao, proImagem, proDescricao } = request.body;
            const img = request.file.filename;
            const sql = 'INSERT INTO produtos (proNome, cat_Id, est_Id, proImagem, proAtualizacao, proDescricao) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [proNome, parseFloat(cat_Id), parseFloat(est_Id), img, proAtualizacao, proDescricao];
            const confirmacao = await db.query(sql, values);

            const idInst = confirmacao[0].insertId

            const dados = { nome: proNome, categoria: cat_Id, Estabelecimento: est_Id, Imagem: proImagem, Atualizado: proAtualizacao, Descrição: proDescricao }

            return response.status(200).json({ confirma: 'sucesso', Info: dados, message: idInst })
        } catch (error) {
            return response.status(500).json({ confirma: 'Erro', message: error })
        }
    },
        async listarAleatorio(request, response) {
        try {
            const sql = 'SELECT pd.proId, pd.proNome, cat.catNome, pd.est_Id, pd.proImagem, pd.proPreco, pd.proDescricao, est.estNome, est.estTelefone, est.estWhatsapp, est.lnk_face, est.lnk_inst, est.lnk_ifood, est.lnk_much, est.lnk_aiqfome, tm.tamNome FROM produtos pd Inner join Categorias cat ON cat_Id = cat.catId INNER JOIN Estabelecimentos est ON est_Id = est.estId INNER JOIN Tamanhos tm ON pd.tam_Id = tm.tamId ORDER BY RAND() LIMIT 10';
            const produtos = await db.query(sql);

            const resultado = produtos[0].map(geraUrl);

            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: resultado});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },


}







