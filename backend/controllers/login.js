const jwt = require('jsonwebtoken');

const post = (req, res) => {

    const { msg, password } = req.body;

    if (msg) {
        res.json({ error: msg });
    } else {
        const { user } = req.body;

        if (password === user.password) {

            if (user.verified) {
                const token = jwt.sign({ userId: user.id }, 'secret');

                res.json({ username: user.username, role: user.role, token });
            } else {
                res.json({ error: 'Pending Email Verification' });
            }
        } else {
            res.json({ error: 'Incorrect Password' });
        }
    }
};

module.exports = { post };