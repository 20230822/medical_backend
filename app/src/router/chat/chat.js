const express = require('express');
const router = express.Router();
const ctrl = require('./chatConnect');

router.get('/' , ctrl.process.connect);

module.exports = router;