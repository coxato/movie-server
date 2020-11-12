// returns a valid jwt
const getJWToken = async request => {
    const { body } = await request.post('/api/users/login').send({
        email: 'user1@mail.com',
        password: 'password123'
    });

    if(!body.data.token) throw new Error("error in getJWToken while getting token");
    return body.data.token;
}

// returns a short string with random chars
const randomChars = () => {
    let chars = [];
    for (let i = 0; i < 5; i++) {
        let rNum = Math.round( Math.random() * (122 - 97) + 97);
        chars.push(
            String.fromCharCode(rNum)
        )
    }
    return chars.join('');
}

exports.getJWToken = getJWToken;
exports.randomChars = randomChars;