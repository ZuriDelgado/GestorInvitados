import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import ModalDetails from "../../../components/user/ModalDetails";
import "./GuestDetails.css";

interface InvitadoPrincipal {
  id: number;
  nombre: string;
  telefono: string;
  cupos: number; // Asegúrate de que el campo cupos esté incluido
}

interface Acompanante {
  id?: number;
  nombre: string;
}

const GuestDetails: React.FC = () => {
  const location = useLocation();
  const invitadoPrincipal = location.state?.invitado;

  const [companions, setCompanions] = useState<Acompanante[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener los acompañantes del invitado principal
  useEffect(() => {
    if (invitadoPrincipal) {
      const fetchAcompanantes = async () => {
        try {
          const response = await fetch(`http://localhost:3001/invitados/${invitadoPrincipal.id}/acompanantes`);
          if (!response.ok) {
            throw new Error("Error al obtener los acompañantes");
          }
          const data: Acompanante[] = await response.json();
          setCompanions(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchAcompanantes();
    }
  }, [invitadoPrincipal]);

  // Si no hay invitado principal, mostrar un mensaje de error
  if (!invitadoPrincipal) {
    return <div>No se encontró el invitado principal. Por favor, regresa e intenta nuevamente.</div>;
  }

  // Agregar un nuevo acompañante
  const handleAddCompanion = () => {
    if (companions.length < invitadoPrincipal.cupos) {
      setCompanions([...companions, { nombre: "" }]);
    }
  };

  // Eliminar un acompañante
  const handleRemoveCompanion = (index: number) => {
    const updatedCompanions = companions.filter((_, i) => i !== index);
    setCompanions(updatedCompanions);
  };

  // Editar el nombre de un acompañante
  const handleEditCompanion = (index: number, value: string) => {
    const updatedCompanions = [...companions];
    updatedCompanions[index].nombre = value;
    setCompanions(updatedCompanions);
  };

  // Eliminar un acompañante de la base de datos
  const handleDeleteCompanion = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/invitados/acompanantes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el acompañante");
      }

      // Actualizar la lista de acompañantes
      const updatedCompanions = companions.filter(companion => companion.id !== id);
      setCompanions(updatedCompanions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Validar y abrir el modal de confirmación
  const handleNext = () => {
    const hasEmptyNames = companions.some(companion => companion.nombre.trim() === "");

    if (hasEmptyNames) {
      alert("Por favor, ingresa el nombre de todos los acompañantes.");
      return;
    }

    if (companions.length > 0) {
      setIsModalOpen(true);
    }
  };

  // Guardar los acompañantes en la base de datos
  const handleConfirm = async () => {
    if (invitadoPrincipal) {
      try {
        for (const companion of companions) {
          if (companion.id) {
            // Actualizar un acompañante existente
            await fetch(`http://localhost:3001/invitados/acompanantes/${companion.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ nombre: companion.nombre }),
            });
          } else {
            // Crear un nuevo acompañante
            await fetch(`http://localhost:3001/invitados/${invitadoPrincipal.id}/acompanantes`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ nombre: companion.nombre }),
            });
          }
        }

        console.log("Acompañantes guardados correctamente");
      } catch (error) {
        console.error("Error al guardar los acompañantes:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="card">
          <h1 className="principalGuest">{invitadoPrincipal.nombre}</h1>
          <p className="subtitle">{invitadoPrincipal.telefono}</p>
          <h2 className="max-companions">Acompañantes máximos: {invitadoPrincipal.cupos}</h2>

          <div className="companions-list">
            {companions.map((companion, index) => (
              <div key={index} className="companion-item">
                <input
                  type="text"
                  className="companion-input"
                  placeholder={`Acompañante ${index + 1}`}
                  value={companion.nombre}
                  onChange={(e) => handleEditCompanion(index, e.target.value)}
                />
                <button onClick={() => handleRemoveCompanion(index)} className="remove-btn">
                  ×
                </button>
              </div>
            ))}
            {companions.length < invitadoPrincipal.cupos && (
              <button onClick={handleAddCompanion} className="add-btn">
                <FaUserPlus />
              </button>
            )}
          </div>

          <button className="next-btn" onClick={handleNext}>Siguiente</button>
        </div>
      </div>

      <div className="right-side"> </div>

      {isModalOpen && (
        <ModalDetails
          companions={companions}
          onEdit={handleEditCompanion}
          onRemove={(index) => {
            const companion = companions[index];
            if (companion.id) {
              handleDeleteCompanion(companion.id); // Eliminar de la base de datos
            }
            handleRemoveCompanion(index); // Eliminar de la lista
          }}
          onAdd={handleAddCompanion}
          onConfirm={handleConfirm}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GuestDetails;