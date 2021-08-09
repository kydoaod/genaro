var LeadService = require('../../services/lead.service');

class LeadController {
    constructor() {
        this.leadService = new LeadService();
    }

    async getEvents(req, res) {
        this.leadService.getEvents(req.params.user_id)
        res.status(200).send({ success: true });
    }

    async getLeads(req, res) {
        res.status(200).send({ success: true });
    }

    async getLead(req, res) {
        let leadResponse = await this.leadService.getLead(req.params.id);
        res.status(leadResponse.success? 200 : 400).send(leadResponse);
    }

    async getHeroes(req, res) {
        res.status(200).send({ success: true });
    }

    async newHero(req, res) {
        res.status(200).send({ success: true });
    }

    async sendLead(req, res) {
        let leadResponse = await this.leadService.sendLead(req.body);
        res.status(leadResponse.success? 200 : 400 ).send(leadResponse);
    }
}

const leadController = new LeadController();

module.exports = leadController;
