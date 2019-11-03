module.exports = {
  dialect: 'postgres',
  port: 5433,
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
