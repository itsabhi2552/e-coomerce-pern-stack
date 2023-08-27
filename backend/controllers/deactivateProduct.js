const deactivateProduct = require('../database/sql/deactivateProduct');

const post = (req, res) => {
    const { id } = req.body;

    deactivateProduct(id, (err) => {
        if(err) {
            res.json({ err });
        } else {
            res.json({ success: 'success' });
        }
    });
};

module.exports = { post };