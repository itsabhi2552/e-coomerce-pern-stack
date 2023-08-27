const updateOrder = require("../database/sql/updateOrder");

const post = (req, res) => {
    const { id, p_id } = req.body;

    updateOrder(id, p_id, (err) => {
        if(err) {
            res.json('err');
        } else {
            res.json('success');
        }
    });
};

module.exports = { post };