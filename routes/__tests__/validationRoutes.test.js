const { app } = require("../../app");
const request = require("supertest")(app);
// db
const { connectDB, disconnectDB } = require('../../db/db');


describe('Validation Routes', () => {
    beforeAll(() => {
        return connectDB();
    });
    afterAll(() => {
        return disconnectDB();
    });

    describe('token validation', () => {
        const tokenValidationUrl = '/api/validate/user-token';

        test('login to get jwt and check validate it', async () => {
            // get jwt
            const { body } = await request
            .post('/api/users/login')
            .send({ email: 'user1@mail.com', password: 'password123' });
            const { token } = body.data; 
            // validate token
            const response = await request
            .get(tokenValidationUrl)
            .set('Authorization', 'bearer ' + token);
            expect(response.body.message).toBe('good token');
        });

        test('try validate token without send it', async () => {
            const { body } = await request
            .get(tokenValidationUrl)
            expect(body.message).toBe('needs token in header');
        });

        test('incorrect token validation', async () => {
            const { body } = await request
            .get(tokenValidationUrl)
            .set('Authorization', 'bearer ' + 'incorrectValueToken123.');
            expect(body.message).toBe('invalid token');
        });
    });


});