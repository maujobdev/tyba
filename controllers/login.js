"use strict";

var jwt = require("../services/jwt");
var loginService = require("../services/login");
var logService = require("../services/log");

// CONTROLADOR MODULO LOGIN

// FUNCION LOGIN
async function login(req, res) {
  let user = await loginService.login(req.body);

  if (user.error) {
    return res.status(500).json({
      tag: "ERROR",
      message: "Error in login",
    });
  }

  // VALIDAMOS SI ENCONTRO COINCIDENCIAS PARA DICHO USERNAME Y PASSWORD
  user = user[0].userData;
  if (user === null) {
    return res.status(401).json({
      tag: "UNAUTHORIZED",
    });
  }

  // GUARDAMOS LOG DE LA TRANSACCIÓN
  logService.registerLog(user);

  // RESPONDEMOS CON EL TOKEN DE ACCESO
  return res.status(200).json({
    token: jwt.createToken(user.data),
  });
}

// FUNCION LOGOUT
async function logout(req, res) {

  let id = req.user.sub;

  let user = await loginService.logout(id);

  if (user.error) {
    return res.status(500).json({
      tag: "ERROR",
      message: "Error in logout",
    });
  }

  logService.registerLog(user[0].userData);

  return res.status(200).json({
    tag: 'SUCCESSFULL LOGOUT'
  });

}

module.exports = {
  login,
  logout
};
