const mongodb = require("../db/mongo");
const { ObjectID } = require("mongodb");

class MovieFavServices{
    constructor(){
        this.collection = 'moviesFav';
    }
    
    /**
     * 
     * @param {string} userId 
     * @param {string} movieId 
     */
    async addToFavorites(userId, movieId){
        try {
            await mongodb.insertOne(this.collection, { userId: new ObjectID(userId), movieId });
            return true;

        } catch ({message}) {
            console.error("\n\nerror adding movie to favorites\n", message);
            return false;
        }
    }

    /**
     * 
     * @param {string} userId 
     * @param {string} movieId 
     */
    async deleteFromFavorites(userId, movieId){
        try {
            await mongodb.deleteOne(this.collection, { userId: new ObjectID(userId), movieId });
            return true;

        } catch ({message}) {
            console.error("\n\nerror deleting movie to favorites\n", message);
            return false;
        }
    }

    /**
     * 
     * @param {string} userId 
     * @param {string} movieId 
     */
    async getUserFavorites(userId){
        try {
            const favorites = await mongodb.find(this.collection, { userId: new ObjectID(userId) });
            const moviesIds = favorites.map( movie => movie.movieId ); 
            return moviesIds;

        } catch ({message}) {
            console.error("\n\nerror deleting movie to favorites\n", message);
            return false;
        }
    }

}

module.exports = new MovieFavServices();