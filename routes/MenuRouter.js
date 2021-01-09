const Router=require("express");
const router = new Router();
const MenuController = require("../controllers/MenuController");



router.get("/index", checkNotAuthenticated, MenuController.mainPage);

router.get("/watch", checkNotAuthenticated, MenuController.watchPage);
router.get("/viewed", checkNotAuthenticated, MenuController.viewedPage);
router.get("/about", checkNotAuthenticated, MenuController.aboutPage);


router.get("/searching", checkNotAuthenticated, MenuController.searchPage);


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
    return next();
  
  res.redirect("/login");
}



module.exports = router;