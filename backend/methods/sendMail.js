const nodemailer = require('nodemailer');

const sendMail = (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "rubie.cremin58@ethereal.email",
            pass: "Z2pSEfrAhJxeqvXXXf",
        }
    });

    let info = transporter.sendMail({
        from: '"Abhishek Pandey" <abhishekpandey@gmail.com>',
        to: data.email,
        subject: data.subject,
        text: data.text,
        html: data.html
    });
};

module.exports = sendMail;