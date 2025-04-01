"use client";

import apiClient from "@/api/api";
import { formatDate } from "@/utils/functions";
import { isValidEmail } from "@/utils/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function HealthCenterForm() {
  const [healthCenterName, setHealthCenterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validations
    if (!healthCenterName) {
      toast.error("Por favor ingrese el nombre del centro medico");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Creando centro medico...");

    try {
      // Register patient through backend endpoint
      const response = await apiClient.post(`/clinic/register`, {healthCenterName: healthCenterName});

      // Successful registration
      toast.success("Centro medico creado con éxito!", { id: loadingToast });

      router.push("/dashboard/healthCenter");
    } catch (error: any) {
      // Handle error responses from the backend
      let errorMessage = "Error al crear el centro medico.";

      if (error.response) {
        // Backend returned an error response
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nombre del centro medico"
            value={healthCenterName}
            onChange={(e) => setHealthCenterName(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 text-white bg-customRed rounded-full hover:bg-gustomRed focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Cargando..." : "Crear centro medico"}
      </button>
    </form>
  );
}
