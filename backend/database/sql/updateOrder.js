const client = require('./getClient');

const updateOrder = (id, p_id, callback) => {
    client
        .query(`UPDATE ORDERS SET STATUS = 'deliverd' WHERE ID = '${id}' AND PRODUCTID = ${p_id}`)
        .then(data => callback(null))
        .catch(err => callback('err'));
};

module.exports = updateOrder;