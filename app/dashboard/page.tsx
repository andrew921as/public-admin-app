'use client';

// Mocks
import { emergenciesList } from '@/mocks/emergency';

// Components
import EmergencyCard from '@/components/EmergencyCard';
import { formatDate } from '@/utils/functions';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import apiClient from '@/api/api';
import { Emergency } from '@/types';
import Input from '@/components/Input';
import { View } from 'lucide-react';
import { useRouter } from 'next/navigation';
//import SettingsMenu from '@/components/SettingsMenu';

export default function Dashboard() {
  const router = useRouter();
  
  const [data, setData] = useState<Emergency[]>([]); // State for emergency data
  const [filteredEmergencies, setFilteredEmergencies] = useState<Emergency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const loadingToast = toast.loading("Cargando Usuarios...");
    const fetchEmergencies = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/emergency/all");
        setData(response.data.data);
        console.log(response.data.data);
        setFilteredEmergencies(response.data.data);
        toast.success("Emergencias cargadas correctamente.", { id: loadingToast });
      } catch (error) {
        console.error("Error fetching emergencies:", error);
        toast.error("Error al cargar las emergencias.", { id: loadingToast });
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, [user]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmergencies(data);
    } else {
      const filtered = data.filter(
        (emergency) => {
          const formattedDate = formatDate(emergency.startDate);
          const formattedDeliveredDate = formatDate(emergency.deliveredDate);
          return (
            emergency.status.toLowerCase().includes(searchTerm.toLowerCase()) || formattedDate.toLowerCase().includes(searchTerm.toLowerCase()) || formattedDeliveredDate.toLowerCase().includes(searchTerm.toLowerCase()))
        }
      );
      setFilteredEmergencies(filtered);
    }
  }, [searchTerm, user]);

  if (data === null) {
    return (
      <main className="min-h-screen bg-white p-4">
        {/* Main Content */}
        <div className="mt-12 px-4 flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Emergencias Confirmadas
          </h1>
          <p className="text-gray-600">Cargando emergencias...</p>
          {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-customRed"></div> */}
        </div>
      </main>
    );
  }

  if (data === undefined) {
    return (
      <main className="min-h-screen bg-white p-4">
        {/* Main Content */}
        <div className="mt-12 px-4 flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Emergencias Confirmadas
          </h1>
          <p className="text-gray-600">No hay emergencias.</p>
          {/* <div className="animate-pulse rounded-full h-32 w-32 border-t-2 border-b-2 border-customRed"></div> */}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 flex">
      {/* Header */}
      {/* <SettingsMenu /> */}

      {/* Main Content */}
      <div className='hidden w-1/6 container md:block'></div>
      <div className="mt-20 px-4 flex flex-col items-start ml-10 grow md:ml-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">En proceso</h1>

        {/* Patient Information */}
        <div className="mb-6 hover:scale-105 transition-transform duration-300 ease-out">
          <Input type="text" placeholder="Buscar emergencia" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">
                  Hora de inicio
                </th>
                <th className="text-left py-3 px-4 font-medium">Llegada al Hospital</th>
                <th className="text-left py-3 px-4 font-medium">Estado</th>
                <th className="text-left py-3 px-4 font-medium">Ambulancia</th>
                <th className="text-left py-3 px-4 font-medium">Ver mas</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredEmergencies.map((emergency) => {
                const formattedDate = formatDate(emergency.startDate);
                const formattedPickupDate = formatDate(emergency.pickupDate);
                const formattedDeliveredDate = formatDate(emergency.deliveredDate);
                return (
                  <tr
                    key={emergency.emergencyId}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{formattedDate}</td>
                    <td className="py-3 px-4">{formattedDeliveredDate}</td>
                    <td className="py-3 px-4">{emergency.status}</td>
                    <td className="py-3 px-4">{emergency.ambulanceId}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => router.push(`/dashboard/emergency/${emergency.emergencyId}`)}
                        className="p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                      >
                        <View className="h-4 w-4" />
                        <span className="sr-only">Ver detalle</span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay usuarios para mostrar
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
