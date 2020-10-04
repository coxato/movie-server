const Mongo = require("../db/mongo");
const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

class UserService{
    constructor(){
        this.collection = 'users';
        this.mongo = new Mongo();
    }
    /**
     * 
     * @param {object} userData
     * @returns `object` `{created: boolean, message: string}` 
     */
    async signupUser(userData){
        const { collection, mongo } = this;
        try {
            const isUsernameTaken = await mongo.findOne(collection, {username: userData.username});
            const isEmailTaken = await mongo.findOne(collection, {email: userData.email});
            if(isUsernameTaken) return {created: false, message: 'username is already taken'};
            if(isEmailTaken) return {created: false, message: 'this email is already use'};

            // create crypt password and save user
            const user = new User(userData);
            user.password = await bcrypt.hash(user.password, 10);

            // save user
            await mongo.insertOne(collection, {...user});
            return {created: true, message: 'user created successfully'}
        } catch ({message}) {
            console.log('error in signupUser', message);
            return { created: false, message }
        }
    }
    
    /**
     * @param {string} email 
     * @param {string} password 
     * @returns `object` `{login: boolean, user: object, message: string}`
     */
    async logingUser(email, password){
        const { collection, mongo } = this;
        try {
            const user = await mongo.findOne(collection, { email });
            if(user){
                // compare password
                const correctPassword = await bcrypt.compare(password, user.password);
                if(correctPassword) return {login: true, user, message: 'success login'} // success login
                return {login: false, user: null, message: 'incorrect email or password'} // incorrect password
            }
            // user don't exist
            return {login: false, user: null, message: 'incorrect email or password'}
        } catch ({message}) {
            console.log('error in loginUser', message);
            return { login: false, message, user: null }
        }
    }
}

module.exports = UserService;