"use strict";

// CONTROLADOR MODULO HISTORICO DE TRANSACCIONES
var logService = require("../services/log");

// FUNCIÓN CONSULTAR TRANSACCIONES
async function findLogs(req, res) {

	let logs = await logService.findLogs();

	if(logs.error) {
		return res.status(500).json({
			tag: 'ERROR',
			message: 'Error getting logs.'
		});
	}

	return res.status(200).json({
    tag: 'SUCCESS',
		data: logs
  });

}

module.exports = {
    findLogs,
};
