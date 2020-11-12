const router = require("express").Router();
const mongo = require("../db/mongo");
// mocks
const usersMock = require("../models/mocks/usersMock");

// ===== NOTE =====
/**
 * to can pass the tests, the database needs at leats
 * 1 user 
 * 1 comment
 */

router.get('/users', async (req, res) => {
    await mongo.insertMany('users', usersMock);
    res.send("users created");
});

module.exports = router;