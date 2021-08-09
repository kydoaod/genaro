"use strict"

const db = require('../services/db.service');
const ObjectId = require('mongoose').Types.ObjectId;


class Message {

    async getMessages(user_id){
        let messages = await db.messageModel.find({
            user_id: new ObjectId(user_id)
        }).populate("user_id sender_id", "name").exec();
        return {
            success: messages? true : false,
            messages: messages
        };
    }

    async getMessage(user_id, message_id){
        let message = await db.messageModel.findOne({
            user_id: new ObjectId(user_id),
            _id: new ObjectId(message_id)
        }).populate("user_id sender_id", "name").exec();
        return {
            success: message? true : false,
            messages: message
        };
    }

    async sendMessage(messageData){
        try{
            messageData.user_id = new ObjectId(messageData.user_id);
            messageData.sender_id = new ObjectId(messageData.sender_id);
            let message = await db.messageModel.create(messageData);
            let notificationData = await db.notificationModel.findOne({
                user_id: messageData.user_id 
            });
            let messageDetails = await db.messageModel.findOne({
                _id: new ObjectId(message._id),
                user_id: messageData.user_id
            }).populate("user_id sender_id", "name").exec();
            if(notificationData){
                notificationData.notification_data.push({
                    notif_type: 'message',
                    description: 'You have receive message from ' + messageDetails.sender_id.name,
                    data_url: '/v1/message-details?user_id=' + messageData.user_id + '&message_id=' + message._id,
                    web_url: '/message-details?user_id=' + messageData.user_id + '&message_id=' + message._id
                })
                await notificationData.save();
            } else {
                await db.notificationModel.create({
                    user_id: messageData.user_id,
                    notification_data: [{
                        notif_type: 'message',
                        description: 'You have receive message from ' + messageDetails.sender_name,
                        data_url: '/v1/message-details?user_id=' + messageData.user_id + '&message_id=' + message._id,
                        web_url: '/message-details?user_id=' + messageData.user_id + '&message_id=' + message._id
                    }]
                })
            }
            return {
                success: message? true : false,
                messages: message
            };
        } catch(e){
            console.log(e);
            return {
                success: false,
                messages: null
            };
        }
    }

}

module.exports = Message;