const router = require("express").Router();
const Mongo = require("../db/mongo");
// mocks
const usersMock = require("../models/mocks/usersMock");

const mongo = new Mongo();

router.get('/users', async (req, res) => {
    await mongo.insertMany('users', usersMock);
    res.send("users created");
});

module.exports = router;