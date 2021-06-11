//var AccountService = require('../../services/account.service');

class LeadController {
    constructor() {
        //this.accountService = new AccountService();
    }

    async getEvents(req, res) {
        res.status(200).send({ success: true });
    }

    async getLeads(req, res) {
        res.status(200).send({ success: true });
    }

    async getHeroes(req, res) {
        res.status(200).send({ success: true });
    }

    async newHero(req, res) {
        res.status(200).send({ success: true });
    }
}

const leadController = new LeadController();

module.exports = leadController;
