const updateProduct = require('../database/sql/updateProduct');

const post = (req, res) => {

    if(req.file) {
        req.body.image = req.file.filename;
    }

    updateProduct(req.body, (err) => {
        if(err) {
            res.json('err');
        } else {
            res.json('success');
        }
    });
};

module.exports = { post };