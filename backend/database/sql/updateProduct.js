const client = require('./getClient');

const updateProduct = (data, callback) => {
    const { id, name, image, price, description, quantity } = data;
    // console.log(image);
    // return

    // if (image) {
    client
        .query(`UPDATE PRODUCT SET NAME = '${name}', IMAGE = '${image}',
        PRICE = ${price}, DESCRIPTION = '${description}', QUANTITY = ${quantity} 
        WHERE ID = ${id}`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
    // } else {
    //     client
    //         .query(`UPDATE PRODUCT SET NAME = '${name}', 
    //         PRICE = ${price}, DESCRIPTION = '${description}', QUANTITY = ${quantity} 
    //         WHERE ID = ${id}`)
    //         .then(data => callback(null))
    //         .catch(err => callback(err.stack));
    // }
};

module.exports = updateProduct;