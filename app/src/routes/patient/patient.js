"use strict";

var express = require('express');
var router = express.Router();
const ctrl = require('./patient.ctrl');

router.post('/add', ctrl.process.add);

module.exports = router;