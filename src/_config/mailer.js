const nodemailer = require('nodemailer');
require('dotenv').config();
const from = process.env.EMAIL_USER;

const mailer = {}

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: from,
        pass: process.env.EMAIL_PASS
    }
});

sendEmail = (to, subject, emailBody) => {
    customFrom = "'Atención TEGO' <" + from + ">"
    options = {from: customFrom, to: to, subject: subject, html: emailBody};
    transporter.sendMail(options, function(err, data) {
        if(err) {
            console.log('Nodemailer error: ', err);
        } else {
            console.log('Nodemailer successful: ' + data.messageId);
        };
    });
};

module.exports = { sendEmail };