"use strict";

var userService = require("../services/user");
var logService = require("../services/log");
var configDB = require("../config/table_name");

// CONTROLADOR MODULO USUARIO

// FUNCIÓN CREAR USUARIO
async function registerUser(req, res) {

	// VERIFICAMOS QUE EL USUARIO NO EXISTA EN LA BD PARA NO VOLVERLO A CREAR
	let exists = await userService.checkExistence(req.body.username);

	if(exists[0].exists) {
		return res.status(200).json({
			tag: 'ERROR',
			message: 'Error user already exists.'
		});
	}

	// REGISTRAMOS EL USUARIO
	let user = await userService.registerUser(req.body);

	// VALIDAMOS POSIBLE ERROR EN BD
	if(user.error) {
		return res.status(500).json({
			tag: 'ERROR',
			message: 'Error in register user.'
		});
	}

	// GUARDAMOS LOG DE TRANSACCIÓN
	logService.registerLog({
		table: configDB.SECURITY_USER,
		operation: configDB.OPERATION_INSERT,
		data: JSON.stringify(user[0])
	});

	return res.status(200).json({
    tag: 'SUCCESS',
		data: user[0]
  });

}

module.exports = {
  registerUser,
};
