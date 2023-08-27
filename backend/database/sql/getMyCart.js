const client = require('./getClient');

const getMyCart = (userid, callback) => {
    client
        .query(`SELECT PRODUCT.*, CART.QUANTITY CARTQUANTITY FROM PRODUCT 
                INNER JOIN CART ON CART.PRODUCTID = PRODUCT.ID 
                WHERE CART.USERID = ${userid} AND PRODUCT.STATUS = 'active' 
                ORDER BY PRODUCTID`)
        .then(data => callback(null, data.rows))
        .catch(err => callback(err.stack, null));
};

module.exports = getMyCart;