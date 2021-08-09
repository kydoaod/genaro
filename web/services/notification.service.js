"use strict"

const db = require('../services/db.service');
const ObjectId = require('mongoose').Types.ObjectId;

class Notification {

    async getNotifications(user_id){
        try{
            let notifications = await db.notificationModel.findOne({
                user_id: new ObjectId(user_id)
            });
            return {
                success: notifications? true : false,
                notifications: notifications
            };
        } catch(e){
            console.log(e);
            return {
                success: false,
                notifications: null
            };
        }
    }

    async removeNotification(user_id, notification_id){
        try{
            let notification = await db.notificationModel.findOne({
                user_id: new ObjectId(user_id)
            });
            if(notification){
                let notification_index = notification.notification_data.findIndex(r => r._id == (notification_id));
                if(notification_index > -1){
                    notification.notification_data.splice(notification_index, 1);
                    await notification.save();
                }
                return {
                    success: notification? true : false,
                    notification: notification
                };
            } else{  
                return {
                    success: false,
                    notification: null
                };
            }
        } catch(e){
            console.log(e);
            return {
                success: false,
                notification: null
            };
        }
    }
}

module.exports = Notification;