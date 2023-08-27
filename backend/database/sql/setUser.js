const client = require('./getClient');

const newUser = (user, callback) => {
    const { email, username, password } = user;

    client
        .query(`INSERT INTO USERS(EMAIL, USERNAME, PASSWORD) VALUES('${email}', '${username}', '${password}')`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

const password = (user, callback) => {
    const { id, password } = user;

    client
        .query(`UPDATE USERS SET PASSWORD = '${password}' WHERE ID = ${id}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

const verified = (user, callback) => {
    const { id } = user;

    client
        .query(`UPDATE USERS SET VERIFIED = TRUE WHERE ID = ${id}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

module.exports = { newUser, password, verified };