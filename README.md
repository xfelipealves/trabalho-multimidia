# Acesso a Servidor Multimídia

Este projeto consiste na construção de um site que permite o acesso a conteúdo multimídia (áudio e vídeos) armazenados localmente ou em tempo real. O objetivo é criar uma experiência semelhante a plataformas populares como YouTube e Netflix.

## Funcionalidades

- **Autenticação de Usuário**: O site possui uma página de autenticação onde os usuários devem fazer login para acessar o conteúdo multimídia.

- **Visualização de Conteúdo Multimídia**: Após autenticar-se, os usuários têm a capacidade de visualizar e reproduzir o conteúdo multimídia disponível no site.

## Tecnologias Utilizadas

- HTML: Utilizado para a estruturação das páginas do site.
- CSS: Utilizado para estilizar as páginas e tornar a experiência visualmente atraente.
- JavaScript: Utilizado para adicionar interatividade e comportamentos dinâmicos ao site.
- Node.js: Utilizado como plataforma de desenvolvimento do servidor.
- PostgreSQL: Utilizado como banco de dados para armazenar informações de autenticação de usuários.
- Elephantsql: Plataforma online utilizada para hospedar o banco de dados PostgreSQL.
- Render Dashboard: Plataforma utilizada para hospedar o servidor a partir do repositório do GitHub.

## Estrutura do Projeto

O projeto possui a seguinte estrutura de arquivos:

- `index.html`: É a página principal do site, onde os usuários fazem login e acessam o conteúdo multimídia.
- `media/`: Pasta que armazena os arquivos de áudio e vídeos que serão reproduzidos no site.
- `server.js`: Arquivo Node.js responsável por gerenciar o servidor e a conexão com o banco de dados PostgreSQL.

## Executando o Projeto

1. Clone ou faça o download deste repositório para o seu computador.
2. Certifique-se de ter os arquivos de áudio e vídeos que deseja disponibilizar armazenados na pasta `media/`.
3. Configure a conexão com o banco de dados PostgreSQL através da plataforma Elephantsql.
4. Abra um terminal na pasta raiz do projeto e execute o seguinte comando para instalar as dependências do Node.js:
```
npm install
```
5. Após a conclusão da instalação, execute o seguinte comando para iniciar o servidor:
```
node server.js
``` 
6. Acesse o site através do seu navegador web e faça login para visualizar o conteúdo multimídia disponível.

## Personalização

Você pode personalizar o projeto de acordo com as necessidades da sua atividade. Aqui estão algumas sugestões:

- Adicione mais páginas e funcionalidades ao site, como uma página de registro de usuário, uma página de perfil do usuário, etc.
- Aprimore a interface do site utilizando recursos avançados de CSS e bibliotecas/frameworks como Bootstrap.
- Implemente recursos adicionais, como a capacidade de criar listas de reprodução, recomendações de conteúdo, etc.
- Explore outras opções de hospedagem de servidor, como Heroku, AWS, Google Cloud, etc.
- Implemente recursos adicionais de segurança, como criptografia de dados sensíveis, autenticação de dois fatores, etc.
- Melhore a escalabilidade do sistema, permitindo o carregamento assíncrono de conteúdo multimídia e o uso de serviços de cache.
- Otimize o desempenho do site, realizando a compressão de arquivos de mídia e a implementação de técnicas de cache.
- Adicione recursos de compartilhamento e integração com redes sociais para promover o conteúdo multimídia.

## Contribuição

Se desejar contribuir com este projeto, fique à vontade para abrir issues e enviar pull requests. Serão bem-vindas sugestões, correções de bugs e melhorias.