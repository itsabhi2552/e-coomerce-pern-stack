const client = require('./getClient');

const getUser = (data, callback) => {
    const { id, email } = data;

    if (id) {
        client
            .query(`SELECT * FROM USERS WHERE ID = ${id}`)
            .then(data => {
                if (data.rows.length !== 0) {
                    callback(null, data.rows[0])
                } else {
                    callback(null, data.rows)
                }
            })
            .catch(err => callback(err.stack, null));
    } else {
        client
            .query(`SELECT * FROM USERS WHERE EMAIL = '${email}'`)
            .then(data => {
                if (data.rows.length !== 0) {
                    callback(null, data.rows[0])
                } else {
                    callback(null, data.rows)
                }
            })
            .catch(err => callback(err.stack, null));
    }
};

module.exports = getUser;