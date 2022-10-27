const express = require('express')
const app = express();
const port = 8000;
const router = express.Router();
const bodyparser = require('body-parser');
app.use(bodyparser.json())
app.use('/api', router);

//CONFIGURANDO EJS
app.set('view engine', 'ejs')

//CONFIGURANDO ARQUIVOS ESTATICOS
app.use(express.static('public'))


app.get('/', (req, res) => {
    return res.render("index")
});
app.get('/usuarios', (req, res) => {
    return res.render("usuarios")
});
app.get('/cadastro', (req, res) => {
    return res.render("cadastro")
});

router.use((request, response, next) => {
    console.log('middleware');
    next();
})


//ROTA DA API
//app.use('/usersAPI', usuarioRoute);

//chamando rota usuario
const usuarioRoute = require('./database');

router.route('/usersAPI').get((request, response) => {

    usuarioRoute.consulta().then(result => {
        response.json(result[0]);
    })

})

const usuarioInserir = require('./inserir');

router.route('/usersInserir').post(async(req, res) => {
    try {
        /*console.log(req.body);
        const cadastro = await usuarioInserir(req.body);
        console.log(cadastro);
        return res.send(cadastro);*/
        const sql = require('mssql/msnodesqlv8')

        const { config } = require('./base/credenciais')
        console.log(req.body);

        sql.connect(config, function(err) {
            if (err) throw err;
            console.log("Connected!");
            var data = "INSERT INTO USUARIOS (nome_usuario, idade_usuario, email_usuario) VALUES ('" + req.body.nome + "', " + req.body.idade + ", '" + req.body.email + "')";
            sql.query(data, function(err, result) {
                if (err) throw err;
                console.log("DADOS GRAVADOS COM SUCESSO!");
            });

        });
    } catch (error) {

        return res.status(500).json({ mensagem: "Usuario não cadastrado" });
    }

})



//LOG
app.listen(port, () => (
    console.log('Servidor iniciado')
));