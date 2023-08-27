const jwt = require('jsonwebtoken');
const getUser = require('../database/sql/getUser');

const post = (req, res) => {
    const { token } = req.body;
    const { userId } = jwt.verify(token, 'secret');

    getUser({ id: userId }, (err, data) => {
        res.json({
            name: data.username,
            email: data.email
        });
    })
};

module.exports = { post };