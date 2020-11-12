const db = require("../../db/db");
const commentsService = require("../commentsService");

const commentData =  {
    username: 'user1',
    text: 'this is a good movie',
    photoUrl: 'https://photo.com/1',
    movieId: '123456789'
}
let parentCommentId;

describe('commentService', () => {
    // connect to mongoDB
    beforeAll(() => {
        return db.connectDB();
    });
    // disconnetc db
    afterAll(() => {
        return db.disconnectDB();
    });

    // comment
    describe('creating comment', () => {
        test('create comment with good data', async () => {
            const { created, id } = await commentsService.createComment(commentData);
            parentCommentId = id;
            expect(created).toBe(true);
        });

        test('create comment without movieId', async () => {
            const comment = await commentsService.createComment({
                ...commentData,
                movieId: ''
            });
            expect(comment).toEqual({created: false, message: 'needs movieId to create comment', id: null})
        });
    });

    // reply
    describe('creating reply', () => {
        test('create reply with good data', async () => {
            const { created } = await commentsService.createReply(parentCommentId, {
                ...commentData,
                text: 'response for comment'
            });
            expect(created).toBe(true);
        });

        test('create reply without parentCommentId', async () => {
            const reply = await commentsService.createReply(null, commentData);
            expect(reply).toEqual({created: false, message: 'needs the parentCommentId to create reply'})
        });

        test('create reply with invalid parentCommentId', async () => {
            const reply = await commentsService.createReply('5349b4ddd2781d08c09890f3', commentData);
            expect(reply).toEqual({created: false, message: 'reply not created, parent comment does not exist'})
        });
    });



});