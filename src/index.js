const express = require('express')
require('dotenv').config() // Carregar as variáveis de ambiente
const InicializaMongoServer = require('./config/db')
const rotasFuncionario = require('./routes/Funcionario')

InicializaMongoServer() // Inicializamos o MongoDB

const cors = require('cors')
const app = express()

const PORT = process.env.PORT
app.use(express.json()) // Definimos que o backend fará o parse do JSON

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
})

// Definindo a primeira rota
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API 100% funcionando!😄😄',
        versao: '1.0.0'
    })
})

// Rotas do nosso app
app.use('/funcionarios', rotasFuncionario)

// Rota para tratar erros 404 (deve ser sempre a última rota)
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

// Carregando o servidor web
app.listen(PORT, (req, res) =>{
    console.log(`🚀 Servidor web rodando na porta ${PORT}`)
})