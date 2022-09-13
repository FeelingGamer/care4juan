const promise = require("bluebird");

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
const u_password = `${encodeURIComponent('care4juan_pass')}`
var connectionString = 'postgres://care4juan_user:'+ u_password +'@54.151.200.41:5432/care4juan_db'
var db = pgp(connectionString);

module.exports = {
    pgp, db
};