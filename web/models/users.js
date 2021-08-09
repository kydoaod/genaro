const { Schema, model } = require("mongoose");

const schema = Schema({
  email: {
    type: 'String',
    required: true
  },
  password: {
    type: 'String',
    required: true
  },
  name: {
    type: 'String',
  },
  phone: {
    type: 'String',
  },
  google_id: {
    type: 'String',
    default: '',
  },
  fb_id: {
    type: 'String',
    default: ''
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type' 
  }
});

module.exports = model("User", schema);