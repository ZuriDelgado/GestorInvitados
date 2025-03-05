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
    cupos:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

module.exports = Invitado;