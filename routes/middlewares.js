const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
// utils
const { checkProps } = require("../utils/checkProps");

// ===== jsonwebtoken =====
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}

// ===== check req.body data =====
function checkBodyData(req, res, next) {
    if(checkProps(true, req.body)) next();
    else{
        return res.json({
            ok: false,
            message: 'the {body} object is missing values',
            data: null
        })
    }
}

// ===== check if is admin =====
// async function isAdmin(req, res) {
    
// }

module.exports = {
    checkToken,
    checkBodyData
}