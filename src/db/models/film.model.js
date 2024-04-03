const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("film", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        format: {
            type: DataTypes.ENUM,
            values: ['VHS', 'DVD', 'Blu-ray'],
        },
        actors: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};