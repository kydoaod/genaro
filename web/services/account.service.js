"use strict"

const db = require('../services/db.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const { OAuth2Client } = require('google-auth-library');
const ObjectId = require('mongoose').Types.ObjectId;

const client = new OAuth2Client(JSON.parse(process.env.GOOGLE_OAUTH_CRED).ClientID)
const saltRounds = 10;

class Account {
    async login(req, res){
        let credentials = await db.userModel.findOne({
            email: req.body.username
        });
        let type = credentials? await db.typeModel.findOne({ _id : credentials.type_id }) : null;
        if(bcrypt.compareSync(req.body.password, credentials.password)){
            return {
                user_id: credentials._id,
                success: true,
                token: jwt.sign({email: credentials.email}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' }),
                type: type.type_name,
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
        let credentials = await db.userModel.findOne({
            $or: [
                { google_id: sub },
                { email: email }
            ]
        });
        credentials = credentials? await credentials.populate('type').execPopulate() : null;
        let type = credentials? credentials.type : null;
        if(!credentials && email_verified){
            type = await db.typeModel.findOne({
                type_name: 'PRINCIPAL' //Subject for discussion
            });
            await db.userModel.create({
                name: name,
                email: email,
                google_id: sub,
                password: at_hash,
                type: (type._id)
            });
            credentials = await (await db.userModel.findOne({
                $or: [
                    { google_id: sub },
                    { email: email }
                ]
            })).populate('type').execPopulate();
        } else if(!credentials && !email_verified){
            return {
                success: false
            }
        }
        return {
            user_id: credentials._id,
            success: true,
            token: jwt.sign({email: email}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' }),
            type: credentials.type.type_name,
            auth_type: "google"
        };
    }

    async fbLogin(req, res){
        let credentials = await(await db.userModel.findOne({
            fb_id: req.body.id
        })).populate('type').execPopulate();
        let type = credentials? credentials.type : null;
        if(!credentials){
            type = await typeModel.findOne({
                type_name: 'PRINCIPAL' //Subject for discussion
            });
            await db.userModel.create({
                fb_id: req.body.id,
                password: randomstring.generate(8),
                type: type._id
            });
            credentials = await (await db.users.findOne({
                where: {
                    fb_id: req.body.id
                }
            })).populate('type').execPopulate();
        }
        return { 
            user_id: credentials._id,
            success: true,
            token: jwt.sign({email: req.body.id}, JSON.parse(process.env.ADMIN_CRED).algorithm, { expiresIn: '7d' }),
            type: credentials.type.type_name,
            auth_type: "fb"
        };
    }

    async getPayments(user_id){
        let payments = await db.paymentModel.find({
            user_id: new ObjectId(user_id)
        });
        return {
            success: payments? true : false,
            payments: payments
        };
    }

    async getAnalytics(user_id, group_by, start, end){
        let group = group_by == 'month'? {'month' : "$month" ,'year' : "$year" } : { 'year' : "$year" };
        let analytics = await db.paymentModel.aggregate([{ 
            $match: { 
                "user_id": new ObjectId(user_id), 
                'processing_date': { $gte: new Date( start + 'T00:00:00.000+00:00'), $lte: new Date(end + 'T00:00:00.000+00:00') }
            }
        },
        { 
            "$project": {
                "month": { "$month": "$processing_date" },
                "year": { "$year": "$processing_date" }, 
                "total": 1
            }
        }, 
        {
            "$group": {
                "_id": group, 
                "total": { "$sum": 1 }
            }
        },
        { 
            "$project": {
                "_id": false, 
                "date":'$_id',
                "total":'$total'
            }
        }]).exec();
        return {
            success: analytics? true : false,
            payments: analytics
        };
    }

    async getUsers(name=null, page=1, page_size=10){
        try{
            let whereClause = name? { name : { $regex : new RegExp(name, "i") } } : {};
            let userData = await db.userModel.find(whereClause)
                                             .select({ "name": 1, "_id": 1, "email": 1, "type": 1})
                                             .limit(page_size).skip((page - 1) * page_size)
                                             .populate('type')
                                             .exec();
            let total_page = await db.userModel.countDocuments(whereClause);
            return {
                success: userData? true : false,
                users: userData,
                total_page: Math.ceil(total_page/page_size)
            };
        } catch(e){
            console.log(e);
            return {
                success:  false,
                users: null,
                total_page: 0
            };
        }
    }

}

module.exports = Account;