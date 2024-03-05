var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/asn-db";

MongoClient.connect(url)
.then((db)=>{
  console.log("DB connected");
  db.close(); 
})
.catch((err)=>{
  console.log("err: "+err);
})
