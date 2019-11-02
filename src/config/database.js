module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: SENHA_DO_BANCO,
  database: NOME_DO_BANCO,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
