"use client";

import { SingleEmergency } from "@/types";
import { formatDate } from "@/utils/functions";

type EmergencyInfoProps = {
	emergency: SingleEmergency | null;
};

export default function EmergencyInfoComponent({emergency}: EmergencyInfoProps) {

  if (!emergency) {
		return (
			<>
				<div className="w-11/12 mx-auto p-6 ">
					<div className="text-center space-y-6">
						<div className="pb-4">
							<h1 className="text-2xl font-bold inline-block px-4 pb-1">Cargando...</h1>
						</div>
					</div>
				</div>
			</>
		);
	}
  const readableStartDate = formatDate(emergency.startDate);
  const readablePickUpDate = formatDate(emergency?.pickupDate);
  const readableDeliveredDate = formatDate(emergency?.deliveredDate);
	const {age, weight, firstName,lastName, height} = emergency.patient;
	return (
		<div className="w-11/12 mx-auto ">
			<div className="text-center space-y-6">
				<div className="pb-4">
					<h1 className="text-2xl font-bold inline-block px-4 pb-1">
						{firstName} {lastName}
					</h1>
          <h3 className="text-xl font-bold">
            {emergency.status}
          </h3>
				</div>

				<div className="grid grid-cols-2 gap-x-6 gap-y-6">
					<div>
						<h2 className="text-custom-black text-sm font-bold">Edad</h2>
						<p className="text-custom-black font-medium">{age} años</p>
					</div>
					<div>
						<h2 className="text-custom-black text-sm font-bold">Peso</h2>
						<p className="text-custom-black font-medium">{weight} kg</p>
					</div>
					<div>
						<h2 className="text-custom-black text-sm font-bold">Estatura</h2>
						<p className="text-custom-black font-medium">{height} cm</p>
					</div>
					<div>
						<h2 className="text-custom-black text-sm font-bold whitespace-wrap">Fecha de inicio de la emergencia</h2>
						<p className="text-custom-black font-medium">{readableStartDate}</p>
					</div>
          <div>
						<h2 className="text-custom-black text-sm font-bold whitespace-wrap">Fecha de recepción de paciente</h2>
						<p className="text-custom-black font-medium">{readablePickUpDate}</p>
					</div>
          <div>
						<h2 className="text-custom-black text-sm font-bold whitespace-wrap">Fecha de entrega del paciente</h2>
						<p className="text-custom-black font-medium">{readableDeliveredDate}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
