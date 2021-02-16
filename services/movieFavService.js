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
    async toggleFav(userId, movieId){
        try {
            const query = { userId: new ObjectID(userId), movieId };
            
            const exists = await mongodb.findOne(this.collection, query);

            if(exists){
                await mongodb.deleteOne(this.collection, query);
            }else{
                await mongodb.insertOne(this.collection, query);
            }
            return { ok: true, message: `${exists ? 'deleted' : 'added'} successfully` };

        } catch ({message}) {
            console.error("\n\nerror adding movie to favorites\n", message);
            return { ok: false, message };;
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