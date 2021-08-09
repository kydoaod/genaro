const { Schema, model } = require("mongoose");

const schema = Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  client_name: {
    type: 'String',
    default: ''
  },
  phone_number: {
    type: 'String',
    default: ''
  },
  email: {
    type: 'String',
    default: ''
  },
  address: {
    type: 'String',
    default: ''
  },
  insurance_type: {
    type: 'String',
    default: ''
  },
  contact_form: {
    type: 'String',
    default: ''
  },
  other_notes: {
    type: 'String',
    default: ''
  },
  driver_dobs: {
    type: 'String',
    default: ''
  },
  car_details: {
    type: 'String',
    default: ''
  },
  liability_details: {
    type: 'String',
    default: ''
  }
});

module.exports = model("Lead", schema);