const jwt = require('jsonwebtoken');
const getOrder = require('../database/sql/getOrder');

const post = (req, res) => {
    const { token } = req.body;
    const { userId } = jwt.verify(token, 'secret');

    getOrder.myOrder(userId, (err, data) => {
        if(err) {
            res.json('err');
        } else {
            res.json(data);
        }
    });
};

module.exports = { post };