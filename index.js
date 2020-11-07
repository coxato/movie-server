const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const useRoutes = require("./routes/index");
const { connectDB, disconnectDB } = require('./db/db');


const app = express();
const PORT = process.env.PORT || 5000;
// middlewares
app.use(express.json({}));
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(morgan('dev'));
// routes
useRoutes(app);

// ===== server =====
let server;
function startServer(){
    server = app.listen(PORT, () => {
        console.log(`server runnig on port ${PORT}`)
        process.on("SIGINT", closeServer);
        process.on("SIGTERM", closeServer);
    });
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

// disconnet mongo and close the server
async function closeServer(){
    try {
        await disconnectDB();
        console.log('db disconnected');
        server.close();
    } catch ({message}) {console.log("db error disconnection ",message)}
}

// ===== run app =====
async function RUN() {
    try {
        const mongo = await initMongo();
        if(mongo) startServer();
    
    } catch ({message}) {
        console.log("error trying to initialize app", message);
    }
}

RUN();