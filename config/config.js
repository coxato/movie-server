require("dotenv").config();

module.exports = {
    dev: process.env.DEV == 'development' ? true : false,
    offlinePort: process.env.OFFLINE_PORT,
    offlineDatabase: process.env.OFFLINE_DBNAME,
    offlineHost: process.env.OFFLINE_HOST,
    secret: process.env.SECRET,
    dbUSer: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbNameOnline: process.env.DB_NAME
}