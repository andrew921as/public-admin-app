"use client";

import Button from "@/components/Button";
import { X } from "lucide-react";
import { useState } from "react";

// Mock data
const initialUsers = [
  {
    id: "1",
    fullName: "Pepito Perez",
    email: "pepito@gmail.com",
    role: "paciente",
  },
  { id: "2", fullName: "Operador", email: "sara@gmail.com", role: "operador" },
  { id: "3", fullName: "Doctor", email: "doctor@gmail.com", role: "doctor" },
  {
    id: "4",
    fullName: "Administrador",
    email: "admin@gmail.com",
    role: "administrator",
  },
];

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-white p-4 flex">
      <div className="w-1/6 container"></div>
      <div className="mt-20 px-4 flex flex-col items-start ml-10 grow">
        <div className="w-10/12">
          <div className="flex justify-between items-start mb-6 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Usuarios</h1>
            <div className="w-1/5">
              <Button
                title="Agregar"
                color="green"
                onClick={() => {
                  console.log("Add user");
                }}
              />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    Nombre completo
                  </th>
                  <th className="text-left py-3 px-4 font-medium">email</th>
                  <th className="text-left py-3 px-4 font-medium">rol</th>
                  <th className="text-left py-3 px-4 font-medium">eliminar</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{user.fullName}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete user</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay usuarios para mostrar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
