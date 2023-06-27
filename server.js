// Importando módulos
const express = require('express');
const bcrypt = require('bcrypt');
var pg = require('pg');

// Configurando servidor
const app = express();
const port = 3000;

// Configurando conexão com Banco de Dados PostgreSQL
var conString = "postgres://wyzxglnx:6cfp01AnXoMzdLpto0QUj8FUIRgbN0iY@silly.db.elephantsql.com/wyzxglnx?ssl=true" //Can be found in the Details page
var client = new pg.Client(conString);

// Conectando ao Banco de Dados
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
  });
});

// Configuração do mecanismo de visualização EJS para renderizar as páginas em HTML
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

// Rota para exibir a página de vídeo
app.get('/page-video.html', (req, res) => {
  res.sendFile(__dirname + '/views/page-video.html');
});

// Define o diretório de arquivos estáticos para servir arquivos HTML, CSS, JavaScript, etc.
app.use(express.static(__dirname + '/views'));

// Rota para processar o login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário e a senha correspondem
  client.query('SELECT * FROM usuarios WHERE username = $1', [username], (err, dbRes) => {
    // Valida se a consulta foi feita com sucesso
    if (err) {
      console.error('Erro na consulta:', err);
      res.send('Erro na consulta.');
    } else {
      const user = dbRes.rows[0];

      // Verifica se o usuário existe no Banco de Dados
      if (!user) {
        res.send('Usuário não encontrado.');
      } else { // Verifica se a senha fornecida é a mesma que está salva para este usuário
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) { //Caso seja sucesso, será redirecionado para a página
            res.redirect('/page-video.html');
          } else { //Caso a senha não bate, receberá a seguinte mensagem
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
  client.query('SELECT * FROM usuarios WHERE username = $1', [username], (err, dbRes) => {
    // Valida se a consulta foi feita com sucesso
    if (err) {
      console.error('Erro na consulta:', err);
      res.send('Erro na consulta.');
    } else {
      const existingUser = dbRes.rows[0];

      // Verifica se o usuário já existe no Banco de Dados
      if (existingUser) {
        res.send('Usuário já existe.');
      } else {
        // Hash da senha antes de armazenar no banco de dados (utilizando bycript)
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) { // Caso dê erro ao criar Hash da senha
            console.error('Erro ao criar hash de senha:', err);
            res.send('Erro ao criar hash de senha.');
          } else {
            // Inserir o novo usuário no banco de dados
            client.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, hashedPassword], (err) => {
              // Valida se o insert foi feito com sucesso
              if (err) {
                console.error('Erro ao inserir novo usuário:', err);
                res.send('Erro ao inserir novo usuário.');
              } else { // Se der certo, ele será redirecionado para a página index.html
                res.redirect('/');
                console.log(`insert de usuario realizado`);
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
