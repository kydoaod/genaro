const { Schema, model } = require("mongoose");

const schema = Schema({
  user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: 'String',
    default: ''
  },
  message: {
    type: 'String',
    default: ''
  },
  message_datetime: {
    type: 'Date',
    default: Date.now
  }
});

module.exports = model("Message", schema);
