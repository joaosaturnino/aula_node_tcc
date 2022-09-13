// João Guilherme

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarProdIng(request, response) {
        try {
            const sql = 'SELECT pro_id, igt_id FROM prod_ing;';
            const proding = await db.query(sql);
            //console.log('tam: ' + usuarios[0].length);
            //return response.status(200).json(usuarios[0]);
            return response.status(200).json({confirma: 'Sucesso', nResults: proding[0].length, message: proding[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
    
            const { prod_ing } = request.body;
            //console.log(prod_ing);
             let posicoes = []; 
            prod_ing.forEach((pos, i) => {
                //console.log(pos.pro_id, pos.igt_id); 
                posicoes.push([pos.pro_id, pos.igt_id]); 
            });
    
            const sql = 'INSERT INTO prod_ing (pro_id, igt_id) VALUES ?'; 
    
            const confirmacao = await db.query(sql, [posicoes]);
    
            //console.log(confirmacao[0].insertId);
            return response.status(200).json({confirma: 'Itens adicionados com sucesso!'});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    },
    async update(request, response){
        try{
            // Paraetros passados via corpo da requisição 
            const {igt_id} = request.body;
            // Parametro passado via url na chamada da API pelo front end 
            const {pro_id} = request.params;
            // Instrução SQL para atualização
            const sql = "UPDATE prod_ing SET ig_id = ? WHERE pro_id = ?;";
            // Definição de array com os parametros que receberam os valores do front-end
            const values = [igt_id, pro_id];
            // Executa a instrução no banco de dados
            const atualização = await db.query(sql, values);
            //
            return response.status(200).json({Confirma :"Sucesso", message: "Dados Atualizados"})
        } catch(error){
            return response.status(500).json({confirma: "Erro", message: error})
        }
    },

    async delete(request, response){
        try{

            const { pro_id } = request.params;

            const sql = "DELETE FROM prod_ing WHERE pro_id = ?";

            const values = [pro_id];
            
            await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', message: 'Produto ' + pro_id + ' excluída com sucesso'})
        }catch(error){
            return response.status(500).json({confirma:'Erro', message: error})
        }
    },

};
