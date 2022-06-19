'use strict'

var express = require('express');
var loginController = require('../controllers/login');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.post('', loginController.login);
api.post('/logout', mdAuth.ensureAuth, loginController.logout);

module.exports = api;