"use client";

import Button from "@/components/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/api";
import toast from "react-hot-toast";

interface Ambulance {
  ambulanceId: string;
  status: string;
}

export default function AmbulancePage() {
  const router = useRouter();
  const [ambulances, setambulances] = useState<Ambulance[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(()=>{
    if(!user)return;
    const loadingToast = toast.loading('Cargando Ambulancias...');
    const fetchAmbulances = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/ambulance/all");
        setambulances(response.data.ambulances);
        console.log(response.data.ambulances);
        toast.success('Ambulancias cargadas.', {id: loadingToast});
      } catch (error) {
        console.error("Error fetching ambulances:", error);
        toast.error('Error al cargar las Ambulancias.', {id: loadingToast});
      } finally {
        setLoading(false);
      }
    }
    
    fetchAmbulances();
  },[user]);

  const handleDelete = async (ambulanceId: string) => {
    const loadingToast = toast.loading('Eliminando Ambulancia...');
    try {
      await apiClient.delete(`/ambulance/delete/${ambulanceId}`);
      toast.success('Ambulancia Eliminada exitosamente.', {id: loadingToast});
      setambulances(ambulances.filter((ambulance) => ambulance.ambulanceId !== ambulanceId));
    } catch (error) {
      console.error("Error fetching ambulances:", error);
      toast.error('Error al eliminar la ambulancia.', {id: loadingToast});
    }
  };

  if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-customRed"></div>
			</div>
		);
	}

  return (
    <div className="min-h-screen bg-white p-4 flex">
      <div className="w-1/6 container"></div>
      <div className="mt-20 px-4 flex flex-col items-start ml-10 grow">
        <div className="w-10/12">
          <div className="flex justify-between items-start mb-6 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Ambulancias</h1>
            <div className="w-1/5">
              <Button
                title="Agregar"
                color="green"
                onClick={() =>router.push("ambulance/createAmbulance")}
              />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    Id
                  </th>
                  <th className="text-left py-3 px-4 font-medium">eliminar</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {ambulances.map((ambulance) => (
                  <tr
                    key={ambulance.ambulanceId}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{ambulance.ambulanceId}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(ambulance.ambulanceId)}
                        className="p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete ambulance</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {ambulances.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay ambulancias para mostrar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
