const express = require('express'); //Importacao
const app = express();
const bodyParser = require('body-parser');

//Teste
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

//Database
connection
    .authenticate().then(() => {
        console.log('Conexão realizado com sucesso!');
    })
    .catch((msgErro) => {
        console.log('Erro de conexão! Erro.: ' + msgErro);
    })

//Estou dizendo para o Express utilizar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public')); //Aceita arquivos estaticos, como: css, js, imagens ...

//BodyParser
app.use(bodyParser.urlencoded({extended: false})) // Permite que a pessoa envie o formulario e esses dados sao convertidos em uma estrutura JS para usar no BackEnd
app.use(bodyParser.json()); //Converte os dados da API para Json

//Rotas
//HOME
app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true, //Traz somente os dados cadastrados
        order:[['id', 'DESC']] //Ordenacao decrescente
    }).then((perguntas => {
        res.render("index", {
            perguntas: perguntas //Envia os dados para o FrontEnd
        });
    }));
})

//CRIAR PERGUNTA
app.get('/perguntar', (req, res) => {
    res.render("perguntar");
});

//SALVAR PERGUNTA
//*** O BodyParser disponibiliza voce conseguir chamar os atributos pelo body. Ex.: req.body.titulo;
app.post('/savarpergunta', (req, res) => {
    //Pega os dados pelo atributo 'name'
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta
    .create({
        titulo: titulo,
        descricao: descricao
    })
    .then(() => {
        res.redirect('/');
    });

})

//RESPONDER PERGUNTA
app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;

    //Busca no banco
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {

        //Se encontrar
        if(pergunta != undefined){

            //Trás todas as respostas
            Resposta
            .findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            })
            .then((respostas) => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }
        else{
            res.redirect('/');
        }
    });
})

//SALVAR RESPOSTA DA PERGUNTA
app.post('/responder', (req, res) => {
    var nome = req.body.nome;
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        nome: nome,
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    });
})

app.listen(5050, () => {
    console.log('App rodando');
});
