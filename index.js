const express = require('express');
const mustacheExpress = require('mustache-express');
const db  = require('./db');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

const bibliotecaRouter = require('./routers/bibliotecaRouter');
app.use('/', bibliotecaRouter);

db.sync();

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('app rodando na porta ' + PORT);
}); 