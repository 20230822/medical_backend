"use strict";

var express = require('express');
var router = express.Router();
const ctrl = require('./user.ctrl');

router.post('/login', ctrl.process.login);

module.exports = router;