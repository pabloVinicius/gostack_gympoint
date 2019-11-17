module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'prettier' //adiciona o prettier
  ],
  plugins: ['prettier', 'jest'], //adiciona o prettier
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
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }], //permite declarar a variável next mesmo sem utilizar, necessário em alguns casos
    "import/prefer-default-export": "off",
    "spaced-comment": "off"
  },
};
