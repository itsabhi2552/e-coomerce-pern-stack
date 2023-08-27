const getProduct = require('../database/sql/getProduct');

const get = (req, res) => {
    const { username } = req.session.user;
    res.render('showAllProducts', { username });
};

const post = (req, res) => {
    const no_of_products = 100;
    const starting_from = 0;

    getProduct.sizeOf(no_of_products, starting_from, (err, data) => {
        res.json(data);
    });
};

module.exports = { get, post };