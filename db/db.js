const { dev,
    offlineHost,
    offlinePort,
    offlineDatabase,
    dbUSer,
    dbNameOnline,
    dbPassword
} = require("../config/config");
const mongo = require('./mongo');


let dbName, URI;
// is  development or production
if(dev){
    URI = `mongodb://${offlineHost}:${offlinePort}/`;
    dbName = offlineDatabase;
}else{
    URI = `mongodb+srv://${dbUSer}:${dbPassword}@cluster0.awvdj.mongodb.net/test?retryWrites=true&w=majority`;
    dbName = dbNameOnline;
}

async function connectDB() {
    return await mongo.connect(URI, dbName);
}

async function disconnectDB() {
    return await mongo.disconnect();
}

module.exports = {
    connectDB,
    disconnectDB
}