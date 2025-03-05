import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

// Definición de tipos
type User = {
  id: number;
  nombre: string;
  telefono: string;
  status: "active" | "paused";
};

type Acompanante = {
  id: number;
  nombre: string;
};

type Column = {
  name: string;
  uid: keyof User | "actions" | "viewAcompanantes";
};

// Columnas de la tabla
export const columns: Column[] = [
  { name: "INVITADOS", uid: "nombre" },
  { name: "TELEFONO", uid: "telefono" },
  { name: "STATUS", uid: "status" },
  { name: "ACOMPAÑANTES", uid: "viewAcompanantes" },
  { name: "ACCIONES", uid: "actions" },
];

// Íconos (definidos como componentes de React)
export const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1.5em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1.5em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1.5em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1.5em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

// Mapa de colores para los estados
const statusColorMap: { [key in User["status"]]: "success" | "warning" } = {
  active: "success",
  paused: "warning",
};

// Componente principal
export default function TableAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "id" | "status">>({
    nombre: "",
    telefono: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAcompanantesModalOpen, setIsAcompanantesModalOpen] = useState(false);
  const [acompanantes, setAcompanantes] = useState<Acompanante[]>([]);

  // Obtener los invitados desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/invitados");
        if (!response.ok) {
          throw new Error("Error al obtener los invitados");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  // Función para obtener los acompañantes de un invitado
  const fetchAcompanantes = async (invitadoId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/invitados/${invitadoId}/acompanantes`);
      if (!response.ok) {
        throw new Error("Error al obtener los acompañantes");
      }
      const data: Acompanante[] = await response.json();
      setAcompanantes(data);
      setIsAcompanantesModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para eliminar un invitado
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/invitados/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el invitado");
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Función para guardar la edición
  const handleSaveEdit = async () => {
    if (editingUser) {
      try {
        const response = await fetch(`http://localhost:3001/invitados/${editingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar el invitado");
        }

        setUsers(users.map((user) => 
          user.id === editingUser.id ? { ...editingUser } : user
        ));
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Función para agregar un nuevo invitado
  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/invitados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el invitado");
      }

      const data: User = await response.json();
      setUsers([...users, { ...data, status: "active" }]);
      setIsAddModalOpen(false);
      setNewUser({ nombre: "", telefono: "" });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Botón para abrir el modal de agregar */}
      <div className="flex justify-end mt-8">
        <Button style={{ backgroundColor: "#33015f", color: "#ffffff" }} onClick={() => setIsAddModalOpen(true)}>
          Agregar Invitado
        </Button>
      </div>

      {/* Título de la tabla */}
      <h1 className="flex ml-6" style={{ color: "#33015f", fontSize: "25px" }}>Registro de Invitados</h1>

      {/* Tabla de invitados */}
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.telefono}</TableCell>
              <TableCell>
                <Chip color={statusColorMap[item.status]} size="sm" variant="flat">
                  {item.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Button
                  style={{ backgroundColor: "#fff", color: "#33015f", border: "1px solid #33015f" }}
                  onClick={() => fetchAcompanantes(item.id)}
                >
                  Ver Acompañantes
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Tooltip content="Editar invitado">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Eliminar invitado">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal para agregar un nuevo invitado */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Agregar Invitado</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Nombre del invitado"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
              />
              <Input
                placeholder="Teléfono"
                value={newUser.telefono}
                onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button style={{ backgroundColor: "#ffffff", color: "#33015f", border: "1px solid #33015f" }} onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button style={{ backgroundColor: "#33015f", color: "#ffffff" }} onClick={handleAddUser}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para editar un invitado */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Editar Invitado</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Nombre del invitado"
                value={editingUser?.nombre || ""}
                onChange={(e) => setEditingUser({ ...editingUser!, nombre: e.target.value })}
              />
              <Input
                placeholder="Teléfono"
                value={editingUser?.telefono || ""}
                onChange={(e) => setEditingUser({ ...editingUser!, telefono: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button style={{ backgroundColor: "#ffffff", color: "#33015f", border: "1px solid #33015f" }} onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button style={{ backgroundColor: "#33015f", color: "#ffffff" }} onClick={handleSaveEdit}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para ver los acompañantes */}
      <Modal isOpen={isAcompanantesModalOpen} onClose={() => setIsAcompanantesModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Acompañantes</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              {acompanantes.map((acompanante) => (
                <div key={acompanante.id} className="flex justify-between items-center">
                  <span>{acompanante.nombre}</span>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button style={{ backgroundColor: "#33015f", color: "#ffffff" }} onClick={() => setIsAcompanantesModalOpen(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}