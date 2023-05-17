const express = require('express');
const router = express.Router();
const os = require('os');
const si = require('systeminformation');

/* GET home page. */
router.get('/', async (req, res, next) => {
    const systemInfo = {
        osType: os.type(),
        osVersion: os.release(),
        architecture: process.arch,
        nodeVersion: process.version
    };
    const diskData = await si.fsSize();
    diskData.forEach(disk => {
        disk.size = (disk.size / (1024 ** 3)).toFixed(2); // 总大小
        disk.used = (disk.used / (1024 ** 3)).toFixed(2); // 已使用大小
    });
    res.render('index', {title: '南海Linux面板', systemInfo: systemInfo, diskData: diskData});
});

module.exports = router;
