const { Schema, model } = require("mongoose");

const schema = Schema({
  initiator_user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  target_user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  transaction_type: {
    type: 'String',
    default: ''
  },
  title: {
    type: 'String',
    default: ''
  },
  contents: {
    type: 'String',
    default: ''
  },
  details_url: {
    type: 'String',
    default: ''
  }
});

module.exports = model("Event", schema);