const { connectDB, disconnectDB } = require('./db/db');

const PORT = process.env.PORT || 5000;

// ===== server =====
let server;
function startServer(app){
    server = app.listen(PORT, () => {
        console.log(`server runnig on port ${PORT}`)
        process.on("SIGINT", closeServer);
        process.on("SIGTERM", closeServer);
    });
}

// disconnet mongo and close the server
async function closeServer(){
    try {
        await disconnectDB();
        console.log('db disconnected');
        server.close();
    } catch ({message}) {console.log("db error disconnection ",message)}
}

// ===== init mongodb =====
async function initMongo() {
    try { 
        return await connectDB();
    }
    catch ({message}) {
        console.log('error connecting mongodb', message);
    }
}

// ===== run app =====
async function runDBAndServer(app) {
    try {
        const mongo = await initMongo();
        if(mongo) startServer(app);
        return;
    } catch ({message}) {
        console.log("error trying to initialize app", message);
        throw new Error(message);
    }
}


exports.runDBAndServer = runDBAndServer;