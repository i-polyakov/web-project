const { MongoClient } = require('mongodb');

module.exports = async function(req, res, next) {

    const client  = new MongoClient("mongodb://localhost:27017/",{ useNewUrlParser: true, useUnifiedTopology: true });
    try {
         http_log = {
            date: new Date(),
            ip: req.ip,
            path: req.path,
            headers: req.headers, 
        }
        
        // Connect to the MongoDB cluster
        await  client.connect();
        
        //Запись в бд http логов
        const result = await  client.db("mongoDB").collection("http_logs").insertOne(http_log);
    

    }catch (e) {
        console.log(e);
    } finally {
        await client.close();   
        next();
    }

};

