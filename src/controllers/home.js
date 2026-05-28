const showHomePage = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};

module.exports = {
    showHomePage
};