import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ModalAdmin.css';

interface ModalAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAdmin: React.FC<ModalAdminProps> = ({ isOpen, onClose }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowPasswordInput(true);
  };

  const handleSubmitPassword = () => {
    if (password === "admin123") { 
      navigate("/dashboard"); 
    } else {
      alert("Contraseña incorrecta");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop"></div>

      <div className="modal-content-centered">
        {!showPasswordInput ? (
          <>
            <h2 className="modal-title">¿Eres __@zapatoRojo2?</h2>
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
            <h2 className="modal-title">Ingresa tu contraseña</h2>
            <div className="password-input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe la contraseña"
                className="password-input"
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-button modal-button-no" onClick={onClose}>
                Cancelar
              </button>
              <button className="modal-button modal-button-yes" onClick={handleSubmitPassword}>
                Ingresar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ModalAdmin;
