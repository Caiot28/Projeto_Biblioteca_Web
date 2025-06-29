const express = require('express');
const session = require('express-session'); 
const mustacheExpress = require('mustache-express');
const db  = require('./db');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
  secret: 'biblioteca', 
  resave: false,
  saveUninitialized: false
}));

const bibliotecaRouter = require('./routers/bibliotecaRouter');
const usuarioRoutes = require('./routers/usuarioRouter');

app.use('/', bibliotecaRouter);
app.use('/', usuarioRoutes);

db.sync();

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('app rodando na porta ' + PORT);
}); 