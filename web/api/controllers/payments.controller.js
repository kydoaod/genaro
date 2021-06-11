//var AccountService = require('../../services/account.service');

class PaymentController {
    constructor() {
        //this.accountService = new AccountService();
    }

    async getBalance(req, res) {
        res.status(200).send({ success: true });
    }

    async getMethod(req, res) {
        res.status(200).send({ success: true });
    }

    async getPayments(req, res) {
        res.status(200).send({ success: true });
    }

    async getEarnings(req, res) {
        res.status(200).send({ success: true });
    }

    async updateMethod(req, res) {
        res.status(200).send({ success: true });
    }
}

const paymentController = new PaymentController();

module.exports = paymentController;
