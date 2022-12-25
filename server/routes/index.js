const taskRoute = require('./taskRoute');
const userRoute = require('./userRoute');


const express = require('express');
const router = express.Router();

router.use('/', taskRoute);
router.use('/', userRoute);

module.exports = router;