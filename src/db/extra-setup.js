const { Sequelize, Model, DataTypes } = require("sequelize");

function applyExtraSetup(sequelize) {
    const { movie, actor } = sequelize.models;

    movie.belongsToMany(actor, { through: "MovieActor" });
    actor.belongsToMany(movie, { through: "MovieActor" });
}

module.exports = applyExtraSetup;
