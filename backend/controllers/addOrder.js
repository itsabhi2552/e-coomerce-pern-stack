const setOrder = require('../database/sql/setOrder');
const jwt = require('jsonwebtoken');

const post = (req, res) => {
    const { token, products, transactionid, orderid } = req.body;
    const { userId } = jwt.verify(token, 'secret');

    setOrder(userId, products, transactionid, orderid, (err) => {
        if(err) {
            res.json('err');
        } else {
            res.json('success');
        }
    })
};

module.exports = { post };