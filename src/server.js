//Importar dependencia do express
const express = require('express')
const server = express()

//Pegar o banco de dados
const db = require('./database/db')

//Configurar pasta publica
server.use(express.static('public'))

//Abilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

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

server.post('/savepoint', (req, res) => {
  //Inserir dados na tabela
  const query = `
    INSERT INTO places (
      name,
      img,
      address1,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if(err) {
      console.log(err)
      return res.render('create-point.html', { error: true })
    }
    return res.render('create-point.html', { saved: true })
  }
  db.run(query, values, afterInsertData)
})

//Pagina resultado da pesquisa
server.get('/search-results', (req, res) => {
  const search = req.query.search
  if(search == "") {
    return res.render('search-results.html', {total: 0})
  }

  //Pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      console.log(err)
    }

    const total = rows.length

    //Mostra a pagina html com os dados do banco de dados
    res.render('search-results.html', {places: rows, total})
  })
})

//Ligar o servidor
server.listen(3000)