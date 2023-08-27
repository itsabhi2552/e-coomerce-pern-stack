const get = (req, res) => {
    const { username } = req.session.user;
    res.render('home', { username });
};

module.exports = { get };