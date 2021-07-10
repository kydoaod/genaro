var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _type = require("./type");
var _payments = require("./payments");
var _messages = require("./messages");


function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);

  users.belongsTo(type, { as: "type", foreignKey: "type_id" });
  type.hasMany(users, { as: "users", foreignKey: "type_id" });

  payments.belongsTo(users, { as: "users", foreignKey: "user_id" });
  users.hasMany(payments, { as: "payments", foreignKey: "user_id" });

  messages.belongsTo(messages, { as: "messages", foreignKey: "user_id" });
  users.hasMany(messages, { as: "messages", foreignKey: "user_id" });

  return {
    users,
    type,
    payments,
    messages
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
