const cookieController = {};

// set a cookie
cookieController.setCookie = (req, res, next) => {
    return next();
};

// store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
    return next();
};

module.exports = cookieController;
