"use strict";

var express = require('express');
var router = express.Router();
const ctrl = require('./patient.ctrl');

router.post('/add', ctrl.process.add);
router.post('/detailInfo', ctrl.process.detailInfo);
router.post('/', ctrl.process.patients);

module.exports = router;