// destructuracion del modelo de acompanante
const {Acompanante} = require ("../models");

const traerAcompanante = async (req, res) => {
  try {
      const { id } = req.params;
      const acompanantes = await Acompanante.findAll({ where: { invitadoId: id } });

      if (!acompanantes.length) {
          return res.status(404).json({ mensaje: "No hay acompañantes para este invitado" });
      }

      res.json(acompanantes);
  } catch (error) {
      console.error("Error al obtener acompañantes:", error);
      res.status(500).json({ error: "No se pudo obtener los acompañantes" });
  }
};

const crearAcompanante = async (req, res) => {
    const { nombre } = req.body;
    const nuevoAcompanante = await Acompanante.create({ nombre, invitadoId: req.params.id });
    res.status(201).json(nuevoAcompanante);
  };
  
  const actualizarAcompanante = async (req, res) => {
    const { nombre } = req.body;
    await Acompanante.update({ nombre }, { where: { id: req.params.id } });
    res.json({ mensaje: 'acompañante actualizado' });
  };
  
  const eliminarAcompanante = async (req, res) => {
    await Acompanante.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'acompañante eliminado' });
  };
  
  module.exports = {
    traerAcompanante,
    crearAcompanante,
    actualizarAcompanante,
    eliminarAcompanante
}