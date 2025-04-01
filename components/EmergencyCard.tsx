import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import { Emergency, EmergencyInfo } from "@/types";

interface EmergencyCardProps {
  userName: string;
  emergencyId: string;
  emergencyTime: string;
  emergency: Emergency;
}

export default function EmergencyCard({
  userName,
  emergencyId,
  emergencyTime,
  emergency,
}: EmergencyCardProps) {
  const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClick = () => {
    router.push(`dashboard/emergency/${emergencyId}`);
  };
  const handleConfirm = () => {
    console.log(`Emergency ${emergencyId} confirmed`);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="border-b border-red-200 py-4 w-full cursor-pointer"
      >
        <div className="flex flex-col md:flex-row">
          <div>
            <p className="text-customRed font-medium">{userName}</p>
            <p className="text-customRed">{emergencyTime}</p>
          </div>
          <div className=" flex flex-col gap-10 md:ml-10 md:flex-row md:h-2/6 md:w-2/6">
            <Button onClick={handleClick} title="Mas informacion" color="green" />
          </div>
          <ConfirmModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={handleConfirm}
                  title='Seguro que quiere descartar esta emergencia?' // Pasamos el título dinámico
                />
        </div>
      </div>
    </>
  );
}
