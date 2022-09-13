var db_global = require('../connection/db');
var db = db_global.db;
var jsontoken = require('../connection/jsontoken');

module.exports = {
    login: login,
    register: register,
};


async function login(req, res, next) {
    var email_address = req.body.email_address;
    var password = req.body.password;

    const token = await jsontoken.generateAccessToken(email_address)
    db.func('login', [email_address, password])
        .then(function (data) {
            if (data[0]) {
                res.status(200)
                    .json({
                        status: '200',
                        message: 'User Found',
                        results: {
                            pk: data[0]['pk'],
                            user_type: data[0]['user_type'],
                            authorizationToken: encrypt('0001-fssat-encrypt', token)
                        }
                    });


            } else {
                res.status(404)
                    .json({
                        status: '404',
                        results: null,
                        message: 'No User Found'
                    });
            }
        })
        .catch(function (err) {
            res.status(500)
                .json({
                    err
                });
        });
}



function register(req, res, next) {
    var email_address = req.body.email_address;
    var password = req.body.password;
    var user_type = req.body.user_type;
    var full_name = req.body.full_name;
    var address = req.body.address;

    db.func('register', [email_address, password, full_name, address, user_type])
        .then(function (data) {
            res.status(200)
                .json({
                    status: '200',
                    message: 'User Registered'
                });
        })
        .catch(function (err) {
            console.log(err)
            res.status(500)
                .json({
                    status: 'Error',
                    message: err['detail']
                });
        });
}

var encrypt = (salt, text) => {
    const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0))
    const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2)
    const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code)
    return text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('')
}
