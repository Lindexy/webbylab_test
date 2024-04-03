const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(config);

const modelDefiners = [
    require("./models/user.model"),
    require("./models/film.model"),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

module.exports = sequelize;