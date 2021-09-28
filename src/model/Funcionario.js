const mongoose = require('mongoose')

const FuncionarioSchema = mongoose.Schema({
    nome: {type: String},
    idade: {type: String},
    genero: {type: String},
    profissao: {type: String},
    status : {type: String, enum:['ativo', 'inativo'], default: 'ativo'}
},{timestamps:true})

module.exports = mongoose.model('funcionario', FuncionarioSchema)