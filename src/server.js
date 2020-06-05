const express = require('express')
const server = express()

//Configurar pasta publica
server.use(express.static('public'))

//Utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

//Configurar rotas
//Pagina inicial
server.get('/', (req, res) => {
  res.render('index.html')
})

//Pagina criar um ponto de coleta
server.get('/create-point', (req, res) => {
  res.render('create-point.html')
})

//Pagina resultado da pesquisa
server.get('/search-results', (req, res) => {
  res.render('search-results.html')
})

//Ligar o servidor
server.listen(3000)