const MongoClient = require("mongodb").MongoClient;
const mongoClientOptions = { useNewUrlParser: true,  useUnifiedTopology: true };

// mongoDB instance
// ###########################
let instance;
let dbName;
// ###########################

class MongoServices {
    constructor(){ }

    /**
     * @param {string} URI
     * @param {string} dbname
     * @returns `true || false || error` depends if connection is succesfully or not.
     * 
     * NOTE: this is a singleton, so if it returns `false` is because a mongodb connection is already initialized,
     * instead if it returns an `error` it is because said instance could not be created.
     * 
     * only returns `true` when connection is initialized by first time
     */
    async connect(URI, dbname){
        try {
            if(!instance){
                // set first and unique connection
                const client = new MongoClient(URI, mongoClientOptions);
                instance = await client.connect();
                dbName = dbname;
                return true;
            }
            return false;

        } catch ({message}) {
            throw new Error(message);
        }
    }
    
    async disconnect(){
        try {
            if(instance) await instance.close();
            return true;
        } catch ({message}) {
            throw new Error({message})
        }
    }

    // ===================   CRUD   ====================
    // ## insert ##
    /**
     * 
     * @param {string} collection 
     * @param {object} query 
     * @returns {Promise}
     */
    insertOne(collection, query){
        return instance.db(dbName).collection(collection).insertOne(query);
    }

    /**
     * 
     * @param {string} collection 
     * @param {Array} arr 
     * @returns {Promise}
     */
    insertMany(collection, arr){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .insertMany(arr);
    }
    // ## find ##
    /**
     * 
     * @param {string} collection 
     * @param {object} query 
     * @param {object} projection 
     * @returns {Promise}
     */
    find(collection, query, projection = null){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .find(query)
                 .project(projection)
                 .toArray();    
    }

    /**
     * 
     * @param {string} collection 
     * @param {object} query 
     * @param {object} projection 
     * @returns {Promise}
     */
    findOne(collection, query, projection = null){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .findOne(query, { projection });

    }
    // ## update ##
    /**
     * 
     * @param {string} collection 
     * @param {object} query 
     * @param {object} newValue 
     * @returns {Promise}
     */
    updateOne(collection, query, newValue){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .updateOne(query, newValue);
    }

    /**
     * 
     * @param {string} collection 
     * @param {object} query 
     * @returns {Promise}
     */
    updateMany(collection, query){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .updateMany(query);
    }
    // ## delete ##
    /**
     * 
     * @param {string} collection 
     * @param {object} query
     * @returns {Promise}
     */
    deleteOne(collection, query){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .deleteOne(query);
    }

    /**
     * 
     * @param {string} collection 
     * @param {object} query 
     * @returns {Promise}
     */
    deleteMany(collection, query){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .deleteMany(query);
    }
    // ## drop ##
    /**
     * 
     * @param {string} collection 
     * @returns {Promise}
     */
    dropCollection(collection){
        return instance
                 .db(dbName)
                 .collection(collection)
                 .drop();
    }

}

module.exports = new MongoServices();