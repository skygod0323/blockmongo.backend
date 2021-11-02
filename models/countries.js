'use strict';
module.exports = function (sequelize, DataTypes) {
    var countries = sequelize.define('countries', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        symbol: {
            type: DataTypes.STRING
        }
    });
    countries.associate = function (models) {
        // associations can be defined here
    };
    return countries;
};