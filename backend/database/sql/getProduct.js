const client = require('./getClient');

const sizeOf = (no_of_product, starting_from, callback) => {
    client
        .query(`SELECT * FROM PRODUCT WHERE STATUS = 'active' ORDER BY ID LIMIT ${no_of_product} OFFSET ${starting_from}`)
        .then(data => callback(null, data.rows))
        .catch(err => callback(err.stack, null));
};

const specific = (id, callback) => {
    client
        .query(`SELECT * FROM PRODUCT WHERE ID = ${id}`)
        .then(data => {
            if (data.rows.length !== 0) {
                callback(null, data.rows[0])
            } else {
                callback(null, data.rows)
            }
        })
        .catch(err => callback(err.stack, null));
};

module.exports = { sizeOf, specific };