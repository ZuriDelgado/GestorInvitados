const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");

const Invitado = sequelize.define("Invitado",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Invitado;