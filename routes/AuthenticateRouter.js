const Router=require("express");
const router = new Router();
const AuthenticateController = require("../controllers/AuthenticateController");

// Funtion inside passport which initializes passport
router.use(AuthenticateController.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
router.use(AuthenticateController.session());



router.post( "/login", AuthenticateController.authenticate("login", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.post( "/register", AuthenticateController.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/register",
    failureFlash: true
  })
);


router.get("/register", checkAuthenticated, (req, res) => {
    res.render(__dirname + "/../src/ejs/register.ejs");
});

router.get("/", checkAuthenticated, (req, res) => {
    res.render(__dirname + "/../src/ejs/login.ejs");
});

router.get("/login", checkAuthenticated, (req, res) => {
    res.render(__dirname + "/../src/ejs/login.ejs");
});

router.get("/logOut", (req, res) => {
	req.logout();
    res.render(__dirname + "/../src/ejs/login.ejs");
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
    return res.redirect("/index");
  
  next();
}


module.exports = router;