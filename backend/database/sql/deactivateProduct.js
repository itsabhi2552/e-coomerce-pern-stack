const client = require('./getClient');

const deactivateProduct = (id, callback) => {
    client
        .query(`UPDATE PRODUCT SET STATUS = 'deactive' WHERE ID = ${id}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

module.exports = deactivateProduct;