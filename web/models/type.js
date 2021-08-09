const { Schema, model } = require("mongoose");

const schema = Schema({
  type_name: {
    type: 'String',
  }
});

module.exports = model("Type", schema);