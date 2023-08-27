const getMyCart = require('../database/sql/getMyCart');
const jwt = require('jsonwebtoken');

const post = (req, res) => {

    const { token } = req.body;
    const { userId } = jwt.verify(token, 'secret');

    getMyCart(userId, (err, data) => {
        res.json(data);
    });
};

module.exports = { post };