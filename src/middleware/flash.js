module.exports = (req, res, next) => {

    if (!req.session.messages) {
        req.session.messages = [];
    }

    req.flashMessage = (message) => {
        req.session.messages.push(message);
    };

    res.locals.messages = req.session.messages;

    req.session.messages = [];

    next();
};