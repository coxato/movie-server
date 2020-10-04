const { dev,
    offlineHost,
    offlinePort,
    offlineDatabase,
    dbUSer,
    dbNameOnline,
    dbPassword,
    clusterName
} = require("../config/config");
const Mongo = require('./mongo');


let dbName, URI;
// is  development or production
if(dev){
    URI = `mongodb://${offlineHost}:${offlinePort}`;
    console.log("the OFF URI is ", URI);
    dbName = offlineDatabase;
}else{
    URI = `mongodb+srv://${dbUSer}:${dbPassword}@${clusterName}-ydbgb.mongodb.net/test?retryWrites=true&w=majority`;
    dbName = dbNameOnline;
}

async function connectDB() {
    const mongo = new Mongo();
    return await mongo.connect(URI, dbName);
}

async function disconnectDB() {
    const mongo = new Mongo();
    return await mongo.connect(URI, dbName);
}

module.exports = {
    connectDB,
    disconnectDB
}