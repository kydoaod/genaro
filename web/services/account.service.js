"use strict"

const db = require('./db.service');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(JSON.parse(process.env.GOOGLE_OAUTH_CRED).ClientID)
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Account {
    async login(req, res){
        let credentials = await db.users.findOne({
            where: {
                email: req.body.username
            },
            raw:true
        });
        if(bcrypt.compareSync(req.body.password, credentials.password)){
            return {
                success: true,
                token: jwt.sign({email: credentials.email}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' })
            }
        } else {
            return {
                success: false
            }
        }
    }

    async googleLogin(req, res){
        const { token }  = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: (JSON.parse(process.env.GOOGLE_OAUTH_CRED).ClientID)
        });
        const { name, email } = ticket.getPayload();    
        // do token handling here
        return { name: name, email: email };
    }

    //TODO: Use this in every secured endpoint
    async checkToken(req, res) {
        //passport.authenticate('oauth-bearer', {session: false})
    }
}

module.exports = Account;