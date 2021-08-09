var MessageService = require('../../services/message.service');

class MessageController {
    constructor() {
        this.messageService = new MessageService();
    }

    async getMessage(req, res) {
        let message = await this.messageService.getMessage(req.query.user_id, req.query.message_id);
        res.status(message.success? 200 : 400).send(message);
    }

    async getMessages(req, res) {
        let messages = await this.messageService.getMessages(req.body.user_id);
        res.status(messages.success? 200 : 400).send(messages);
    }

    async sendMessage(req, res) {
        let messageResponse = await this.messageService.sendMessage(req.body);
        res.status(messageResponse.success? 200 : 400).send(messageResponse);
    }
}

const messageController = new MessageController();

module.exports = messageController;
