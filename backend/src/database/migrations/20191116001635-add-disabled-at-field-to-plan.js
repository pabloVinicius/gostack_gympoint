module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plans', 'disabled_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('plans', 'disabled_at');
  },
};
