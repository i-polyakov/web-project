const chai  = require('chai');  // Using Expect style
const { expect }= require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);


//1. unit under test
var agent = chai.request.agent("http://127.0.0.1:8080");
describe('Users Controller', function() {
 
  beforeEach(done => {
    agent.post('/login')
      .send({
        "username":"admin",
        "password":"admin"
    })
      .end((err, res) => {
       
        done();                
      });
    });
//-----------admin----------//
  describe('(getUsersByRole) Получить список пользователей по роли', function() {
    //2. scenario and 3. expectation
    it("Если роли нет, то ожидается error_messages: Такой роли нет!", (done)=> {
      agent
      .get('/users/motor')
      .end((err, res) => {   
        expect(res.body.error_messages).to.equal( 'Такой роли нет!' );
        done();                
      });
    });
    
    it("Если запрос правильный, то ожидается статус 200", (done)=> {
      agent
      .get('/users/moderator')
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });
  

  describe('(getUsersByLogin) Поиск по логину', function() {
    //2. scenario and 3. expectation   
    it("Если запрос пустой, то ожидается сообщение: Пустой запрос!", (done)=> {
        agent
        .post('/users')
        .send({
            "login":""
        })
        .end((err, res) => {   
          expect(res.body.messages).to.equal( 'Пустой запрос!' );
          done();                
        });
      });
      it("Если пользователи не найдены, то ожидается сообщение: Пользователь не найден!", (done)=> {
          agent
          .post('/users')
          .send({
              "login":"-1"
          })
          .end((err, res) => {   
              expect(res.body.messages).to.equal( 'Пользователь не найден!' );
            done();                
          });
  
      it("Если запрос правильный, то ожидается статус 200", (done)=> {
        agent
        .post('/users')
        .send({
            "login":"user"
        })
        .end((err, res) => {   
          expect(res.status).to.equal(200);
          done();                
        });
      });
    });
  });

  describe('(updateUser) Изменить роль пользователя', function() {
    //2. scenario and 3. expectation   

    it("Если искомый пользователь отсутствует, то ожидается error_messages: Пользователь не найден!", (done)=> {
        agent
        .put('/changeRole/-1')
        .send({
          "role_name":"moderator"
          })
        .end((err, res) => {   
            expect(res.body.error_messages).to.equal( 'Пользователь не найден!' );
          done();                
        });
      });
      it("Если искомый пользователь найден и роль существует, то ожидается messages: Роль обновлена!", (done)=> {
        agent
        .put('/changeRole/moder')
        .send({
          "role_name":"moderator"
          })
        .end((err, res) => {   
            expect(res.body.messages).to.equal( 'Роль обновлена!' );
          done();                
        });
      });
      it("Если искомый пользователь найден но роль отсутствует, то ожидается error_messages: Такой роли нет!, статус 404", (done)=> {
        agent
        .put('/changeRole/user1')
        .send({
          "role_name":"moder"
          })
        .end((err, res) => {   
            expect(res.body.error_messages).to.equal( 'Такой роли нет!' );
            expect(res.status).to.equal(404);
          done();                
        });
      });
  });

  describe('(deleteUser) Удалить пользователя', function() {
    //2. scenario and 3. expectation
    it("Если пользователь был удален, либо его  не существует, то вернёт ключ rows_deleted", (done)=> {
        agent
        .delete('/deleteUser/user6')
        .end((err, res) => { 
          
          expect(res.body).to.have.key('rows_deleted');
  
          done();
        });
      });
      it("Если запрос правильный, ожидается статус 200", (done)=> {
        agent
        .delete('/deleteUser/user6')
        .end((err, res) => {   
          expect(res.status).to.equal(200);
          done();                
        });
      });
    });
 
  
});
