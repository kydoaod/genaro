const express = require('express');
const userController = require('../api/controllers/user.controller');
const wrap = require('../util/route-wrapper');

const apiUser = express.Router();

apiUser.post('/auth/standard', wrap(async (req, res) => userController.login(req, res)));
apiUser.post('/auth/google', wrap(async (req, res) => userController.googleLogin(req, res)));
apiUser.post('/auth/fb', wrap(async (req, res) => userController.fbLogin(req, res)));

module.exports = apiUser;
