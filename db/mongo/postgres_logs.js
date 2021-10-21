const { MongoClient } = require('mongodb');

module.exports = async function(name, operation,table_name,saved_data) {

    const client  = new MongoClient("mongodb://localhost:27017/",{ useNewUrlParser: true, useUnifiedTopology: true });
    try {
         postgres_log = {
            date: new Date(),
            user_name:name,
            operation: operation,
            table_name: table_name,
            saved_data:saved_data       
        }
        
        // Connect to the MongoDB cluster
        await  client.connect();
      
        //Запись в бд postgres логов
        const result = await  client.db("mongoDB").collection("postgres_logs").insertOne(postgres_log);
       

    }catch (e) {
        console.log(e);
    } finally {
        await client.close();   
    }

};

