const router = require("express").Router();
// service
const movieFavServices = require("../services/movieFavService");
// middlewares
const { checkBodyData, checkToken } = require("./middlewares");

router.get('/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;
    const moviesFav = await movieFavServices.getUserFavorites(userId);
    return res.json({ ok: !!moviesFav, message: '', data: moviesFav })
});

router.post('/toggle', checkBodyData, checkToken, async (req, res) => {
    const { userId, movieId } = req.body;
    const { ok, message } = await movieFavServices.toggleFav(userId, movieId);
    return res.json({ ok, message, data: null })
})

module.exports = router;