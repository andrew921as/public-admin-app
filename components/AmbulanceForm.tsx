"use client";

import apiClient from "@/api/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function AmbulanceForm() {
  const [ambulanceId, setAmbulanceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validations
    if (!ambulanceId) {
      toast.error("Por favor ingrese el Id de la Ambulancia.");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Creando Ambulancia...");

    try {
      // Register patient through backend endpoint
      await apiClient.post(`/ambulance/register`, {ambulanceId: ambulanceId});

      // Successful registration
      toast.success("Ambulancia creada con éxito!", { id: loadingToast });

      // Redirect to login page
      router.push("/dashboard/ambulance");
    } catch (error: any) {
      // Handle error responses from the backend
      let errorMessage = "Error al crear la ambulancia.";

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
            placeholder="Id de la ambulancia"
            value={ambulanceId}
            onChange={(e) => setAmbulanceId(e.target.value)}
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
        {isLoading ? "Cargando..." : "Crear Ambulancia"}
      </button>
    </form>
  );
}
