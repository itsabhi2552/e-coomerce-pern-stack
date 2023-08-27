const client = require('./getClient');

const getQuantity = (userId, productId, callback) => {
    client
        .query(`SELECT QUANTITY FROM CART WHERE USERID = ${userId} AND PRODUCTID = ${productId}`)
        .then(data => callback(null, data.rows[0]))
        .catch(err => callback(err.stack, null));
};

module.exports = getQuantity;