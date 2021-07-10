var AccountService = require('../../services/account.service');

class UserController {
    constructor() {
        this.accountService = new AccountService();
    }

    async login(req, res) {
        let loginResponse = await this.accountService.login(req, res);
        res.status(loginResponse.success? 200 : 403).send(loginResponse);
    }
    
    async googleLogin(req, res) {
        let loginResponse = await this.accountService.googleLogin(req, res);
        res.status(loginResponse.success? 200 : 403).send(loginResponse);
    }

    async fbLogin(req, res) {
        let loginResponse = await this.accountService.fbLogin(req, res);
        res.status(loginResponse.success? 200 : 403).send(loginResponse);
    }
    
    async getInfo(req, res) {
        res.status(200).send({ success: true });
    }

    async getAnalytics(req, res) {
        let analytics = await this.accountService.getAnalytics(req.body.user_id);
        res.status(analytics.status? 200 : 400).send(analytics);
    }

    async getMessages(req, res) {
        let messages = await this.accountService.getMessages(req.body.user_id);
        res.status(messages.status? 200 : 400).send(messages);
    }

    async getSettings(req, res) {
        res.status(200).send({ success: true });
    }

    async updateSettings(req, res) {
        res.status(200).send({ success: true });
    }
}

const userController = new UserController();

module.exports = userController;
