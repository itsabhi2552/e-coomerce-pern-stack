const razorpay = require('razorpay');

const instance = new razorpay({
    key_id: 'rzp_test_7W7EkLGJyTeS7c',
    key_secret: 'g88AB0gfVi9J235ACdarES3s'
});

module.exports = async (req, res) => {

    const { products } = req.body;
    let amount = 0;

    products.map((item, index) => {
        amount += item.price * item.cartquantity;
    });

    const response = await instance.orders.create({
        amount: (amount * 100).toString(),
        currency: 'INR',
        receipt: 'hey',
        payment_capture: 1
    });

    res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
    });
};