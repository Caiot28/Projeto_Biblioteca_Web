const Livro = require('../models/livroModels');

function getIndexView(req, res){
    res.render('index.html');
}

function getCadastroLivroView(req, res){
    res.render('cadastro.html');
}

function getListarView(req, res){
    res.render('listagem_livros.html');
}

function postCadastrarLivro(req, res){
    let dados_livro = req.body;
    let campos_invalidos = validarCadastroLivro(dados_livro);

    if(campos_invalidos.length == 0){
        Livro.create(dados_livro).then(()=>{
            res.redirect('/listar');
        });
    }
    else{
        res.render('cadastro.html', {campos_invalidos, dados_livro});
    }
}

function validarCadastroLivro(dados_livro){
    let campos_invalidos = []
    
    if(dados_livro.titulo.length == 0){
        form_invalido = true;
        campos_invalidos.push("Titulo");
    }
    if(dados_livro.isbn.length == 0){
        form_invalido = true;
        campos_invalidos.push("ISBN");
    }
    if(dados_livro.autor.length == 0){
        form_invalido = true;
        campos_invalidos.push("Autor");
    }
    if(dados_livro.editora.length == 0){
        form_invalido = true;
        campos_invalidos.push("Editora");
    }
    if(dados_livro.ano.length == 0){
        form_invalido = true;
        campos_invalidos.push("Ano");
    }
    if(dados_livro.genero.length == 0){
        form_invalido = true;
        campos_invalidos.push("Gênero");
    }
    if(dados_livro.qtd_estoque.length == 0){
        form_invalido = true;
        campos_invalidos.push("Quantidade no estoque");
    }

    return campos_invalidos
}

module.exports = {
    getIndexView,
    getCadastroLivroView,
    postCadastrarLivro,
    getListarView
}