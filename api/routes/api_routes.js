const express = require ('express') 
const { knex } = require('./database/index');

let apiRouter = express.Router() 
 
const endpoint = '/' 
 
apiRouter.get(endpoint + 'musicas', (req, res) => { 
    knex.select('*').from('musicas') 
    .then( produtos => res.status(200).json(produtos) ) 
    .catch(err => { 
        res.status(500).json({  
           message: 'Erro ao recuperar musicas - ' + err.message }) 
    })   
}) 

apiRouter.get (endpoint + 'musicas/:id', function (req, res) { 
    // const product = lista_produtos.produtos.find(p => p.id == req.params.id)
    knex.select('*').from('musicas').where('id', '=', req.params.id) 
    .then( produtos => res.status(200).json(produtos) ) 
    .catch(err => { 
        res.status(500).json({  
           message: 'Erro ao recuperar musica - '+ req.params.id + ' ' + err.message }) 
    })   
}) 

apiRouter.put (endpoint + 'musicas/:id', function (req, res) { 
    knex('musicas').update(req.body.musica)
    .where('id', '=', req.params.id)
    .then( _ => res.status(201).json() ) 
    .catch(err => { 
        res.status(500).json({  
           message: 'Erro ao atualizar musica - '+ err.message }) 
    })
}) 

apiRouter.delete (endpoint + 'musicas/:id', function (req, res) { 
    knex('musicas').delete().where('id', '=', req.params.id) 
    .then( _ => res.status(200).json() ) 
    .catch(err => { 
        res.status(500).json({  
           message: 'Erro ao deletar musica - '+ req.params.id + ' ' + err.message }) 
    })   
}) 

apiRouter.post (endpoint + 'musicas', function (req, res) { 
    knex('musicas').insert(req.body.musica)
    .then( _ => res.status(201).json() ) 
    .catch(err => { 
        res.status(500).json({  
           message: 'Erro ao inserir musica - '+ err.message }) 
    })
}) 


module.exports = apiRouter; 