const express = require('express');
const leadController = require('../api/controllers/lead.controller');
const wrap = require('../util/route-wrapper');

const apiLead = express.Router();

apiLead.get('/events', wrap(async (req, res) => leadController.getEvents(req, res)));
apiLead.get('/leads', wrap(async (req, res) => leadController.getLeads(req, res)));
apiLead.get('/heroes', wrap(async (req, res) => leadController.getHeroes(req, res)));
apiLead.get('/new-hero', wrap(async (req, res) => leadController.newHeroes(req, res)));

module.exports = apiLead;
