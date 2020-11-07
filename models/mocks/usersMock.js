const User = require('../user');
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const usersMock = [];

for (let i = 1; i <= 10; i++) {
    // basic data
    const username = `username${i}`,
    email = `user${i}@mail.com`,
    password =  bcrypt.hashSync('password123', 10),
    photoUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`, 
    user = new User({
        username,
        email,
        password,
        photoUrl
    });
    usersMock.push(user);
}

module.exports = usersMock;