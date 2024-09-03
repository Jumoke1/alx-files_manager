const express = require('express')
const AppController = require('../controllers/AppController');
const express = require('express');

router.get('/status', AppController.getStatus);
router.get('/status', AppController.getStats);

module.exports = router;
