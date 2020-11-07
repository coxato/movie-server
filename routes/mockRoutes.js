const router = require("express").Router();
const mongo = require("../db/mongo");
// mocks
const usersMock = require("../models/mocks/usersMock");

router.get('/users', async (req, res) => {
    await mongo.insertMany('users', usersMock);
    res.send("users created");
});

module.exports = router;