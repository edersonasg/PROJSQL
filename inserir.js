const sql = require('mssql/msnodesqlv8')

const { config } = require('./base/credenciais')

var nome = "Marco Roberto G";
var idade = 50;
var email = "marco@gmail.com";

function inserir() {
    sql.connect(config, function(err) {
        if (err) throw err;
        console.log("Connected!");
        var data = "INSERT INTO USUARIOS (nome_usuario, idade_usuario, email_usuario) VALUES ('" + nome + "', " + idade + ", '" + email + "')";
        sql.query(data, function(err, result) {
            if (err) throw err;
            console.log("DADOS GRAVADOS COM SUCESSO!");
        });

    });
}

module.exports = {
    inserir,
}