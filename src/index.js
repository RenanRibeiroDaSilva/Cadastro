const express = require('express')
const cors = require('cors')
require('dotenv').config() // Carregar as variáveis de ambiente
const InicializaMongoServer = require('./config/db')
const rotasFuncionario = require('./routes/Funcionario')

InicializaMongoServer() // Inicializamos o MongoDB

const app = express()

app.use(cors())

const PORT = process.env.PORT
app.use(express.json()) // Definimos que o backend fará o parse do JSON

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