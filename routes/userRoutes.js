const router = require("express").Router();
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
// service
const userServices = require("../services/userServices");
// middlewares
const { checkBodyData, checkToken } = require("./middlewares");


router.post('/signup', checkBodyData, async (req, res) => {
    const userData = req.body;
    const { created, message } = await userServices.signupUser(userData);
    return res.json({ ok: created, message, data: {} });
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
    const { id, email } = req.user;
    let userObj;
    // get info by id or email
    if(id) userObj = await userServices.getUserById(id);
    else userObj = await userServices.getUserByEmail(email);
    
    const { user, message } = userObj;
    return res.json({ ok: !!user, message, data: {user} }); 
})


module.exports = router;