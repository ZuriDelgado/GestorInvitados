import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import ReusableModal from './ReusableModal';
import ModalAdmin from '../admin/ModalAdmin';

interface Invitado {
  id: number;
  nombre: string;
  telefono: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [selectedInvitado, setSelectedInvitado] = useState<Invitado | null>(null);
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [filteredInvitados, setFilteredInvitados] = useState<Invitado[]>([]);
  const navigate = useNavigate();

  // Obtener los invitados desde la API
  useEffect(() => {
    const fetchInvitados = async () => {
      try {
        const response = await fetch("http://localhost:3001/invitados");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Invitado[] = await response.json();
        setInvitados(data);
      } catch (error) {
        console.error("Error fetching invitados:", error);
      }
    };

    fetchInvitados();
  }, []);

  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInvitados([]); 
      return;
    }

    if (searchTerm === "__@zapatoRojo2") {
      setIsAdminModalOpen(true);
    } 

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = invitados.filter(
      (invitado) =>
        invitado.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        invitado.telefono.includes(searchTerm) 
    );
    setFilteredInvitados(filtered);
  }, [searchTerm, invitados]);

  
 
  const handleSelectInvitado = (invitado: Invitado) => {
    setModalTitle(`¿Eres ${invitado.nombre}?`);
    setSelectedInvitado(invitado);
    setIsModalOpen(true);
    setSearchTerm(""); 
    setFilteredInvitados([]);
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredInvitados.length > 0) {
      handleSelectInvitado(filteredInvitados[0]);
    } else {
      alert("Invitado no encontrado");
    }
  };

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAdminModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Ingresa tu nombre o teléfono"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>

      </form>

      {filteredInvitados.length > 0 && (
        <div className="search-results">
          <div className='test'>
            {filteredInvitados.map((invitado) => (
              <div
                key={invitado.id}
                className="search-result-item"
                onClick={() => handleSelectInvitado(invitado)}
              >
                <span>{invitado.nombre}</span>
                <span>{invitado.telefono}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        selectedInvitado={selectedInvitado}
        onConfirm={() => {
          if (selectedInvitado) {
            navigate("/details", { state: { invitado: selectedInvitado } });
          }
        }}
      />

     
      <ModalAdmin isOpen={isAdminModalOpen} onClose={handleCloseModal} />
 
    </>
  );
};

export default SearchBar;