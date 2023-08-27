const client = require('./getClient');

const addProduct = (data, callback) => {
    let image;
    const { name, price, description, quantity } = data.body;

    if(data.file) {
        image = data.file.filename;
    } else {
        image = '4';
    }

    client
        .query(`INSERT INTO PRODUCT(NAME, IMAGE, PRICE, DESCRIPTION, QUANTITY) 
        VALUES('${name}', '${image}', ${price}, '${description}', ${quantity})`)
        .then(data => callback(null))
        .catch(err => callback(err.stack));
};

module.exports = addProduct;