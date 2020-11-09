const { app } = require("../../app");
const request = require("supertest")(app);
// db
const { connectDB, disconnectDB } = require('../../db/db');
// utils
const { randomChars } = require("../../utils/testUtils");

// global values
const USERNAME = 'user' + randomChars(),
EMAIL = 'user' + randomChars() + '@mail.com',
PASSWORD = 'password123';
let jwToken;


describe('User Routes', () => {
    beforeAll(() => {
        return connectDB();
    });
    afterAll(() => {
        return disconnectDB();
    });

    // signup
    describe('signup user route', () => {
        const signupUrl = '/api/users/signup';

        test('signup with good data', async () => {
            const { body } = await request
            .post(signupUrl)
            .send({
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD
            });
            expect(body).toEqual({ ok: true, message: 'user created successfully', data: {} })
        });

        test('not signup with taken username', async () => {
            const { body } = await request
            .post(signupUrl)
            .send({
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD
            });
            expect(body).toEqual({ ok: false, message: 'username is already taken', data: {} })
        });

        test('not signup with taken email', async () => {
            const { body } = await request
            .post(signupUrl)
            .send({
                username: USERNAME + randomChars(),
                email: EMAIL,
                password: PASSWORD
            });
            expect(body).toEqual({ ok: false, message: 'this email is already in use', data: {} })
        });

    })


    // login users
    describe('login user route', () => {
        const loginUrl = '/api/users/login';

        test('login with good data', async () => {
            const { body } = await request
            .post(loginUrl)
            .send({
                email: EMAIL,
                password: PASSWORD
            });
            const { message, data: { token } } = body;
            jwToken = token;
            expect(message).toBe('success login');
        });

        test('not login with incorrect email', async () => {
            const { body } = await request
            .post(loginUrl)
            .send({
                email: EMAIL + randomChars(),
                password: PASSWORD
            });
            expect(body.data.token).toBeNull();
        });

        test('not login with incorrect password', async () => {
            const { body } = await request
            .post(loginUrl)
            .send({
                email: EMAIL,
                password: PASSWORD + randomChars()
            });
            expect(body.data.token).toBeNull();
        });

    });


    // getting users
    describe('getting users routes', () => {
        test('get all users', async () => {
            const { body } = await request.get('/api/users');
            expect(body.data.users.length).toBeGreaterThanOrEqual(1);
        });

        test('get current user info', async () => {
            const { body } = await request
            .get('/api/users/current')
            .set('Authorization', 'bearer ' + jwToken);
            // compare with the originals username and email
            const { email, username } = body.data.user;
            expect({ email, username }).toEqual({
                username: USERNAME,
                email: EMAIL
            })
        });

    })


})