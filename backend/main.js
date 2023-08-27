const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 3000;

const root = require('./routers/root');
const home = require('./routers/home');
const admin = require('./routers/admin');
const login = require('./routers/login');
const signup = require('./routers/signup');
const verifyEmail = require('./routers/verifyEmail');
const resetPassword = require('./routers/resetPassword');
const forgotPassword = require('./routers/forgotPassword');
const logout = require('./routers/logout');
const products = require('./routers/products');
const addToCart = require('./routers/addToCart');
const removeFromCart = require('./routers/removeFromCart');
const myCart = require('./routers/myCart');
const getCart = require('./routers/getCart');
const changeQuantity = require('./routers/changeQuantity');
const addNewProduct = require('./routers/addNewProduct');
const showAllProducts = require('./routers/showAllProducts');
const updateProduct = require('./routers/updateProduct');
const deactivateProduct = require('./routers/deactivateProduct');
const addOrder = require('./routers/addOrder');
const myOrder = require('./routers/myOrder');
const allOrder = require('./routers/allOrder');
const updateOrder = require('./routers/updateOrder');
const razorpay = require('./routers/razorpay');
const getUser = require('./routers/getUser');
const others = require('./routers/others');

const client = require('./database/sql/getClient');

app.use(express.static('public'));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

app.use(root);
app.use(home);
app.use(admin);
app.use(login);
app.use(signup);
app.use(verifyEmail);
app.use(resetPassword);
app.use(forgotPassword);
app.use(logout);
app.use(products);
app.use(addToCart);
app.use(removeFromCart);
app.use(myCart);
app.use(getCart);
app.use(changeQuantity);
app.use(addNewProduct);
app.use(showAllProducts);
app.use(updateProduct);
app.use(deactivateProduct);
app.use(addOrder);
app.use(myOrder);
app.use(allOrder);
app.use(updateOrder);
app.use(razorpay);
app.use(getUser);
app.use(others);

app.listen(port, () => {
    console.log(`Server is started at port ${port}...`);
});

client.connect((err) => {
    if (err) {
        console.log('Database (sql) not connected...');
    } else {
        console.log('Database (sql) connected...');
    }
});