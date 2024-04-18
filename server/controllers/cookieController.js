const cookieController = {};

// store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
    // Convert userID to a string
    const userID = res.locals.userID.toString();
    // Set userID as ssid cookie
    res.cookie('ssid', userID);
    return next();
};

// check if user is already verified
cookieController.isLoggedIn = (req, res, next) => {
    console.log(req.cookies);
    return next();
};

module.exports = cookieController;
