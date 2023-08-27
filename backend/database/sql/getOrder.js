const client = require('./getClient');

const all = (callback) => {
    client
        .query(
            `SELECT ORDERS.TARNSACTIONID, ORDERS.ID AS ORDERID, ORDERS.USERID, ORDERS.PRODUCTID, 
             ORDERS.QUANTITY, ORDERS.STATUS, PRODUCT.PRICE, USERS.EMAIL
             FROM ORDERS
             INNER JOIN PRODUCT
             ON PRODUCT.ID = ORDERS.PRODUCTID
             INNER JOIN USERS
             ON USERS.ID = ORDERS.USERID
             ORDER BY ORDERS.PRODUCTID`
        )
        .then(data => callback(null, data.rows))
        .catch(err => callback(err.stack, null));
};

const myOrder = (userId, callback) => {
    client
        .query(
            `SELECT ORDERS.ID, ORDERS.QUANTITY, ORDERS.STATUS, ORDERS.TARNSACTIONID,
             PRODUCT.IMAGE, PRODUCT.NAME, PRODUCT.PRICE, PRODUCT.DESCRIPTION 
             FROM ORDERS
             INNER JOIN PRODUCT
             ON PRODUCT.ID = ORDERS.PRODUCTID
             WHERE USERID = ${userId}`
        )
        .then(data => callback(null, data.rows))
        .catch(err => callback(err.stack, null));
};

module.exports = { myOrder, all };
