require("dotenv").config();
const { Sequelize } = require("sequelize");

const config = {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
};
const sequelize = new Sequelize(config);

const modelDefiners = [
    require("./models/user.model"),
    require("./models/film.model"),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

module.exports = sequelize;
