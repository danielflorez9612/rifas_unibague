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
    }
  }, {});
  return Participant;
};