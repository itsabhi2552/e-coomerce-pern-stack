const get = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

module.exports = { get };