const express = require ('express') 

let apiRouter = express.Router() 
 
const endpoint = '/' 
const lista_produtos = { 
    produtos: [ 
        { id: 1, descricao: "Produto 1", valor: 5.00, marca: "marca "  }, 
        { id: 2, descricao: "Produto 2", valor: 5.00, marca: "marca "  }, 
        { id: 3, descricao: "Produto 3", valor: 5.00, marca: "marca "  }, 
    ] 
} 
 
apiRouter.get (endpoint + 'produtos', function (req, res) { 
    res.status(200).json (lista_produtos) 
}) 

apiRouter.get (endpoint + 'produtos/:id', function (req, res) { 
    const product = lista_produtos.produtos.find(p => p.id == req.params.id)
    if (!product) {
        return res.status(404).json();    
    }
    res.status(200).json (product) 
}) 

apiRouter.put (endpoint + 'produtos/:id', function (req, res) { 
    const product = req.body;
    const id = req.params.id;

    const old_product = lista_produtos.produtos.find(p => p.id == req.params.id)
    const index = lista_produtos.produtos.indexOf(old_product);

    lista_produtos.produtos[index] = {...product, id } ;

    res.status(200).json (product) 
}) 

apiRouter.delete (endpoint + 'produtos/:id', function (req, res) { 
    const old_product = lista_produtos.produtos.find(p => p.id == req.params.id)
    const index = lista_produtos.produtos.indexOf(old_product);

    if (index > -1) { 
        lista_produtos.produtos.splice(index, 1);
      }

    res.status(204).json () 
}) 

apiRouter.post (endpoint + 'produtos', function (req, res) { 
    const product = req.body;
    const id = lista_produtos.produtos.length + 1;
    lista_produtos.produtos.push({ ...product, id });
    res.status(200).json (lista_produtos) 
}) 


module.exports = apiRouter; 