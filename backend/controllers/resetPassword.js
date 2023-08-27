const sendMail = require('../methods/sendMail');
const getUser = require('../database/sql/getUser');
const setUser = require('../database/sql/setUser');
const getEmail = require('../methods/getResetPasswordEmail');
const jwt = require('jsonwebtoken');

const get = (req, res) => {
    if (req.session.user) {
        res.render('resetPassword', { id: req.session.user.id, value: 'Reset', backBtn: 'Yes' });
    } else {
        res.redirect('/login');
    }
};

const post = (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const id = jwt.verify(token, 'secret').userId;

    getUser({ id }, (err, user) => {
        if (err) {
            res.render('resetPassword', { id, value: 'Reset', backBtn: 'Yes' });
        } else {
            setUser.password({ id, password }, (err) => {
                getEmail(user, (email) => {
                    sendMail(email);
                    res.json('Success');
                });
            });
        }
    });
};

module.exports = { get, post };