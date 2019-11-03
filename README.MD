# Boilerplate Projeto Back-End NodeJs

## Stack
1. Nodemon
2. Sucrase
3. Express
4. Postgres
5. Docker
6. Eslint
7. Prettier
8. Yarn
9. Editor config
10. Yup
11. Json Web Token

## Instalação das dependências principais

1. Inicie o projeto com `yarn init -y`
2. Instale o Express:
```
    yarn add express
```
3. Instale Nodemon e Sucrase como dependências de desenvolvimento:
```
    yarn add -D sucrase nodemon
```
4. Crie o esquema de pastas e arquivos padrão do projeto, deve ficar parecido com isso

```
    /
      /src
        /app
          /controlers
          /middlewares
          /models
        app.js
        routes.js
        server.js
        /database
          /migrations
          index.js
        /config
      /.gitignore
      /yarn.lock
      ...
```
5. No package.json, adicione a entrada `scripts` com os seguintes valores:
```json
{
  "scripts": {
      "dev": "nodemon src/server.js",
      "dev:debug": "nodemon --inspect src/server.js"
  },
 ...
}
```
6. Para que o `nodemon` utilize o `sucrase` e, assim, reconheça a sintaxe import/export, crie um arquivo `nodemon.json` na raíz do projeto com o seguinte conteúdo:
```json
{
  "execMap": {
    "js": "node -r sucrase/register" //faz com que o nodemon rode o sucrase para cada arquivo js
  }
}
```
7. Configure o debug adicionando uma nova configuração, o que irá gerar uma pasta `.vscode` na raíz do projeto, com um arquivo `launch.json` que deve ser configurado como abaixo:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach", //mudar para attach
            "restart": true, //colocar essa entrada
            "name": "Launch Program",
            "protocol": "inspector" //colocar essa entrada
        }
    ]
}
```
## Configurações do editor

1. Instale o `eslint` como dependência de desenvolvimento:
```
yarn add -D eslint
```
2. Configure o `eslint` com o comando `yarn eslint --init` e escolhendo as seguintes opções:
```
- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- None of these (na pergunta de framewords)
- Node
- N (na pergunta se utiliza typescript)
- Use a popular style guide
- Airbnb
- Javascript
```
> O eslint instala as dependências utilizando o npm. Para corrigir isso, apague o package-lock.json e depois rode o comando `yarn` no terminal.

3. Instale o prettier e suas libs, todos como dependências de desenvolvimento, com o seguinte comando:
```
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```
4. O eslint vai criar um arquivo .eslintrc.js na raíz do projeto. Adicione as seguintes configurações extras:
```javascript
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier' //adiciona o prettier
  ],
  plugins: ['prettier'], //adiciona o prettier
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error", //diz para o prettier retornar erro caso encontre
    "class-methods-use-this": "off", //nem sempre os métodos vão usar this
    "no-param-reassign": "off", //permite manipular o valor de um parâmetro
    "camelcase": "off", //desabilita a verificação de camel case
    "no-unused-vars": ["error", { "argsIgnorePattern": "next"}] //permite declarar a variável next mesmo sem utilizar, necessário em alguns casos
  },
};
```
5. Crie um arquivo .prettierrc na raiz do projeto para sobreescrever algumas configurações do prettier. Ele deve ser como abaixo:
```json
{
    "singleQuote": true, //uso de aspas simples
    "trailingComma": "es5", //virgula em elementos finais de listas e objetos
    "tabWidth": 2 //tamanho da tabulação em espaços
}
```
> É possivel fazer com que o eslint corrija os arquivos do projeto sem ter que abri-los. Para isso, podemos fazer o comando `yarn eslint --fix DIRETÓRIO --ext .js
`
6. Pode-se instalar o Editor Config para unificar as configurações do projeto entre os desenvolvedores e seus possíveis diferentes editores de código. Para isso, cria-se um arquivo `.editorconfig` na raíz do projeto que, no nosso caso, deve ter o seguinte conteúdo:
```properties
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## Configurações do banco de dados

1. Utilizando o `Docker`, crie um container para o banco de dados (nesse caso o `Postgres`) com o seguinte comando:

```bash
docker run --name NOME_DO_CONTAINER -e POSTGRES_PASSWORD=SENHA_DO_BD -p PORTA_REDIRECIONADA:5432 -d postgres:11
```
> 5432 é a porta que o `Postgress` roda por padrão, por isso o valor é fixo.

>A entrada `-d postgres:11` pode variar, esse valor é referente à imagem que está sendo utilizada para criar o container.

2. Instale o sequelize e o sequelize-cli (dependência de desenvolvimento) com os seguintes comandos:
```bash
yarn add sequelize
yarn add -D sequelize-cli
```
3. Instale dependências do postgres com o seguinte comando:
```
yarn add pg pg-hstore
```
4. Crie um arquivo .sequelizerc na raíz do projeto, com o seguinte conteúdo:
```js
const { resolve } = require('path');

module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'), //caminho para arquivo de configuração
    'models-path': resolve(__dirname, 'src', 'app', 'models'), //caminho para a pasta de models
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'), //caminho para a pasta de migrations
    'seeders-path': resolve(__dirname, 'src', 'app', 'seeds'), //caminho para a pasta de seeders
};
```
5. Crie um arquivo database.js na pasta src/config, contendo o seguinte conteúdo:
```javascript
module.exports = {
  dialect: 'postgres', //qual banco está sendo utilizado
  host: 'localhost',
  username: 'postgres',
  password: SENHA_DO_BANCO,
  database: NOME_DO_BANCO,
  define: {
    timestamps: true, //gera createdAt e updatedAt nas entradas
    underscored: true, //garante o uso de snake_case ao invés de camelCase
    underscoredAll: true, //garante o uso de snake_case ao invés de camelCase
  },
};
```
6. Podemos usar o sequelize-cli para facilitar a criação de migrations, abaixo um exemplo de comando para criar e de uma migration:
```bash
yarn sequelize migration:create --name=creation-users
```
```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
```
7. Para aplicar as migrations no banco de dados, use o seguinte comando:
```
yarn sequelize db:migrate
```
8. Para desfazer a última migration, use o comando abaixo:
```
yarn sequelize db:migrate:undo
```
9. Para desfazer todas as migrations, adicione a chave all no final, como no comando abaixo:
```
yarn sequelize db:migrate:undo:all
```
