const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("movie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["VHS", "DVD", "Blu-Ray"]],
            },
        },
    });
};
