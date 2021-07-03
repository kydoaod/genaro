const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    google_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fb_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'type',
        key: 'type_id'
      },
      default: 1
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
