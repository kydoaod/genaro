const userModel = require('../models/users');
const typeModel = require('../models/type');
const paymentModel = require('../models/payments');
const messageModel = require('../models/messages');
const leadModel = require('../models/lead');
const eventModel = require('../models/event');
const notificationModel = require('../models/notification');

const db = {
    userModel: userModel,
    typeModel: typeModel,
    paymentModel: paymentModel,
    messageModel: messageModel,
    leadModel: leadModel,
    eventModel: eventModel,
    notificationModel: notificationModel
};

(async () => {
    if((await db.typeModel.find({})).length == 0) {
        await typeModel.create({
            type_name: 'PRINCIPAL'
        });
        await db.typeModel.create({
            type_name: 'HERO'
        });
    }
    /*
    if((await db.paymentModel.find({})).length == 0) {
        let user = await db.userModel.findOne();
        await db.paymentModel.create({
            user_id: user._id,
            payment_type: 'withdraw',
            title: 'Withdrawal January 1',
            processing_date: new Date('2021-01-01')
        });
        await db.paymentModel.create({
            user_id: user._id,
            payment_type: 'deposit',
            title: 'Withdrawal January 1',
            processing_date: new Date('2021-01-01')
        });
        await db.paymentModel.create({
            user_id: user._id,
            payment_type: 'deposit',
            title: 'Withdrawal March 1',
            processing_date: new Date('2021-03-16')
        });
        await db.paymentModel.create({
            user_id: user._id,
            payment_type: 'deposit',
            title: 'Withdrawal April 1',
            processing_date: new Date('2021-04-02')
        });
        await db.paymentModel.create({
            user_id: user._id,
            payment_type: 'withdraw',
            title: 'Withdrawal January 1',
            processing_date: new Date('2020-01-01')
        });
    }*/
})();

module.exports = db;
