//Importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose()

//Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

//Utilizar o  objeto de banco de dados
db.serialize(() => {
  //Criar tabela
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     img TEXT,
  //     address1 TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `)

  // //Inserir dados na tabela
  // const query = `
  //   INSERT INTO places (
  //     name,
  //     img,
  //     address1,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?, ?, ?, ?, ?, ?, ?);
  // `

  // const values = [
  //   'Papersider',
  //   'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80',
  //   'São paulo, Centro',
  //   '300',
  //   'Paraná',
  //   'Andirá',
  //   'Papéis e Papelão'
  // ]

  // function afterInsertData(err) {
  //   if(err) {
  //     console.log(err)
  //   }

  //   console.log('Cadastrado com sucesso!')
  //   console.log(this)
  // }

  // db.run(query, values, afterInsertData)

  //Deletar dados da tabela
  // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
  //   if(err) {
  //     console.log(err)
  //   }

  //   console.log('Registro deletado com sucesso!')
  // })

  //Consultar dados da tabela
  // db.all(`SELECT * FROM places`, function(err, rows) {
  //   if(err) {
  //     console.log(err)
  //   }

  //   console.log('Aqui estão seus registros:')
  //   console.log(rows)
  // })
})

module.exports = db