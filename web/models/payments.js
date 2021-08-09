const { Schema, model } = require("mongoose");

const schema = Schema({
  user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  payment_type: {
    type: 'String',
    default: 'withdraw'
  },
  title: {
    type: 'String',
    default: ''
  },
  processing_date: {
      type: 'Date',
      default: Date.now
  }
});

module.exports = model("Payment", schema);

/*
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    payment_id: {
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
    payment_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    processing_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "payment_id" },
        ]
      },
    ]
  });
};
*/