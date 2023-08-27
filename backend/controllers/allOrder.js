const getOrder = require('../database/sql/getOrder');

const post = (req, res) => {

    getOrder.all((err, data) => {
        if(err) {
            res.json('err');
        } else {
            res.json(data);
        }
    });
};

module.exports = { post };