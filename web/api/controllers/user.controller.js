var AccountService = require('../../services/account.service');

class UserController {
    constructor() {
        this.accountService = new AccountService();
    }

    async getInfo(req, res) {
        res.status(200).send({ success: true });
    }

    async login(req, res) {
        this.accountService.login(req, res);
        res.status(200).send({ success: true });
    }
}

const userController = new UserController();

module.exports = userController;
