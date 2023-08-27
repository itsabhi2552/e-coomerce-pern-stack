const client = require('./getClient');
const setCart = require('./setCart');

const setOrder = async (userId, products, transactionid, orderid, callback) => {
    // let flag = false;

    try {
        await client.query(`BEGIN`);
        for (let i = 0; i < products.length; i++) {
            await client.query(`UPDATE PRODUCT SET QUANTITY = QUANTITY - ${products[i].cartquantity} WHERE ID = ${products[i].id}`);
            await client.query(`INSERT INTO ORDERS(USERID, PRODUCTID, QUANTITY, TARNSACTIONID, ID) VALUES(${userId}, ${products[i].id}, ${products[i].cartquantity}, '${transactionid}', '${orderid}')`);
            setCart.removeCart(userId, products[i].id, (err) => { if(err) { throw err; } }); 
        }
        await client.query(`COMMIT`);
        callback(false);
    } catch (err) {
        await client.query(`ROLLBACK`);
        callback(true);
    }

    // for (let i = 0; i < products.length; i++) {

    //     client
    //         .query(
    //             `INSERT INTO ORDERS(USERID, PRODUCTID, QUANTITY, TARNSACTIONID, ID) 
    //              VALUES(${userId}, ${products[i].id}, ${products[i].cartquantity}, '${transactionid}', '${orderid}')`
    //         )
    //         .then(data => {
    //             setCart.removeCart(userId, products[i].id, (err) => {
    //                 if (err) {
    //                     flag = true;
    //                 }
    //             });
    //         })
    //         .catch(err => {
    //             flag = true;
    //         });

    //     if (flag) {
    //         break;
    //     }
    // }

    // callback(flag);
};

module.exports = setOrder;