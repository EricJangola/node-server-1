const express = require('express')
const { knex } = require('../database/index');
const { checkToken, isAdmin } = require('../middleware/auth');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let apiRouter = express.Router()

const endpoint = '/'

apiRouter.get(endpoint + 'musicas', checkToken, (req, res) => {
    knex.select('*').from('musicas')
        .then(produtos => res.status(200).json(produtos))
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao recuperar musicas - ' + err.message
            })
        })
})

apiRouter.get(endpoint + 'musicas/:id', checkToken, function (req, res) {
    // const product = lista_produtos.produtos.find(p => p.id == req.params.id)
    knex.select('*').from('musicas').where('id', '=', req.params.id)
        .then(produtos => res.status(200).json(produtos))
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao recuperar musica - ' + req.params.id + ' ' + err.message
            })
        })
})

apiRouter.put(endpoint + 'musicas/:id', checkToken, isAdmin, function (req, res) {
    knex('musicas').update(req.body.musica)
        .where('id', '=', req.params.id)
        .then(_ => res.status(201).json())
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao atualizar musica - ' + err.message
            })
        })
})

apiRouter.delete(endpoint + 'musicas/:id', checkToken, isAdmin, function (req, res) {
    knex('musicas').delete().where('id', '=', req.params.id)
        .then(_ => res.status(200).json())
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao deletar musica - ' + req.params.id + ' ' + err.message
            })
        })
})

apiRouter.post(endpoint + 'musicas', checkToken, isAdmin, function (req, res) {
    knex('musicas').insert(req.body.musica)
        .then(_ => res.status(201).json())
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao inserir musica - ' + err.message
            })
        })
})


apiRouter.post(endpoint + 'seguranca/register', (req, res) => {
    knex('usuario')
        .insert({
            nome: req.body.nome,
            login: req.body.login,
            senha: bcrypt.hashSync(req.body.senha, 8),
            email: req.body.email
        }, ['id'])
        .then((result) => {
            let usuario = result[0]
            res.status(200).json({ "id": usuario.id })
            return
        })
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao registrar usuario - ' + err.message
            })
        })
})

apiRouter.post(endpoint + 'seguranca/login', (req, res) => {
    knex
        .select('*').from('usuario').where({ login: req.body.login })
        .then(usuarios => {
            if (usuarios.length) {
                const usuario = usuarios[0]
                const checkSenha = bcrypt.compareSync(req.body.senha, usuario.senha)

                if (checkSenha) {
                    var tokenJWT = jwt.sign({ id: usuario.id },
                        process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })

                    res.status(200).json({
                        id: usuario.id,
                        login: usuario.login,
                        nome: usuario.nome,
                        roles: usuario.roles,
                        token: tokenJWT
                    })
                    return
                }
            }

            res.status(200).json({ message: 'Login ou senha incorretos' })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao verificar login - ' + err.message
            })
        })
})

module.exports = apiRouter; 