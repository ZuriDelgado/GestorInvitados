import React from "react";
import { FaUserPlus, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ModalDetails.css";

interface Acompanante {
  id?: number;
  nombre: string;
}

interface ModalDetailsProps {
  companions: Acompanante[];
  onEdit: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  companions,
  onEdit,
  onRemove,
  onAdd,
  onConfirm,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const hasEmptyNames = companions.some(companion => companion.nombre.trim() === "");

    if (hasEmptyNames) {
      alert("Por favor, ingresa el nombre de todos los acompañantes.");
      return;
    }

    onConfirm();
    navigate("/confirm");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">Confirmar Acompañantes</h2>

        <div className="modal-list">
          {companions.map((companion, index) => (
            <div key={index} className="modal-item">
              <span className="companion-name">{companion.nombre}</span>
              <button className="edit-btn" onClick={() => onEdit(index, prompt("Editar nombre:", companion.nombre) || companion.nombre)}>
                <FaEdit />
              </button>
              <button className="remove-btn" onClick={() => onRemove(index)}>
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {companions.length < 3 && (
          <button onClick={onAdd} className="add-btn">
            <FaUserPlus />
          </button>
        )}

        <button className="confirm-btn" onClick={handleConfirm}>Confirmar</button>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalDetails;