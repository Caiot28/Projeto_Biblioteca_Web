const express = require('express');
const router = express.Router();
const bibliotecaController = require('../controllers/bibliotecaController');

router.get('/', bibliotecaController.getIndexView);
router.get('/cadastro', bibliotecaController.getCadastroLivroView);
router.get('/listar', bibliotecaController.getListarView);
router.post('/cadastrar_livro', bibliotecaController.postCadastrarLivro);
module.exports = router;