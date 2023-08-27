const setProduct = require('../database/sql/setProduct');

const post = (req, res) => {

    setProduct(req, (err) => {
        if(err) {
            res.json('db error')
        } else {
            res.json('success');
        }
    });
};

module.exports = { post };