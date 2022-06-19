'use strict'

var express = require('express');
var logController = require('../controllers/log');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('', mdAuth.ensureAuth, logController.findLogs);

module.exports = api;