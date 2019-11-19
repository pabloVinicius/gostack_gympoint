require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: process.env.DB_LOGGING === 'true',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
