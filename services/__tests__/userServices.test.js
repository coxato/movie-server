const db = require('../../db/db');
const userServices = require('../userServices');
const { randomChars } = require("../../utils/testUtils");

const USERNAME = 'user' + randomChars(),
      EMAIL = 'user' + randomChars() + '@mail.com',
      PASSWORD = 'password123';
      
      
describe('userServices', () => {
    // connect to mongoDB
    beforeAll(() => {
        return db.connectDB();
    });
    // disconnetc db
    afterAll(() => {
        return db.disconnectDB();
    });

    // signup
    describe('signup user', () => {
        test('signup with good data', async () => {
            const signupObj = await userServices.signupUser({
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD
            });
            expect(signupObj).toEqual({created: true, message: 'user created successfully'})
        });
        
        test('not signup with username taken', async () => {
            const signupObj = await userServices.signupUser({
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD
            });
            expect(signupObj).toEqual({created: false, message: 'username is already taken'})
        });
    
        test('not signup with email taken', async () => {
            const signupObj = await userServices.signupUser({
                username: USERNAME + randomChars(),
                email: EMAIL,
                password: PASSWORD
            });
            expect(signupObj).toEqual({created: false, message: 'this email is already in use'})
        });
    });

    // login
    describe('login user', () => {
        test('login with good email and password', async () => {
            const { login, message } = await userServices.logingUser(EMAIL, PASSWORD);
            expect(login).toBe(true);
            expect(message).toBe('success login');
        });
        
        test('not login with incorrect email', async () => {
            const loginObj = await userServices.logingUser(
                EMAIL + randomChars(), 
                PASSWORD
            );
            expect(loginObj).toEqual({login: false, user: null, message: 'incorrect email or password'});
        });
    
        test('not login with incorrect password', async () => {
            const loginObj = await userServices.logingUser(
                EMAIL, 
                PASSWORD + randomChars()
            );
            expect(loginObj).toEqual({login: false, user: null, message: 'incorrect email or password'});
        });
    });

    // getting users
    describe('getting users', () => {
        let id;

        test('get all users', async () => {
            const { users } = await userServices.getUsers();
            expect(users).toBeTruthy();
            expect(users.length).toBeGreaterThanOrEqual(1);
        });
        
        test('get one user by email', async () => {
            const { user, message } = await userServices.getUserByEmail(EMAIL);
            id = user._id;
            expect(message).toBe('success search');
        });

        test('get one user by id', async () => {
            const { message } = await userServices.getUserById(id);
            expect(message).toBe('success search');
        });
    });

    // delete users
    describe('deleting users', () => {
        test('delete user by email', async () => {
            const { message } = await userServices.deleteUserByEmail(EMAIL);
            expect(message).toBe('user deleted successfully');
        })
    })


})