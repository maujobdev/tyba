'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var loginService = require('../services/login');

exports.ensureAuth = async function(req, res, next){
	// VALIDAMOS QUE EXISTA EL HEADER AUTH
	if(!req.headers.authorization){
		return res.status(403).send({
			tag: 'ERROR',
			message: 'The request does not have the authentication header'
		})
	}

	// GUARDAMOS TOKEN PARA SER VALIDADO
	var token = req.headers.authorization.replace(/['"]+/g,'');

	try{

		var payload = jwt.decode(token.replace('Bearer ',''), process.env.JWT_KEY);

		// VALIDAMOS TIEMPO DE EXPIRACIÓN DEL TOKEN
		if(payload.exp <= moment().unix()){
			return res.status(401).send({
				tag: 'ERROR',
				message: 'The token has expired'
			})
		}

		let isActive = (await loginService.checkSession(payload.sub))[0];

		// VALIDAMOS SI EL USUARIO ESTA LOGUEADO
		if(!isActive.isActive) {
			return res.status(401).send({
				tag: 'ERROR',
				message: 'The token has expired'
			});
		}

	} catch (e) {
		return res.status(404).send({
			message: 'The token is not valid'
		})
	}

	req.user = payload;

	// SI TODO RESULTA BIEN CONTINUAMOS
	next();

}