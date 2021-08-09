var NotificationService = require('../../services/notification.service');

class NotificationController {
    constructor() {
        this.notificationService = new NotificationService();
    }

    async getNotifications(req, res) {
        let notificationResponse = await this.notificationService.getNotifications(req.body.user_id);
        res.status(notificationResponse.success? 200 : 400).send(notificationResponse);
    }

    async removeNotification(req, res) {
        let notificationResponse = await this.notificationService.removeNotification(req.body.user_id, req.body.notification_id);
        res.status(notificationResponse.success? 200 : 400).send(notificationResponse);
    }
}

const notificationController = new NotificationController();

module.exports = notificationController;
