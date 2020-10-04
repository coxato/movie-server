const router = require("express").Router();
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
// service
const UserServices = require("../services/userServices");

// init services
const userServices = new UserServices();

router.post('/signup', async (req, res) => {
    const userData = req.body;
    const response = await userServices.signupUser(userData);
    const ok = response.created;
    res.json({ ...response, ok});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userServices.logingUser(email, password);
    // create jwt
    let token = null;
    if(user.login){
        token = jwt.sign({ id: user.id, email: user.email }, secret);
    }
    const ok = user.login; 
    res.json({ ok, message: user.message, token });
});

module.exports = router;