const Role = require("../db/roles.js");
const User = require("../db/users.js");

const postgres_logs = require("../db/mongo/postgres_logs");

const Sequelize = require("sequelize");
const Op = Sequelize.Op


class UsersController {
    //-----------admin----------//
    async getUsersByLogin(req, res) {  //search
        let name=req.body.login;
        // console.log(name);
        if(!name)
            return res.json({messages: "Пустой запрос!"});
        User.findAll({
        where:{
            login:{
            [Op.substring]: name
            }
        }
        }).then(users=>{
            postgres_logs(req.user.login,"SELECT","users",null);
        if(users.length>0)
            res.json( users);
        else
            res.json({messages: "Пользователь не найден!"});
        }).catch(err=>{
            postgres_logs(req.user.login,"SELECT","users",err);
            console.log(err);
                });
        

    }
    async getUsersByRole(req, res) {  //search
        Role.findOne({
            where:{
              name:req.params.roleName
            }, 
            include: [
              { model: User         
                
              }
            ]
           
          })
          .then(role=>{
            postgres_logs(req.user.login,"SELECT","roles",null);

            if(role&&role.users.length>0)
                res.json( role.users);
            else if(!role)
                res.status(404).json({error_messages: "Такой роли нет!"});
            else
                res.json({messages: "Список пока пуст"});

          }).catch(err=>{
            postgres_logs(req.user.login,"SELECT","roles",err);
            console.log(err);
          });


    }
    async updateUser(req, res) {
       
        User.findOne({
            where:{ 
                login:req.params.login     
            }
        }).then(user=>{
            postgres_logs(req.user.login,"SELECT","users",null);
            if(!user){
                res.status(404).json({
                "error_messages":"Пользователь не найден!"    
                });       
            }
            else{ 
                Role.findOne({
                    where:{
                        name:req.body.role_name
                    }
                }).then(role=>{
                    postgres_logs(req.user.login,"SELECT","roles",null);
                    if(role)
                    user.update({role_id:role.id}).then(user=>{
                        postgres_logs(req.user.login,"UPDATE","users",user);
                            res.json({
                            "messages":"Роль обновлена!"
                            })
                        });
                    else
                        res.status(404).json({error_messages: "Такой роли нет!"});
                })   

            }
        }).catch(err=>{
            postgres_logs(req.user.login,"SELECT","users",err);
            console.log(err);
        });
    }
    async deleteUser(req, res) {
       
        User.destroy({
            where:{ 
                login:req.params.login     
            }
        }).then(row=>{
            postgres_logs(req.user.login,"DELETE","users",null);
            res.json({
              "rows_deleted":row
            });
      
        }).catch(err=>{
            postgres_logs(req.user.login,"SELECT","users",err);
            console.log(err);
        });
            
    }
      
}
module.exports = new UsersController();