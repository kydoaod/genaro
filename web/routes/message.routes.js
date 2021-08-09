const express = require('express');
const messageController = require('../api/controllers/message.controller');
const wrap = require('../util/route-wrapper');

const apiMessage = express.Router();

apiMessage.get('/message-details', wrap(async (req, res) => messageController.getMessage(req, res)));
apiMessage.post('/messages', wrap(async (req, res) => messageController.getMessages(req, res)));
apiMessage.post('/send-message', wrap(async (req, res) => messageController.sendMessage(req, res)));

module.exports = apiMessage;