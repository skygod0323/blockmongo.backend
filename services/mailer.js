/**
 * Created by ApolloYr on 4/5/2018.
 */
'use strict';
const nodemailer = require('nodemailer');


exports.sendMail = function (to, subject, output, callBack) {
    var transporter = nodemailer.createTransport({
        host: 'n3plcpnl0004.prod.ams3.secureserver.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'r43ufvtm1ht1@coincrypt.com', // generated ethereal user
            pass: '<eJJ37hM"2Aa' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"Fred Foo 👻" <r43ufvtm1ht1@coincrypt.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callBack(error)
            return console.log(error);
        }

        callBack(null, info)
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}