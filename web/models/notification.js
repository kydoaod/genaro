const { Schema, model } = require("mongoose");

const schema = Schema({
  user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  notification_data: [{
    notif_type: 'String',
    description: 'String',
    data_url: 'String',
    web_url: 'String'
  }]
});

module.exports = model("Notification", schema);
