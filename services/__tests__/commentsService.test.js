const db = require("../../db/db");
const commentsService = require("../commentsService");
const { randomChars } = require('../../utils/testUtils');

const commentData =  {
    username: 'user1',
    text: 'this is a good movie',
    photoUrl: 'https://photo.com/1',
    movieId: '123456789'
}
let createdId;

describe('commentService', () => {
    // connect to mongoDB
    beforeAll(() => {
        return db.connectDB();
    });
    // disconnetc db
    afterAll(() => {
        return db.disconnectDB();
    });

    //                  ===== create =====

    // comment
    describe('creating comment', () => {
        test('create comment with good data', async () => {
            const { created, id } = await commentsService.createComment(commentData);
            createdId = id;
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
            const { created } = await commentsService.createReply(createdId, {
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

    //                  ===== getting =====

    //                  ===== update =====

    // comment
    describe('update comment', () => {
        test('update comment with good data', async () => {
            const { message } = await commentsService.updateComment(
                createdId, 
                'this is a new text',
                commentData.username
            );
            expect(message).toBe('comment updated successfully');
        });

        test('update comment with wrong commentId', async () => {
            const { message } = await commentsService.updateComment(
                '5fb13499ec21323364521846', 
                'this is a new text: wrong commentId',
                commentData.username
            );
            expect(message).toBe('comment does not exists');
        });

        test('update comment with different username', async () => {
            const { message } = await commentsService.updateComment(
                createdId, 
                'this is a new text: different username',
                'usernamerandom' + randomChars()
            );
            expect(message).toBe('not authorized');
        });
    });

    // reply
    describe('update reply', () => {
        test('update reply with good data', async () => {
            const { message } = await commentsService.updateReply({
                parentCommentId: createdId,
                index: 0,
                newText: 'new text for reply',
                username: commentData.username
            });
            expect(message).toBe('reply updated successfully');
        });

        test('update reply without parentCommentId', async () => {
            const { message } = await commentsService.updateReply({
                parentCommentId: null,
                index: 0,
                newText: 'new text for reply: without parentCommentId',
                username: commentData.username
            });
            expect(message).toBe('reply does not exists');
        });

        test('update reply with wrong parentCommentId', async () => {
            const { message } = await commentsService.updateReply({
                parentCommentId: '5fb13499ec21323364521846',
                index: 0,
                newText: 'new text for reply: wrong parentCommentId',
                username: commentData.username
            });
            expect(message).toBe('reply does not exists');
        });

        test('update reply with different username', async () => {
            const { message } = await commentsService.updateReply({
                parentCommentId: createdId,
                index: 0,
                newText: 'new text for reply: different username',
                username: 'usernamerandom' + randomChars()
            });
            expect(message).toBe('not authorized');
        });
    }); 

    // ===== delete =====


});