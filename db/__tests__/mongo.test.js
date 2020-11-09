const db = require('../db');
const mongo = require('../mongo');
const { ObjectID } = require("mongodb");

describe('MongoDB', () => {
    // connect to mongoDB
    beforeAll(() => {
        return db.connectDB();
    });
    // disconnetc db
    afterAll(() => {
        return db.disconnectDB();
    });

    let id;

    test('insert document', async () => {
        let user = { name: 'jhon', lastname: 'doe' };
        const { insertedId } = await mongo.insertOne('users', user);
        id = insertedId;

        expect(id).toBeTruthy();
        expect(typeof id).toBe('object');
    });

    test('update document', async () => {
        const { modifiedCount } = await mongo.updateOne(
            'users', 
            { _id: new ObjectID(id) }, 
            { 
                $set: { 
                    lastname: 'doe2' 
                } 
            }
        );

        expect(modifiedCount).toBe(1);
    });

    test('delete document', async () => {
        const { deletedCount } = await mongo.deleteOne('users', { _id: new ObjectID(id) });
        expect(deletedCount).toBe(1);
    });
    
})