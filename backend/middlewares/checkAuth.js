const check = (req, res, next) => {
    const { url } = req;
    const { validUser } = req.session;
    const { user } = req.session;

    if (url === '/admin') {
        if (user && user.role === 'admin' && validUser) {
            next();
        } else {
            res.redirect('/login');
        }
    } else if (url === '/home') {
        if (user && user.role === 'admin' && validUser) {
            res.redirect('/admin');
        } else if (validUser) {
            next();
        } else {
            res.redirect('/login');
        }
    } else if (url === '/login' || url === '/signup') {
        if (validUser) {
            res.redirect('/home');
        } else {
            next();
        }
    } else {
        if (validUser) {
            next();
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = check;