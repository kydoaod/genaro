var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _type = require("./type");

function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  users.belongsTo(type, { as: "type", foreignKey: "type_id" });
  type.hasMany(users, { as: "users", foreignKey: "type_id" });

  return {
    users,
    type
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
