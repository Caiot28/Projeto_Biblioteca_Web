const express = require('express');
const router = express.Router();
const bibliotecaController = require('../controllers/bibliotecaController');

router.get('/', bibliotecaController.getIndexView);
router.get('/cadastro', bibliotecaController.getCadastroLivroView);
router.get('/listar', bibliotecaController.getListarView);
router.post('/cadastrar_livro', bibliotecaController.postCadastrarLivro);
router.get('/editar_livro/:isbn', bibliotecaController.getEditarLivro);
router.post('/editar_livro', bibliotecaController.postEditarLivro);
router.get('/excluir_livro/:isbn', bibliotecaController.getExcluirLivro);



module.exports = router;