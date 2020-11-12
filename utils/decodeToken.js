const jwt = require("jsonwebtoken");

const decodeJwt = token => {
    if(!token) return null;
    const { email, id, username } = jwt.decode(token);
    return { email, id, username } 
}

exports.decodeJwt = decodeJwt;