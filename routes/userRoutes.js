const router = require("express").Router();
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
// service
const UserServices = require("../services/userServices");
// middlewares
const { checkBodyData } = require("./middlewares");

// init services
const userServices = new UserServices();

router.post('/signup', checkBodyData, async (req, res) => {
    const userData = req.body;
    const { created, message } = await userServices.signupUser(userData);
    const ok = created;
    res.json({ ok, message, data: {} });
});

router.post('/login', checkBodyData, async (req, res) => {
    const { email, password } = req.body
    const user = await userServices.logingUser(email, password);
    // create jwt
    let token = null;
    if(user.login){
        token = jwt.sign({ id: user.id, email: user.email }, secret);
    }
    const ok = user.login; 
    res.json({ ok, message: user.message, data: { token } });
});

// get users
router.get('/', async (req, res) => {
    const { users, message } = await userServices.getUsers();
    res.json({ data: { users }, message, ok: !!users })
})

module.exports = router;