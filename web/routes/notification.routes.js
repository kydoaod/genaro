const express = require('express');
const notificationController = require('../api/controllers/notification.controller');
const wrap = require('../util/route-wrapper');

const apiNotification = express.Router();

apiNotification.post('/notifications', wrap(async (req, res) => notificationController.getNotifications(req, res)));
apiNotification.delete('/notification', wrap(async (req, res) => notificationController.removeNotification(req, res)));

module.exports = apiNotification;