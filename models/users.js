'use strict';
module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        middleName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.DATE
        },
        preferredCurrency: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        nationality: {
            type: DataTypes.STRING
        },
        address1: {
            type: DataTypes.STRING
        },
        address2: {
            type: DataTypes.STRING
        },
        telephone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        email_verified: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        email_token: {
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
    });
    users.associate = function (models) {
        // associations can be defined here
    };
    return users;
};
