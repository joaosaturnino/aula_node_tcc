//joaohenrique
const { json } = require("express");
const db = require("../database/connection");
const bcrypt = require("bcrypt");

module.exports = {
    /*async listarUsuarios(request, response) {
        try {
            const sql = 'SELECT usuId, usuNome, usuEmail, usuSenha, usuTipo, usuDocumento, usuModeracao FROM usuarios;';
            const usuarios = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].length, message: usuarios[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },*/
    async create(request, response) {
        try {
            const { nome, senha, email, documento } = request.body;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);

            const sql = 'INSERT INTO USUARIOS (usuNome, usuSenha, usuEmail, usuDocumento) VALUES (?, ?, ?, ?);';
            const values = [nome, hash, email, documento];
            const confirmacao = await db.query(sql, values);
            const usuId = confirmacao[0].insertId;
            const dados = { id: usuId, nome: nome, senha: senha, email: email, documento: documento };
            return response.status(200).json({ confirma: true, message: dados });
        } catch (error) {
            return response.status(500).json({ confirma: false, message: error });
        }
    },
    async session(request, response) {
        try {
            const { login, senha } = request.body;

            const sql = 'SELECT usuId, usuNome, usuEmail, usuSenha, usuDocumento FROM usuarios WHERE usuEmail = ?;';
            const values = [login];
            const usuario = await db.query(sql, values);

            if (usuario[0].length === 0) {
                return response.status(200).json({ confirma: false, message: 'E-mail não existe!' });
            }

            let logar = bcrypt.compareSync(senha, usuario[0][0].usuSenha);
            if (logar == true) {
                return response.status(200).json({ confirma: true, Id: usuario[0][0].usuId, nome: usuario[0][0].usuNome, email: usuario[0][0].usuEmail });
            } else {
                return response.status(200).json({ confirma: false, message: 'A senha não corresponde!' });
            }
        } catch (error) {
            return response.status(500).json({ confirma: 'Erro', message: error });
        }
    },
    async update(request, response) {
        try {
            //parametros passados via corpo requiseção
            const { nome, email} = request.body;
            //parametros passado via url na chamada da api pelo front end
            const { usuId } = request.params;
            //instrução sql para atualização
            const sql = 'UPDATE USUARIOS SET usuNome = ?, usuEmail = ? WHERE usuId = ?;';
            //definição de array com os parametros que receberam os valores do front-end
            const values = [nome, email, usuId];
            //executa a instrução de atualização no banco de dados
            const atualizacao = await db.query(sql, values);
            //mensagem de retorno no formato json
            return response.status(200).json({ confirma: true, message: 'Dados Atualizados' });

        } catch (error) {
            return response.status(500).json({ confirma: false, message: error });
        }
    },
    async delete(request, response) {
        try {
            //parametro passado via url na chamada da api pelo front-end
            const { usuId } = request.params;
            //const usuId = request.headers.authorization; // controle de acesso para execucao das funcoes

            //comando de exclusao
            const sql = 'DELETE FROM usuarios WHERE usuId = ?';
            //definicao de array com os parametros que receberem os valores do front-end
            const values = [usuId];
            //executa a instrucao de exclusao no banco de dados
            await db.query(sql, values);
            //mensagem de retorno no formato json;
            return response.status(200).json({ confirma: 'Sucesso', message: 'Mesa com id ' + usuId + ' excluída com sucesso' });
        } catch (error) {
            return response.status(500).json({ confirma: 'Erro', message: error });
        }

    },
    async listarUsuarios(request, response) {
        try {
            const { usuId } = request.params;
            const sql = 'SELECT usuId, usuNome, usuEmail, usuSenha, usuDocumento FROM usuarios WHERE usuId = ?;';
            const values = [usuId]
            //const values = [usuId];
            const usuario = await db.query(sql, values);
            return response.status(200).json({ confirma: true, message: usuario[0][0] });
        } catch (error) {
            return response.status(500).json({ confirma: false, message: error });
        }
    },




};
