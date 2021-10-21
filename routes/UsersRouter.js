
const Router=require("express");
const router = new Router();
const UsersController = require("../controllers/UsersController");

//-----------admin----------//
router.post("/users", checkNotAuthenticated, UsersController.getUsersByLogin)//пользователи с похожим логином
router.get("/users/:roleName", checkNotAuthenticated, UsersController.getUsersByRole);//вывести пользователей по роли
router.put("/changeRole/:login", checkNotAuthenticated, UsersController.updateUser);//изменить уровень доступа  
router.delete("/deleteUser/:login", checkNotAuthenticated, UsersController.deleteUser);//удалить пользователя  

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        if(req.user.role_id!=2)
            res.status(403).json({
            "error_messages":"Нет прав!"
        
            })
        return next();    
    }    
    res.json("User not logged!")   
    //res.redirect("/login");
  }
  
  

  
  module.exports = router;