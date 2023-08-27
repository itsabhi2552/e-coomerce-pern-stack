const getUser = require('../database/sql/getUser');
const setUser = require('../database/sql/setUser');
const jwt = require('jsonwebtoken');

const get = (req, res) => {
    const { id } = req.params;

    if (req.params.redirectPage === 'resetPassword') {
        console.log('hey');
    } else {
        getUser({ id }, (err, user) => {
            if (user) {
                setUser.verified(user, (err) => {
                    req.session.user = user;
                    req.session.user.verified = true;
                    req.session.validUser = true;
                    const token = jwt.sign({ userId: user.id }, 'secret');

                    res.json({ username: user.username, role: user.role, token });
                });
            } else {
                res.redirect('/home');
            }
        });
    }
};

module.exports = { get };