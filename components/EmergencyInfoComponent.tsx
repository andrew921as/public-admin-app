'use client';

import { EmergencyInfo } from "@/types";


export default function EmergencyInfoComponent({ 
  emergencyId,
  userName,
  userPhone,
  userAge,
  userAddress,
  userWeight,
  userHeight,
  emergencyLocation,
  strokeLevel = "...",
  emergencyTime
}: EmergencyInfo) {
  const readableString = emergencyTime ? emergencyTime.toLocaleString() : "Ahorita"
  return (
    <div className="w-11/12 p-6 ">
      <div className=" space-y-6">
        <div className="pb-4">
          <h1 className="text-2xl font-bold inline-block px-4 pb-1">
            {userName}
          </h1>
        </div>
        
        <div className="block">
          <div className="flex">
            <h2 className="text-custom-black font-bold text-sm">Teléfono:</h2>
            <p className="text-custom-black font-medium ml-2">{userPhone}</p>
          </div>
          <br />
          <div className="flex">
            <h2 className="text-custom-black text-sm font-bold">Edad</h2>
            <p className="text-custom-black font-medium ml-2">{userAge} años</p>
          </div>
          <br />
          <div className="flex">
            <h2 className="text-custom-black text-sm font-bold">Peso</h2>
            <p className="text-custom-black font-medium ml-2">{userWeight} kg</p>
          </div>
          <br />
          <div className="flex">
            <h2 className="text-custom-black text-sm font-bold">Estatura</h2>
            <p className="text-custom-black font-medium ml-2">{userHeight} m</p>
          </div>
          <br />
          <div className="flex">
            <h2 className="text-custom-black text-sm font-bold">Nivel De Stroke</h2>
            <p className="text-custom-black font-medium ml-2">{strokeLevel}</p>
          </div>
          <br />
          <div className="flex">
            <h2 className="text-custom-black text-sm font-bold whitespace-wrap">
              Tiempo desde que inició la emergencia
            </h2>
            <p className="text-custom-black font-medium ml-2">{readableString}</p>
          </div>
        </div>
      </div>
    </div>
  );
}