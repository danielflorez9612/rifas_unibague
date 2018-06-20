'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participants', {
        document: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        generatedNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'generated_number'
        },
      fullName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'full_name'
      },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
          phone: {
              type: DataTypes.STRING,
              allowNull: false,
          }
  }, {});
  return Participant;
};