'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Participants', {
      document: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true
      },
        generatedNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            field: 'generated_number'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Participants');
  }
};