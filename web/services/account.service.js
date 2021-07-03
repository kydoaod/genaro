"use strict"

const db = require('./db.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const { Op } = require("sequelize");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(JSON.parse(process.env.GOOGLE_OAUTH_CRED).ClientID)
const saltRounds = 10;

class Account {
    async login(req, res){
        let credentials = await db.users.findOne({
            where: {
                email: req.body.username
            },
            include:[{
                model: db.type,
                as: "type",
                attributes:["type_name"]
            }],
            nest: true,
            raw:true
        });
        if(bcrypt.compareSync(req.body.password, credentials.password)){
            return {
                success: true,
                token: jwt.sign({email: credentials.email}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' }),
                type: credentials.type.type_name,
                auth_type: "google"
            }
        } else {
            return {
                success: false
            }
        }
    }

    async googleLogin(req, res){
        const { token }  = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: (JSON.parse(process.env.GOOGLE_OAUTH_CRED).ClientID)
        });
        const { name, email, sub, email_verified, at_hash } = ticket.getPayload();
        let credentials = await db.users.findOne({
            where: {
                [Op.or]: [
                    { google_id: sub },
                    { email: email }
                ]
            },
            include:[{
                model: db.type,
                as: "type",
                attributes:["type_name"]
            }],
            nest: true,
            raw:true
        });
        
        if(!credentials && email_verified){
            await db.users.create({
                name: name,
                email: email,
                google_id: sub,
                password: at_hash,
                type_id: 1 //Subject for discussion
            });
            credentials = await db.users.findOne({
                where: {
                    [Op.or]: [
                        { google_id: sub },
                        { email: email }
                    ]
                },
                include:[{
                    model: db.type,
                    as: "type",
                    attributes:["type_name"]
                }],
                nest: true,
                raw:true
            });
        } else if(!credentials && !email_verified){
            return {
                success: false
            }
        }
        return {
            success: true,
            token: jwt.sign({email: email}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' }),
            type: credentials.type.type_name,
            auth_type: "google"
        };
    }

    async fbLogin(req, res){
        let credentials = await db.users.findOne({
            where: {
                fb_id: req.body.id
            },
            include:[{
                model: db.type,
                as: "type",
                attributes:["type_name"]
            }],
            nest: true,
            raw:true
        });
        if(!credentials){
            await db.users.create({
                email: "",
                fb_id: req.body.id,
                password: randomstring.generate(8),
                type_id: 1 //Subject for discussion
            });
            credentials = await db.users.findOne({
                where: {
                    fb_id: req.body.id
                },
                include:[{
                    model: db.type,
                    as: "type",
                    attributes:["type_name"]
                }],
                nest: true,
                raw:true
            });
        }
        return { 
            success: true,
            token: jwt.sign({email: req.body.id}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' }),
            type: credentials.type.type_name,
            auth_type: "fb"
        };
    }

    //TODO: Use this in every secured endpoint
    async checkToken(req, res) {
        //passport.authenticate('oauth-bearer', {session: false})
    }
}

module.exports = Account;