const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'multimidia-teste',
    password: 'feli2002',
    port: 5432, // porta padrão do PostgreSQL
});

// Função para adicionar um usuário ao banco de dados com senha hash
async function addUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO usuarios (username, password) VALUES ($1, $2)';
  await pool.query(query, [username, hashedPassword]);
  console.log('Usuário adicionado com sucesso!');
}

// Chamada da função para adicionar um usuário
addUser('felipe', '123456'); // Altere o nome de usuário e a senha conforme necessário
