const get = (req, res) => {
    const { username } = req.session.user;
    res.render('myCart', { username });
};

module.exports = { get };