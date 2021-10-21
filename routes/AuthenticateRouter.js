const Router=require("express");
const router = new Router();

const AuthenticateController = require("../controllers/AuthenticateController");

// Funtion inside passport which initializes passport
router.use(AuthenticateController.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
router.use(AuthenticateController.session());

//router.use(http_logs);

router.post( "/login", function(req, res, next) {
  AuthenticateController.authenticate('login', function(err, user, info) {
    if (err) 
      return next(err); 

    if (!user)  
      return res.status(401).json(req.session.flash); 
    
    req.logIn(user, function(err) {
      if (err) 
       return next(err); 

      return res.json(user);
    });
  })(req, res, next);
  });


router.post( "/register", function(req, res, next) {
  AuthenticateController.authenticate('register', function(err, user, info) {
    if (err) 
     return next(err); 

    if (!user){
      console.log(req.session.flash);
      return res.status(409).json(req.session.flash); 
    }
   
    req.logIn(user, function(err) {
      if (err) 
       return next(err); 
     
      return res.json(user);
    });
  })(req, res, next);
  });

  router.get("/logOut", (req, res) => {
    req.logout();
    res.json("User logged out")     
  });
  
router.get("/register", checkAuthenticated, (req, res) => {
    res.render(__dirname + "/../src/ejs/register.ejs");
});

router.get("/", checkAuthenticated, (req, res) => {
    res.render(__dirname + "/../src/ejs/login.ejs");
});

router.get("/login", checkAuthenticated, (req, res) => {
  
    res.render(__dirname + "/../src/ejs/login.ejs");
});

/*router.get("/logOut", (req, res) => {
	req.logout();
    res.render(__dirname + "/../src/ejs/login.ejs");
});
*/

function checkAuthenticated(req, res, next) {
 
  if (req.isAuthenticated()) 
    return res.redirect("/index");
  
  next();
}


module.exports = router;