<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
      Gympoint
</h3>

<blockquote align="center">“Não fique olhando o relógio faça como ele mexa-se”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/commonality/readme-inspector.svg">
  <img alt="Top language" src="https://img.shields.io/github/languages/top/commonality/readme-inspector.svg">
</p>

<p align="center">
  <a href="#Sobre o Projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Dependencias">Dependencias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Ferramentas">Ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
</p>

## Gympoit: Sobre o projeto

A aplicação a ser desenvolvida agora é uma aplicativode gerenciamento de academia o **Gympoint**. Nesta repositorio esta listado o backend da aplicação.

### Ferramentas utilizadas

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize utilizando PostgreSQL;

### Funcionalidades

#### 1. Autenticação

Permitir que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

#### 2. Cadastro de alunos

Permitir que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura, avatar.
O cadastro dos alunos só é feito por administradores autenticados na aplicação.

#### 3. Agendamento

Opçao de agendamento de treinos.

#### 4. Notificaçao de agendamento

Notificaçao de agendamento por e-mail.

### informações para uso do codigo
Para esta aplicaçao voce precisar ter instalado o [Node.js][nodejs], [Yarn][yarn], [Docker][docker] no seu computador para conseguir usar as linhas de comando abaixo.

```bash
#Clone o repositorio com o comando
$git clone https://github.com/guilhermeseckert/GYMPOINT Gympoint

#Criando base no Docker
$ docker run --name database-postgres -p 3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d postgres:latest
$ docker run --name testemongo -p 17017:17017 -d mongo
$ docker run --name testeredis -p 6379:6379 -d redis

#Criando as tabelas no banco de dados
$ sequelize db:migrate

#Navegue ate pasta
$ cd Gympoint

#Instalar as dependencias do projeto
$yarn install

#Iniciando o backend
$ yarn dev
```

<h1 align="center" border-radius= "50%">
  <img alt="buzz" title="buzz" src="https://media.giphy.com/media/h7FqA5FAhcLfH1i6gS/giphy.gif" width="200px" />
</h1>



Made with by Guilherme S.Eckert :wave: [Get in touch!](https://www.linkedin.com/in/guilherme-eckert/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[docker]:https://www.docker.com/
