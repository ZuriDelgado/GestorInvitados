// conexion y prueba de conexion a la base de datos

const sequelize = require("../database/db");
const Invitado = require("./invitado.model");
const Acompanante = require("./acompanante.model");

const testConnection = async () => {
    try {
      await sequelize.sync({ force: false });
      console.log('Conexion exitosa a la bd');
    } catch (error) {
      console.error('Error de conexion a la bd', error);
    }
  };
  
  module.exports = { testConnection, Invitado, Acompanante };