"use client";

import { AmbulanceForm } from "@/components/AmbulanceForm";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function createAmbulance() {
  return (
    <main className="min-h-screen bg-white p-4 flex">
      {/* Header */}
      {/* <SettingsMenu /> */}

      {/* Main Content */}
      <div className="w-1/6 container"></div>
      <div className="mt-20 px-4 flex flex-col items-start ml-10 grow">
        <div className="text-customRed mt-4 ml-4">
          <Link href="/dashboard/users">
            <ArrowBigLeft size={48} />
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Crear Ambulancia
        </h1>
        <AmbulanceForm />
      </div>
    </main>
  );
}
