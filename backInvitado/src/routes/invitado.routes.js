const express = require ("express");
const { traerInvitados, traerInvitadoId, crearInvitado, actualizarInvitado, borrarInvitado} = require("../controllers/invitado.controller");
const router = express.Router();

router.get("/", traerInvitados);
router.get("/:id", traerInvitadoId);
router.post("/", crearInvitado);
router.put("/:id", actualizarInvitado);
router.delete("/:id", borrarInvitado);

module.exports = router;