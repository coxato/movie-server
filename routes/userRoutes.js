const router = require("express").Router();
const Mongo = require("../db/mongo");

const mongo = new Mongo();

router.get('/', (req, res) => {
    res.send('server is working -> users')
})

router.get('/signup/:name', async (req, res) => {
    const { name } = req.params;
    const created = await mongo.insertOne('users', {name});
    res.json(created);
})

router.get('/login', async (req, res) => {
    const users = await mongo.find('users', {});
    res.json(users);
})

module.exports = router;