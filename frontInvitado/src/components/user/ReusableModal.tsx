import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ReusableModal.css';

interface Invitado {
  nombre: string;
  telefono: string;
}

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  selectedInvitado: Invitado | null;
  onConfirm: () => void;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onClose, title, selectedInvitado, onConfirm }) => {
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowPhoneInput(true);
  };

  const handleSubmitPhone = () => {
    if (selectedInvitado && phoneNumber === selectedInvitado.telefono) {
      onConfirm(); // Llamar a onConfirm para redirigir
    } else {
      alert("Número de teléfono incorrecto");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop"></div>

      <div className="modal-content-centered">
        {!showPhoneInput ? (
          <>
            <h2 className="modal-title">{title}</h2>
            <div className="modal-buttons">
              <button className="modal-button modal-button-no" onClick={onClose}>
                No
              </button>
              <button className="modal-button modal-button-yes" onClick={handleConfirm}>
                Sí
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="modal-title">Ingresa tu número de teléfono</h2>
            <div className="phone-input-container">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                placeholder="Ingresa tu número de teléfono"
                className="phone-input"
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-button modal-button-no" onClick={onClose}>
                Cancelar
              </button>
              <button className="modal-button modal-button-yes" onClick={handleSubmitPhone}>
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ReusableModal;