const router = require("express").Router();
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
// service
const UserServices = require("../services/userServices");
// middlewares
const { checkBodyData, checkToken } = require("./middlewares");

// init services
const userServices = new UserServices();

router.post('/signup', checkBodyData, async (req, res) => {
    const userData = req.body;
    const { created, message } = await userServices.signupUser(userData);
    const ok = created;
    return res.json({ ok, message, data: {} });
});

router.post('/login', checkBodyData, async (req, res) => {
    const { email, password } = req.body
    const {login, user, message} = await userServices.logingUser(email, password);
    // create jwt
    let token = null;
    if(login){
        token = jwt.sign({ id: user._id, email: user.email }, secret);
    } 
    return res.json({ ok: login, message, data: { token } });
});

// get users
router.get('/', async (req, res) => {
    const { users, message } = await userServices.getUsers();
    return res.json({ data: { users }, message, ok: !!users })
});

// get 1 user data via token
router.get('/current', checkToken, async (req, res) => {
    const { id } = req.user;
    const { user, message } = await userServices.getUser(id);
    return res.json({ ok: !!user, message, data: {user} }); 
})


module.exports = router;