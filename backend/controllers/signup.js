const sendMail = require('../methods/sendMail');
const setUser = require('../database/sql/setUser');
const getUserBody = require('../methods/getUserBody');
const getEmail = require('../methods/getUserVerificationEmail');

const get = (req, res) => {
    res.render('signup', { msg: '', value: 'Create', backBtn: '' });
};

const post = (req, res) => {
    const { msg } = req.body;

    if (msg) {
        const { email, username, password } = req.body;

        getUserBody({ email, username, password }, (user) => {
            setUser.newUser(user, (err) => {
                if (err) {
                    res.json({ error: 'Something went wrong!' });
                } else {
                    getEmail(user, (email) => {
                        sendMail(email);
                        res.json({ error: 'Pending email verification!' });
                    });
                }
            });
        });
    } else {
        res.json({ error: 'User already have a account' });
    }
};

module.exports = { get, post };