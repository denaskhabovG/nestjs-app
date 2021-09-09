'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'username', Sequelize.STRING, {
      username: {
        type: Sequelize.STRING
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'username', Sequelize.STRING, {
      username: {
        type: Sequelize.STRING
      },
    });
  }
};
