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

exports.randomChars = randomChars;