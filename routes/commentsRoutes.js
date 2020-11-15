const router = require("express").Router();
const commentsService = require("../services/commentsService");
// middlewares
const { checkBodyData, checkToken } = require("./middlewares")


router.post('/create', checkToken, checkBodyData, async (req, res) => {
    const commentData = {
        ...req.body,
        ...req.user
    }
    const { created, message, id } = await commentsService.createComment(commentData);
    res.json({
        ok: created,
        message,
        data: { id }
    })
})

router.post('/reply', checkToken, checkBodyData, async (req, res) => {
    const { parentCommentId } = req.body;
    const replyData = {
        ...req.user,
        ...req.body
    }
    const { created, message } = await commentsService.createReply(parentCommentId, replyData);
    res.json({
        ok: created,
        message,
        data: {}
    });
});

router.get('/', async (req, res) => {
    const { movieId, skip, limit } = req.query; 
    const { comments, message } = await commentsService.getMoviesComments(movieId, skip, limit);
    res.json({
        ok: !!comments,
        message,
        data: { comments }
    });
})

module.exports = router;