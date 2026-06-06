const flash = (req, res, next) => {
    res.locals.messages = {
        success: req.session?.success || null,
        error: req.session?.error || null
    };

    req.flash = (type, message) => {
        if (!req.session) return;

        req.session[type] = message;
    };

    next();
};

export default flash;