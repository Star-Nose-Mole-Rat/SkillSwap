const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const userController = require("./controllers/userController.js");
const cookieController = require("./controllers/cookieController.js");
const profileController = require("./controllers/profileController.js");

const PORT = 3000;

/* Automatically parse urlencoded body content and form data from
incoming requests and place it in req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Handle request for static files */
app.use(express.static(path.resolve(__dirname, "../dist")));

// root (homepage)
app.get("/", cookieController.setCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// login
app.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    // On successful login, redirects to search page
    return res.status(200).redirect("/search");
  }
);

// signup
app.get("/signup", (req, res) => {
  // Returns signup page
  return res.status(200).redirect("/signup");
});

// when making a post request to sign up on success will respond with 200
app.post(
  "/signup",
  userController.addUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.sendStatus(200);
  }
);
// from here will can do a port request or a
// app.use('/userprofile', profileRouter);
// app.use('/search', searchRouter);
// respond to a post request to /addSkill
// these are the pofile requests:
app.post("/addSkill/:user", profileController.addSkill);
app.get("/profile/:user", profileController.profile);



app.get('/profile', (req, res) => {
  return res.status(200);
});

// frontend login test 
// app.post('/login', (req, res) => {
//   return res.status(200).send({ points: 100, videos: ['abc', 'banana', 'water']});
// })


// frontend test search query
app.get('/searchKeyword', (req, res) => {
  console.log('query', req.query.searchword);
  return res.status(200).send(['banana', 'apple', 'pineapple']);
});



// frontend test for addvideo
app.get('/addvideo', (req, res) => {
  console.log('query.username', req.query.username)
  console.log('query.videouri', req.query.videouri);
  return res.status(200).send('addvideo OK');
})

//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An error occured');
    }
  });
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };

  //trigger it to run
  defaultErr.log = err.log;
  defaultErr.message = err.message;
  const errorObj = Object.assign({}, defaultErr);
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

// module.exports = app;
