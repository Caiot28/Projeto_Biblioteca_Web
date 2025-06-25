const Usuario = require('../models/usuarioModel');

function getCadastroView(req, res){
    res.render('cadastro_usuario.html');
}

function getLoginView(req, res){
    const { erro_login, cadastro_sucesso } = req.query;

    res.render('login.html', {
        erro_login: erro_login === '1',
        cadastro_sucesso: cadastro_sucesso === '1',
    });
}

function getMenuView(req, res){
    const nomeUsuario = req.session.usuario?.nome || 'Usuário';
    res.render('menu', { nomeUsuario });
}

function postCadastrarUsuario(req, res){
    const dados_usuario = req.body;
    Usuario.create(dados_usuario).then(()=>{
        res.redirect('/acessar?cadastro_sucesso=1');
    });
}

async function postAutenticarUsuario(req, res){

    const usuario = await Usuario.findOne({
       where: {
        email: req.body.email,
        senha: req.body.senha
       }
    });

    if(usuario !== null){
        console.log('USUÁRIO AUTENTICADO');
        req.session.autorizado = true;
        req.session.usuario = usuario;
        res.redirect('/menu');
    }
    else{
        res.redirect('/acessar?erro_login=1');
    }
    
}

function verificarAutenticacao(req, res, next){
   if(req.session.autorizado){
       console.log('usuário autorizado');
       next();
   }
   else{
       console.log('usuário NÃO autorizado');
       res.redirect('/acessar');
   }
}

function sair(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir a sessão:', err);
      return res.status(500).send('Erro ao sair.');
    }
    res.redirect('/');
  });
}

module.exports = {
    getCadastroView,
    getLoginView,
    getMenuView,
    postCadastrarUsuario,
    postAutenticarUsuario,
    sair,
    verificarAutenticacao
}