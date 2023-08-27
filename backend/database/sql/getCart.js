const client = require('./getClient');

const getCart = (userId, callback) => {
    client
        .query(`SELECT * FROM CART  WHERE USERID = ${userId}`)
        .then(data => callback(null, data.rows))
        .catch(err => callback(err.stack, null));
};

module.exports = getCart;