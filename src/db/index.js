require("dotenv").config();
const { Sequelize } = require("sequelize");
const applyExtraSetup = require("./extra-setup");

const config = {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
};
const sequelize = new Sequelize(config);

const modelDefiners = [
    require("./models/user.model"),
    require("./models/movie.model"),
    require("./models/actor.model"),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
