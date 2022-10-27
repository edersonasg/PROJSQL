const sql = require('mssql/msnodesqlv8')
const { config } = require('./base/credenciais')

async function consulta() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from USUARIOS");
        return products.recordsets;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    consulta: consulta,
}