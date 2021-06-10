const express = require('express');
const userController = require('../api/controllers/user.controller');
const wrap = require('../util/route-wrapper');

const apiUser = express.Router();

apiUser.post('/login', wrap(async (req, res) => userController.login(req, res)));

module.exports = apiUser;
