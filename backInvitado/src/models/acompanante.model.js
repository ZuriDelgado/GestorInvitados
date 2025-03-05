const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");
const Invitado = require("./invitado.model");

const Acompanante = sequelize.define("Acompanante", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

//llaves foraneas
Invitado.hasMany(Acompanante, { foreignKey: 'invitadoId', onDelete: 'CASCADE' });
Acompanante.belongsTo(Invitado, { foreignKey: 'invitadoId' });

module.exports = Acompanante;