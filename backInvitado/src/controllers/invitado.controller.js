// destructuracion del modelo de Invitado
const {Invitado} = require("../models");


const traerInvitados = async (req, res) => {
    const invitados = await Invitado.findAll();
    res.json(invitados);
  };

  const traerInvitadoId = async (req, res) => {
    const invitado = await Invitado.findByPk(req.params.id);
    if (!invitado) return res.status(404).json({ error: 'invitado no encontrado' });
    res.json(invitado);
  };

  const crearInvitado = async (req, res) => {
    const { nombre, telefono, cupos } = req.body;
    const nuevoInvitado = await Invitado.create({ nombre, telefono, cupos });
    res.status(201).json(nuevoInvitado);
  };

  const actualizarInvitado = async (req, res) => {
    const { nombre, telefono, cupos } = req.body;
    await Invitado.update({ nombre, telefono, cupos }, { where: { id: req.params.id } });
    res.json({ mensaje: 'invitado actualizado' });
  };

  const borrarInvitado = async (req, res) => {
    await Invitado.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'invitado eliminado' });
  };

  module.exports = {
    traerInvitados,
    traerInvitadoId,
    crearInvitado,
    actualizarInvitado,
    borrarInvitado
  }

