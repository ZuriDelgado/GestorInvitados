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
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);

    if (searchTerm === "__@zapatoRojo2") {
      setIsAdminModalOpen(true);
    } else {
      const invitadoEncontrado = invitados.find(inv => inv.nombre === searchTerm);
      if (invitadoEncontrado) {
        setModalTitle(`¿Eres ${invitadoEncontrado.nombre}?`);
        setSelectedInvitado(invitadoEncontrado);
        setIsModalOpen(true);
      } else {
        alert("Invitado no encontrado");
      }
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
          placeholder="Ingresa tu nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

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