const User = require('../user');
const md5 = require("md5");
const usersMock = [];

for (let i = 1; i <= 10; i++) {
    // basic data
    const username = `username${i}`,
    email = `user${i}@mail.com`,
    password = 'password123',
    photoUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`, 
    user = new User({
        username,
        email,
        password,
        photoUrl
    });
    // movies data
    user.likedMovies = ['tt6751668', 'tt1431045', 'tt0100669', 'tt3794354', 'tt0145487', 'tt0413300', 'tt0848228'];
    user.favoriteMovies = ['tt6751668', 'tt0413300', 'tt0848228'];
    
    usersMock.push(user);
}

module.exports = usersMock;