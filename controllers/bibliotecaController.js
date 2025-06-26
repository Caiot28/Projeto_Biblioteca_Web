const Livro = require('../models/livroModels');
const { format, addMinutes } = require('date-fns');

function getIndexView(req, res) {
    res.render('index.html');
}

function getCadastroLivroView(req, res) {
    res.render('cadastro.html');
}

function getListarView(req, res) {
    Livro.findAll().then((livros) => {
        res.render('listagem_livros.html', { livros });
    })
}

async function postCadastrarLivro(req, res) {
    let dados_livro = req.body;
    let campos_invalidos = await validarCadastroLivro(dados_livro);

    if (campos_invalidos.length == 0) {
        Livro.create(dados_livro).then(() => {
            res.redirect('/listar');
        });
    }
    else {
        res.render('cadastro.html', { campos_invalidos, dados_livro });
    }
}

function getEditarLivro(req, res) {
    let isbn_livro = req.params.isbn;
    Livro.findOne({
        where: {
            isbn: isbn_livro
        }
    }).then((dados_livro) => {
        const data_offset = new Date().getTimezoneOffset();
        const ano_formatado = format(addMinutes(dados_livro.ano, data_offset + 10), 'yyyy-MM-dd');

        res.render('editar_livro.html', { dados_livro, ano_formatado });
    });

}

async function postEditarLivro(req, res) {
    let dados_livro = req.body;
    let campos_invalidos = await validarCadastroLivro(dados_livro);

    if (campos_invalidos.length == 0) {
        await Livro.findOne({
            where: {
                //isbn: dados_livro.isbn
                id: dados_livro.id
            }
        }).then((dados_cadastro) => {
            dados_cadastro.update(dados_livro).then(() => {
                res.redirect('/listar');
            });

        });
    }
    else {
        res.render('editar_livro.html', { campos_invalidos, dados_livro });
    }
}

function getExcluirLivro(req, res) {
    let isbn_livro = req.params.isbn;
    Livro.findOne({
        where: {
            isbn: isbn_livro
        }
    }).then((dados_livro) => {
        dados_livro.destroy().then(() => {
            res.redirect('/listar');
        });
    });
}

async function validarCadastroLivro(dados_livro) {
    let campos_invalidos = [];

    if (dados_livro.titulo.length == 0) {
        campos_invalidos.push("Título inválido! Não pode ser vazio.");
    }
    if (dados_livro.isbn.length == 0) {
        campos_invalidos.push("ISBN inválido! Não pode ser vazio.");
    }
    if (dados_livro.autor.length == 0) {
        campos_invalidos.push("Autor inválido! Não pode ser vazio.");
    }
    if (dados_livro.editora.length == 0) {
        campos_invalidos.push("Editora inválido! Não pode ser vazio.");
    }
    if (dados_livro.ano.length == 0) {
        campos_invalidos.push("Ano inválido! Não pode ser vazio.");
    }
    if (dados_livro.genero.length == 0) {
        campos_invalidos.push("Gênero inválido! Não pode ser vazio.");
    }
    if (dados_livro.qtd_estoque == null || dados_livro.qtd_estoque == undefined || dados_livro.qtd_estoque == '') {
        campos_invalidos.push("Quantidade no estoque inválido! Não pode ser vazio.");
    }
    if (dados_livro.isbn.length > 0) {
        try {
            const livroExistente = await Livro.findOne({
                where: {
                    isbn: dados_livro.isbn
                }
            });

            if (livroExistente) {
                if (dados_livro.id != livroExistente.id) {
                    campos_invalidos.push("ISBN já cadastrado");
                }
            }
        } catch (error) {
            console.error("Erro ao verificar ISBN no banco de dados:", error);
            campos_invalidos.push("Erro na validação do ISBN");
        }
    }

    return campos_invalidos;
}

async function buscarPorIsbn(req, res) {
    const isbnBuscado = req.query.isbn;

    try {
        const livro = isbnBuscado ? await Livro.findOne({ where: { isbn: isbnBuscado } }) : await Livro.findAll();

        if (livro) {
            res.render('listagem_livros', { livros: livro.length ? livro : [livro] }); 
        } else {
            res.render('listagem_livros', { livros: [], mensagem: 'Nenhum livro encontrado com este ISBN.' });
        }

    } catch (error) {
        console.error('Erro na busca por ISBN:', error);
        res.status(500).send('Erro ao buscar livro.');
    }
}
module.exports = {
    getIndexView,
    getCadastroLivroView,
    postCadastrarLivro,
    getListarView,
    postEditarLivro,
    getExcluirLivro,
    getEditarLivro,
    buscarPorIsbn
}