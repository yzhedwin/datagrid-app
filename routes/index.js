const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../public/html/gateway.html'));
})
router.get('/device', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../public/html/device.html'));
})
router.get('/metric', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../public/html/metric.html'));
})
router.get('/user', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../public/html/user.html'));
})

module.exports = router;