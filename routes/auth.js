var express = require('express');
var router = express.Router();
var db = require('../queries/auth');

router.post('/api/auth/login', db.login);
router.post('/api/auth/register', db.register);

module.exports = router;