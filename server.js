const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'wyzxglnx',
  host: 'silly.db.elephantsql.com',
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

// Rota para exibir a página de registro
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
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

// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe
  pool.query('SELECT * FROM usuarios WHERE username = $1', [username], (err, dbRes) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.send('Erro na consulta.');
    } else {
      const existingUser = dbRes.rows[0];

      if (existingUser) {
        res.send('Usuário já existe.');
      } else {
        // Hash da senha antes de armazenar no banco de dados
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Erro ao criar hash de senha:', err);
            res.send('Erro ao criar hash de senha.');
          } else {
            // Inserir o novo usuário no banco de dados
            pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, hashedPassword], (err) => {
              if (err) {
                console.error('Erro ao inserir novo usuário:', err);
                res.send('Erro ao inserir novo usuário.');
              } else {
                res.redirect('/login');
              }
            });
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
