const express = require("express");
const { traerAcompanante, crearAcompanante, actualizarAcompanante, eliminarAcompanante} = require ("../controllers/acompanante.controller");
const router = express.Router();

router.get("/invitados/:id/acompanantes", traerAcompanante);
router.post("/invitados/:id/acompanantes", crearAcompanante);
router.put("/invitados/acompanantes/:id", actualizarAcompanante);
router.delete("/invitados/acompanantes/:id", eliminarAcompanante);

module.exports = router;