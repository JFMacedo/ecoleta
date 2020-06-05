//Importar dependencia do express
const express = require('express')
const server = express()

//Pegar o banco de dados
const db = require('./database/db')

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
  //Pegar os dados do banco de dados
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
    }

    const total = rows.length

    //Mostra a pagina html com os dados do banco de dados
    res.render('search-results.html', {places: rows, total: total})
  })
})

//Ligar o servidor
server.listen(3000)