const setCart = require('../database/sql/setCart');
const jwt = require('jsonwebtoken');

const post = (req, res) => {
    const { token, productId } = req.body;
    const { userId } = jwt.verify(token, 'secret');

    setCart.removeCart(userId, productId, (err) => {
        if (err) {
            res.json({ err });
        } else {
            res.json({ success: 'success' });
        }
    });
};

module.exports = { post };