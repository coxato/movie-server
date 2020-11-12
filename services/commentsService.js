const mongodb = require("../db/mongo");
const { ObjectID } = require("mongodb");
const Comment = require("../models/comment");


class CommentService{
    constructor(){
        this.collection = 'comments';
        this.mongo = mongodb;
    }
    
    // create a principal comment
    async createComment(commentData){
        try {
            const { mongo, collection } = this;
            let comment; 
            // if needs movieId
            if(!commentData.movieId) return { created: false, message: 'needs movieId to create comment', id: null }; 
            // create and save comment
            comment = new Comment(commentData);
            const { insertedId } = await mongo.insertOne(collection, comment);
            return { created: true, message: 'comment created successfully', id: insertedId }

        } catch ({message}) {
            return { created: false, message: 'error creating comment' + message, id: null } 
        }

    }

    // create a reply for a comment
    async createReply(parentCommentId, commentData){
        try {
            const { mongo, collection } = this;
            let reply;
            let updated;

            if(!parentCommentId) return { created: false, message: 'needs the parentCommentId to create reply' }; 
            
            reply = new Comment(commentData, true);
            updated = await mongo.updateOne(
                collection, 
                { _id: new ObjectID(parentCommentId) },
                {
                    $push: { responses: reply }
                }
            );
            if(updated.modifiedCount){
                return { created: true, message: 'reply created successfully' }
            }else{
                return { created: false, message: 'reply not created, parent comment does not exist' }
            }

        } catch ({message}) {
            return { created: false, message } 
        }
    }

    
    async getMoviesComments(movieId, skip = 0, limit = 5){
        try {
            const { mongo, collection } = this;
            const comments = await mongo.findWithLimits(collection, {movieId}, skip, limit);
            return { comments, message: '' }
        } catch ({message}) {
            return { comments: null, message }
        }
    }


}

module.exports = new CommentService();