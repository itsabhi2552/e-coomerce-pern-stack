const getUserBody = (data, callback) => {
    const user = {
        email: data.email,
        username: data.username,
        password: data.password
    };

    callback(user);
};

module.exports = getUserBody;