'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        username: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        middleName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.DATE
        },
        preferredCurrency: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        nationality: {
            type: Sequelize.STRING
        },
        address1: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        telephone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        email_verified: {
            type: Sequelize.INTEGER
        },
        email_token: {
            type: Sequelize.STRING
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
    return queryInterface.dropTable('users');
  }
};