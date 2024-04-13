const homeController = {};

homeController.postNewUser = (req, res, next) => {
  res.locals.newUserEmail = req.body('email');
  res.locals.newUserPassword = req.body('password');
  console.log(
    'newUserEmail',
    res.locals.newUserEmail,
    'newUserPassword',
    res.locals.newUserPassword
  );
  next();
};

module.exports = homeController;
