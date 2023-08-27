const client = require('./getClient');

const newCart = (userId, productId, callback) => {
    client
        .query(`INSERT INTO CART VALUES('${userId}', '${productId}')`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

const removeCart = (userId, productId, callback) => {
    client
        .query(`DELETE FROM CART WHERE USERID = ${userId} AND PRODUCTID = ${productId}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

const quantityIncrease = (userId, productId, callback) => {
    client
        .query(`UPDATE CART SET QUANTITY = 
        (SELECT QUANTITY WHERE USERID = ${userId} AND PRODUCTID = ${productId}) + 1
        WHERE USERID = ${userId} AND PRODUCTID = ${productId}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

const quantityDecrease = (userId, productId, callback) => {
    client
        .query(`UPDATE CART SET QUANTITY = 
        (SELECT QUANTITY WHERE USERID = ${userId} AND PRODUCTID = ${productId}) - 1
        WHERE USERID = ${userId} AND PRODUCTID = ${productId}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

module.exports = { newCart, removeCart, quantityIncrease, quantityDecrease };