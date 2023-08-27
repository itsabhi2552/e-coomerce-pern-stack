const check = (req, res, next) => {
    const { validUser } = req.session;
    const { user } = req.session;

    if (user && user.role === 'admin' && validUser) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = check;