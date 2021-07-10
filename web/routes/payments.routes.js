const express = require('express');
const paymentController = require('../api/controllers/payments.controller');
const wrap = require('../util/route-wrapper');

const apiLead = express.Router();

apiLead.post('/balance', wrap(async (req, res) => paymentController.getBalance(req, res)));
apiLead.get('/method', wrap(async (req, res) => paymentController.getMethod(req, res)));
apiLead.get('/payments/:user_id', wrap(async (req, res) => paymentController.getPayments(req, res)));
apiLead.post('/earnings', wrap(async (req, res) => paymentController.getEarnings(req, res)));
apiLead.put('/method', wrap(async (req, res) => paymentController.updateMethod(req, res)));

module.exports = apiLead;