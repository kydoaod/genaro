"use strict"

const db = require('../services/db.service');
const ObjectId = require('mongoose').Types.ObjectId;

class Lead {
    async sendLead(leadInputData){
        try{
            leadInputData.sender_id = new ObjectId(leadInputData.sender_id);
            let leadData = await db.leadModel.create(leadInputData);

            await db.eventModel.create({
                initiator_user: new ObjectId(leadInputData.sender_id),
                target_user: new ObjectId(leadInputData.sender_id), //Change this upon further specs update
                transaction_type: 'send-lead',
                title: 'Send lead to ' + leadInputData.client_name,
                contents: 'Send lead to ' + leadInputData.client_name,  //Change this upon further specs update
                details_url: '/v1/lead/' + leadData._id
            });

            return {
                success: leadData? true : false,
                lead: leadData
            };
        } catch(e){
            return {
                success: false,
                lead: null
            };
        }
    }

    async getLead(id){
        try{
            let leadData = await db.leadModel.find({
                _id: new ObjectId(id)
            });

            return {
                success: leadData? true : false,
                lead: leadData
            };
        } catch(e){
            console.log(e);
            return {
                success: false,
                lead: null
            };
        }
    }

    async getEvents(id){
        try{
            let eventData = await db.eventModel.find({
                initiator_user: new ObjectId(id)
            });

            return {
                success: eventData? true : false,
                events: eventData
            };
        } catch(e){
            console.log(e);
            return {
                success: false,
                events: null
            };
        }
    }
}


module.exports = Lead;