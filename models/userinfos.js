'use strict';
module.exports = (sequelize, DataTypes) => {
  var userinfos = sequelize.define('userinfos', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      userid: {
          type: DataTypes.INTEGER
      },
      country: {
          type: DataTypes.STRING
      },
      accountNumber: {
          type: DataTypes.STRING
      },
      level: {
          type: DataTypes.STRING
      },
      createdAt: {
          type: DataTypes.DATE,
          defaultValue : new Date()
      },
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue : new Date()
      }
  }, {});
  userinfos.associate = function(models) {
    // associations can be defined here
  };
  return userinfos;
};