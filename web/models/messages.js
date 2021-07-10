const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    message_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'users',
            key: 'user_id'
        }
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    message_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    sequelize,
    tableName: 'messages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
            { name: "message_id" },
        ]
      },
    ]
  });
};
