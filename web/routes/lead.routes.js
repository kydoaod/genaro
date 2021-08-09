const express = require('express');
const leadController = require('../api/controllers/lead.controller');
const validateAccessToken = require('../middlewares/validate-access-token.middleware');
const wrap = require('../util/route-wrapper');

const apiLead = express.Router();

apiLead.get('/events', wrap(async (req, res) => leadController.getEvents(req, res)));
apiLead.get('/leads', wrap(async (req, res) => leadController.getLeads(req, res)));
apiLead.get('/lead/:id', wrap(async (req, res) => leadController.getLead(req, res)));
apiLead.get('/heroes', wrap(async (req, res) => leadController.getHeroes(req, res)));
apiLead.post('/new-hero', wrap(async (req, res) => leadController.newHero(req, res)));
apiLead.post('/send-lead', wrap(async (req, res) => leadController.sendLead(req, res)));

module.exports = apiLead;
