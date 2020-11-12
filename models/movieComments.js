class MovieComments{
    constructor(movieId){
        this.movieId = movieId;
        this.commentsLength = 0;
        this.comments = [];
    }
}

module.exports = MovieComments;