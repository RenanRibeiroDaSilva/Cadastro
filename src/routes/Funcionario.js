const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Funcionario = require('../model/Funcionario')
const validaFuncionario = [
    check("nome", "Nome do Funcionario é obrigatório").not().isEmpty(),
    check("idade", "Idade do Funcionario é obrigatório").not().isEmpty(),
    check("genero", "Genero do Funcionario é obrigatório").not().isEmpty(),
    check("profissao", "Profissão do Funcionario é obrigatório").not().isEmpty(),
    check("status","Informe um status válido para a categoria").isIn(['ativo', 'inativo'])
]

/****************************
 * Listar todas as categorias
 * GET / funcionarios
 ***************************/
router.get('/', async(req, res) => {
    try{
        const categorias = await Funcionario.find()
        res.json(categorias)
    } catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possivel obter as categorias'}]
        })
    }
})

/*************************************
 * Listar uma única categoria pelo ID
 * GET / funcionarios/:id
 ************************************/
router.get('/:id', async(req, res) => {
    try{
        const categoria = await Funcionario.find({"_id" : req.params.id})
        res.json(categoria)
    } catch (err){
        res.status(400).send({
            errors: [{message: `Não foi possivel obter a categoria com o id ${req.params.id}`}]
        })
    }
})

/****************************
 * Inclui uma nova categoria
 * POST / funcionarios
 ***************************/
router.post('/', validaFuncionario, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try{
        let categoria = new Funcionario(req.body)
        await categoria.save()
        res.send(categoria)
    } catch (err){
        return res.status(400).json({
            errors: [{message: `Erro ao salvar a categoria ${err.message}`}]
        })
    }
})

/*****************************
 * Apaga uma categoria pelo id
 * DELETE / funcionarios
 ****************************/
router.delete('/:id', async(req, res) => {
    await Funcionario.findByIdAndRemove(req.params.id)
    .then(funcionarios => {
        res.send({message: `Funcionario ${funcionarios.nome} removido com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: 'Não foi possível excluir o funcionario'}]
        })
    })
})


/************************************
 * Altera uma categoria já existente
 * PUT / funcionarios
 ***********************************/
router.put('/', validaFuncionario, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Funcionario.findByIdAndUpdate(req.body._id, {$set: dados})
    .then(funcionarios => {
        res.send({ message: `Funcionario ${funcionarios.nome} alterado com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: 'Não foi possivel alterar o funcionario informado'}]
        })
    })
})

module.exports = router