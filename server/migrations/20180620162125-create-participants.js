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
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'full_name'
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
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