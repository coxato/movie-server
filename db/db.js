const { dev,
    offlineHost,
    offlinePort,
    offlineDatabase,
    dbUSer,
    dbNameOnline,
    dbPassword
} = require("../config/config");
const Mongo = require('./mongo');


let dbName, URI;
// is  development or production
if(dev){
    URI = `mongodb://${offlineHost}:${offlinePort}`;
    dbName = offlineDatabase;
    console.log("offline dbName", dbName);
}else{
    URI = `mongodb+srv://${dbUSer}:${dbPassword}@cluster0.awvdj.mongodb.net/test?retryWrites=true&w=majority`;
    dbName = dbNameOnline;
}

async function connectDB() {
    const mongo = new Mongo();
    return await mongo.connect(URI, dbName);
}

async function disconnectDB() {
    const mongo = new Mongo();
    return await mongo.disconnect();
}

module.exports = {
    connectDB,
    disconnectDB
}