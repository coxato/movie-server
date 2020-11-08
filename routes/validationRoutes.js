const router = require("express").Router();
// middlewares
const { checkToken } = require('./middlewares');

router.get('/user-token', checkToken ,(req, res) => {
    res.json({
        ok: true,
        message: 'good token',
        data: null
    })
});

module.exports = router;