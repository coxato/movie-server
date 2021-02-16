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

router.post('/', checkBodyData, checkToken, async (req, res) => {
    const { userId, movieId } = req.body;
    const saved = await movieFavServices.addToFavorites(userId, movieId);
    return res.json({ ok: saved, message: '', data: null })
})

router.delete('/', checkBodyData, checkToken, async (req, res) => {
    const { userId, movieId } = req.body;
    const deleted = await movieFavServices.deleteFromFavorites(userId, movieId);
    return res.json({ ok: deleted, message: '', data: null })
})

module.exports = router;