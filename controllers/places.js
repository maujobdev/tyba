"use strict";

const {Client} = require('@googlemaps/google-maps-services-js');

// CONTROLADOR MODULO DE CONSULTA DE LUGARES CERCANOS(RESTAURANTES)
// NOTA: SE USA UNA API_KEY DE GOOGLE CREADA EN LA GCP PARA SU USO

// FUNCIÓN ENCONTRAR RESTAURANTES CERCANOS
async function findRestaurants(req, res) {

	const client = new Client({});

	client
  .placesNearby({
    params: {
      location: req.body,
			radius: 50000,
			type: 'restaurant',
      key: process.env.API_KEY_GOOGLE_MAPS,
    },
    timeout: 1000,
  })
  .then((r) => {
		return res.status(200).json({
			tag: 'SUCCESS',
			data: r.data.results
		});
  })
  .catch((e) => {
		return res.status(500).json({
      tag: "ERROR",
      message: "Error restaurants",
    });
  });

}

module.exports = {
  findRestaurants,
};
