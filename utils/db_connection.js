const { Pool } = require("pg");
require("dotenv").config();

module.exports = class DBConnection {

  static pool;

  // CREAR POOL DE CONEXIONES Y VALIDAR SI YA EXISTE CON UN SINGLETON
  async createPool() {

		return new Promise((resolve, reject) => {
			if (!!DBConnection.pool) {
				console.log("Already exists");
			} else {

				DBConnection.pool = new Pool({
					user: process.env.DB_USER,
					host: process.env.DB_HOST,
					database: process.env.DB_DATABSE,
					password: process.env.DB_PASSWORD,
					port: process.env.DB_PORT,
				});

			}
			resolve(DBConnection.pool);
		});

  }

  // METODO PARA EJECUCIÓN DE QUERYS
  async query(sql, params = []) {

		try {
			const response = await new Promise(async (resolve, reject) => {
				let p = await this.createPool();
				p.query(sql, params, (err, res) => {
					if (err) {
						reject({ message: err });
					}
					resolve({ res: res ? res.rows : [], fields: res ? res.fields : [] });
				});
			});
			return response.res;
		}  catch (e) {
			console.log("Error db connection: ", e);
			return { error: e };
		}

  }

}