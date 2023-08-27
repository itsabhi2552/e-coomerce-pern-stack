const getUser = require('../database/sql/getUser');

const check = (req, res, next) => {
    const { email } = req.body;

    getUser({ email }, (err, user) => {
        if (err) {
            req.body.msg = 'Something went wrong!';
        } else if(user.length !== 0) {
            req.body.user = user;
        } else {
            req.body.msg = 'User does not exists';
        }
        next();
    });
};

module.exports = check;