const sendMail = require('../methods/sendMail');
const getEmail = require('../methods/getForgotPasswordEmail');
const jwt = require('jsonwebtoken');

const get = (req, res) => {
    res.render('forgotPassword', { error: '' });
};

const post = (req, res) => {
    if (req.body.user) {
        req.body.user.token = jwt.sign({ userId: req.body.user.id }, 'secret');
        getEmail(req.body.user, (email) => {
            sendMail(email);
            res.json('Email Sent');
        });
    } else {
        res.json(req.body.msg);
    }
};

module.exports = { get, post };