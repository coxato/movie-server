class User{
    constructor({
        username,
        email,
        password,
        photoUrl = ''
    }){
        this.username = username;
        this.email = email;
        this.password = password;
        // this.likedMovies = [];
        // this.favoriteMovies = [];
        this.photoUrl = photoUrl;
    }
}

module.exports = User;