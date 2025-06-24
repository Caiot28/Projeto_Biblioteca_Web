const express = require('express');
const router = express.Router();
const bibliotecaController = require('../controllers/bibliotecaController');
const { verificarAutenticacao } = require('../controllers/usuarioController');

router.get('/menu', verificarAutenticacao, (req, res) => {
  res.render('menu', { nomeUsuario: req.session.usuario.nome });
});

router.get('/', bibliotecaController.getIndexView);
router.get('/cadastro', verificarAutenticacao, bibliotecaController.getCadastroLivroView);
router.get('/listar', verificarAutenticacao, bibliotecaController.getListarView);
router.post('/cadastrar_livro', verificarAutenticacao, bibliotecaController.postCadastrarLivro);
router.get('/editar_livro/:isbn', verificarAutenticacao, bibliotecaController.getEditarLivro);
router.post('/editar_livro', verificarAutenticacao, bibliotecaController.postEditarLivro);
router.get('/excluir_livro/:isbn', verificarAutenticacao, bibliotecaController.getExcluirLivro);
router.get('/buscar', verificarAutenticacao, bibliotecaController.buscarPorIsbn);


module.exports = router;