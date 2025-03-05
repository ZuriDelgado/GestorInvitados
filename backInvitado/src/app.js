const express = require("express");
const cors = require("cors");
const { testConnection } = require("./models");
const invitadoRoutes = require("./routes/invitado.routes");
const acompananteRoutes = require("./routes/acompanante.routes");

const app = express();

//habilita el cors
app.use(cors());
app.use(express.json());

app.use("/invitados", invitadoRoutes);
app.use("/", acompananteRoutes);

testConnection();

module.exports = app;
