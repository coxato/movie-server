class Comment{
    constructor({ movieId, username, text, photoUrl}, isResponse = false){
        this.movieId = movieId;
        this.username = username;
        this.text = text;
        this.photoUrl = photoUrl;
        this.date = Date.now();
        // if is not a response, it's a principal comment
        if(isResponse === false){
            this.responses = []
        }
    }
}

module.exports = Comment;