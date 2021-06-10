"use strict"

const db = require('./db.service');
const { Op } = require("sequelize");

class Account {
    async login(req, res){
        // const authCodeUrlParameters = {
        //     scopes: ["user.read"],
        //     redirectUri: "http://localhost:3000/redirect",
        // };
        // cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        //     res.redirect(response);
        // }).catch((error) => console.log(JSON.stringify(error)));
    }

    //TODO: Use this in every secured endpoint
    async checkToken(req, res) {
        passport.authenticate('oauth-bearer', {session: false})
    }
}

module.exports = Account;