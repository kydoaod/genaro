const DBConfig = JSON.parse(process.env.DB);
const Sequelize = require('sequelize');
const initModels = require('./../models/init-models');

const sequelize = new Sequelize(DBConfig.database, DBConfig.user, DBConfig.password, DBConfig)

const db = initModels(sequelize);
(async () => {
    await db.type.sync({ force: false });
    await db.users.sync({ force: false });
    await db.payments.sync({ force: false });
    await db.messages.sync({ force: false });
})();
module.exports = db;
