const chai  = require('chai');  // Using Expect style
const { expect }= require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);


//1. unit under test
var agent = chai.request.agent("http://127.0.0.1:8080");
describe('Films Controller', function() {
 
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
    
//-----------user----------//
  describe('Search filmsbyname', function() {
    //2. scenario and 3. expectation
    it("Если запрос пустой, то ожидается сообщение: Пустой запрос!", (done)=> {
      agent
      .post('/film')
      .send({"search": ""})
      .end((err, res) => {   
        expect(res.body.messages).to.equal( 'Пустой запрос!' );
        done();                
      });
    });

    it("Если запрос правильный, то ожидается статус 200", (done)=> {
      agent
      .post('/film')
      .send({"search": "test"})
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });
  
  describe('watchFilms', function() {
    //2. scenario and 3. expectation   
    it("Если запрос правильный, то ожидается статус 200", (done)=> {
      agent
      .get('/watchFilms')
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });

  describe('ViewedFilms', function() {
    //2. scenario and 3. expectation   
    it("Если запрос правильный, то ожидается статус 200", (done)=> {
      agent
      .get('/ViewedFilms')
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });

  describe('(watchFilm) Добавить фильм в список посмотрю', function() {
    //2. scenario and 3. expectation
    it("Если фильм с задданным id не существует, то ожидается статус 404", (done)=> {
      agent
      .post('/watchFilm')
      .send({"film": -5})
      .end((err, res) => {   
        expect(res.status).to.equal(404);
        done();                
      });
    });

    it("Если фильм с задданным id существует, то ожидается статус 200", (done)=> {
      agent
      .post('/watchFilm')
      .send({
        "film":{
            "id":5
        }
    })
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });
  describe('(unwatchFilm) Удалить фильм из списка посмотрю', function() {
    //2. scenario and 3. expectation
    it("Если фильм был удален, либо его нет в списке, то вернёт ключ rows_deleted", (done)=> {
      agent
      .delete('/unwatchFilm')
      .send({
        "film":{
            "id":5
        }
    })
      .end((err, res) => { 
        
        expect(res.body).to.have.key('rows_deleted');

        done();
      });
    });
    it("Если запрос правильный, ожидается статус 200", (done)=> {
      agent
      .delete('/unwatchFilm')
      .send({
        "film":{
            "id":5
        }
    })
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });

  describe('(viewedFilm) Добавить фильм в список посмотрел', function() {
    //2. scenario and 3. expectation
    it("Если фильм с задданным id не существует, то ожидается статус 404", (done)=> {
      agent
      .post('/viewedFilm')
      .send({"film": -5})
      .end((err, res) => {   
        expect(res.status).to.equal(404);
        done();                
      });
    });

    it("Если фильм с задданным id существует, то ожидается статус 200", (done)=> {
      agent
      .post('/viewedFilm')
      .send({
        "film":{
            "id":5
        }
    })
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });
  describe('(unviewedFilm) Удалить фильм из списка посмотрел', function() {
    //2. scenario and 3. expectation
    it("Если фильм был удален, либо его нет в списке, то вернёт ключ rows_deleted", (done)=> {
      agent
      .delete('/unviewedFilm')
      .send({
        "film":{
            "id":5
        }
    })
      .end((err, res) => { 
        
        expect(res.body).to.have.key('rows_deleted');

        done();
      });
    });
    it("Если запрос правильный, ожидается статус 200", (done)=> {
      agent
      .delete('/unwatchFilm')
      .send({
        "film":{
            "id":5
        }
    })
      .end((err, res) => {   
        expect(res.status).to.equal(200);
        done();                
      });
    });
  });


});
