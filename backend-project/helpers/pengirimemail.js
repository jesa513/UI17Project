const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jsetiadi512@gmail.com',
        pass: 'ladqoklntairqyoj'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;