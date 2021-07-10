let AccountService = require('../../services/account.service');

class PaymentController {
    constructor() {
        this.accountService = new AccountService();
    }

    async getBalance(req, res) {
        res.status(200).send({ success: true });
    }

    async getMethod(req, res) {
        res.status(200).send({ success: true });
    }

    async getPayments(req, res) {
        let payments = await this.accountService.getPayments(req.params.user_id);
        res.status(payments.success? 200: 400).send(payments);
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
