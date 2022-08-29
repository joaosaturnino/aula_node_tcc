const mysql = require("mysql2/promise");

/*const bd_usuario = 's221_tcc_g1_us';
const bd_senha = 'delv220809';
const bd_servidor = '10.67.22.216';
const bd_porta = '3306';
const bd_banco = 's221_tcc_g1_bd';*/

const bd_usuario = 'root';
const bd_senha = '';
const bd_servidor = '127.0.0.1';
const bd_porta = '3306';
const bd_banco = 'busca_food';
let connection

const config = {
    host : bd_servidor,
    port : bd_porta, //Default: 3306
    user : bd_usuario,
    password: bd_senha,
    database : bd_banco,
    waitForConnections : true,
    ConnectionLimit : 10, // Default: 10 - deixar 100 ou 1000
    queueLimit : 0, // o numero maximo de solicitação de conexão que o pool enfileirara
}

try {
    connection = mysql.createPool(config);

    console.log('Chamou conexão Mysql');

} catch (error) {
    console.log(error);
}

module.exports = connection;