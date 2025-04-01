"use client";

import React, { useState, useEffect } from "react";
import { SingleEmergency } from "@/types";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

// Components
import EmergencyInfoComponent from "@/components/EmergencyInfoComponent";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import apiClient from "@/api/api";
import { useAuth } from "@/context/AuthContext";

export default function EmergencyClientPage() {
  const { emergencyId } = useParams() // Get emergencyId from URL
  const [emergency, setEmergency] = useState<SingleEmergency | null>(null); // State for emergency data
  const [error, setError] = useState<Error | null>(null); // State for error handling
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();


  useEffect(() => {
    if (!user) return;
    const loadingToast = toast.loading("Cargando Emergencia...");
    const fetchEmergencies = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/emergency/${emergencyId}`);
        setEmergency(response.data.data);
        console.log(response.data.data);
        toast.success("Emergencia cargada correctamente.", { id: loadingToast });
      } catch (error) {
        console.error("Error fetching emergency: ", error);
        toast.error("Error al cargar la emergencia.", { id: loadingToast });
        setError(error as Error); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, [user]);

  return (
    <main className="min-h-screen bg-white p-4 flex">
      <div className="hidden w-1/6 container md:inline"></div>
      <div className="mt-20 px-4 flex flex-col items-start ml-10 grow">
        <div className="text-customRed mt-4 ml-4">
          <Link href="/dashboard">
            <ArrowBigLeft size={48} />
          </Link>
        </div>
        {error && (
          <>
            <div className="w-11/12 mx-auto p-6 ">
              <div className="text-center space-y-6">
                <div className="pb-4">
                  <h1 className="text-2xl font-bold inline-block px-4 pb-1">
                    {error.message}
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}

        {!emergency && !error && loading &&(
          <>
            <div className="w-11/12 mx-auto p-6 ">
              <div className="text-center space-y-6">
                <div className="pb-4">
                  <h1 className="text-2xl font-bold inline-block px-4 pb-1">
                    Cargando...
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}

        {emergency && (
          <>
            {" "}
            <EmergencyInfoComponent emergency={emergency} />
            {/* <DynamicMap
        latitude={emergency ? emergency.emergencyLocation.latitude : 3.382325}
        longitude={
          emergency ? emergency.emergencyLocation.longitude : -76.528043
        }
      /> */}
            {/* <ConfirmStrokeComponent emergencyId={emergencyId} /> */}
          </>
        )}
      </div>
    </main>
  );
}
