const Mongo = require("../db/mongo");
const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const md5 = require("md5");
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
            if(isEmailTaken) return {created: false, message: 'this email is already in use'};

            // create crypt password and save user
            const user = new User(userData);
            user.password = await bcrypt.hash(user.password, 10);
            // gravatar profile photo
            user.photoUrl = `https://www.gravatar.com/avatar/${md5(user.email)}?d=identicon`;

            // save user
            await mongo.insertOne(collection, {...user});
            return {created: true, message: 'user created successfully'}
        } catch ({message}) {
            console.log('error in signupUser', message);
            return { created: false, message: 'user not created' }
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
            return { login: false, message: 'user not login', user: null }
        }
    }


    async getUsers(){
        try {
            const {mongo, collection} = this;
            const users = await mongo.find(collection, {}, { password: 0 });
            return { users, message: '' };        
        } catch ({message}) {
            console.log("error getting users in getUsers", message);
            return { users: null, message: 'error getting users' }
        }
    }


    async getUser(id){
        try {
            const {mongo, collection} = this;
            const user = await mongo.findOne(collection, {_id: new ObjectID(id)}, { password: 0 })
            return { user, message: ''}
        
        } catch ({message}) {
            console.log('error in getUser', message);
            return { user: null, message: 'error getting user' }
        }
    } 

}

module.exports = UserService;