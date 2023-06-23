const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'wyzxglnx',
  host: 'postgres://wyzxglnx:6cfp01AnXoMzdLpto0QUj8FUIRgbN0iY@silly.db.elephantsql.com/wyzxglnx',
  database: 'banco-dados',
  password: '6cfp01AnXoMzdLpto0QUj8FUIRgbN0iY',
  port: 5432, // porta padrão do PostgreSQL
});

// Configuração do mecanismo de visualização EJS
app.set('view engine', 'ejs');

// Middleware para analisar o corpo das solicitações
app.use(express.urlencoded({ extended: false }));

// Rota para a página de login
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/page-video.html', (req, res) => {
  res.sendFile(__dirname + '/views/page-video.html');
});

app.use(express.static(__dirname + '/views'));

// Rota para processar o login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário e a senha correspondem
  pool.query('SELECT * FROM usuarios WHERE username = $1', [username], (err, dbRes) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.send('Erro na consulta.');
    } else {
      const user = dbRes.rows[0];

      if (!user) {
        res.send('Usuário não encontrado.');
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.redirect('/page-video.html');
          } else {
            res.send('Nome de usuário ou senha incorretos.');
          }
        });
      }
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
