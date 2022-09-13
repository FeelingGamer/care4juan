const jwt = require('jsonwebtoken');

async function generateAccessToken(email_address) {
    //return jwt.sign(email_address, '0001-fssat-prod-authorizer', { expiresIn: '3600' });

    return jwt.sign(
        {email_address: email_address}, // object and not string
        '0001-cmms-prod-authorizer',
        {expiresIn: '1d'} // added days, default for ex 60 would be ms, you can also provide '1h' etc
    )
}

module.exports = {
    generateAccessToken: generateAccessToken
};