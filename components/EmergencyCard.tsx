import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";

interface EmergencyCardProps {
  userName: string;
  userPhone: string;
  emergencyId: string;
}

export default function EmergencyCard({
  userName,
  userPhone,
  emergencyId,
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
        <div className="flex">
          <div>
            <p className="text-customRed font-medium">{userName}</p>
            <p className="text-customRed">+57 {userPhone}</p>
          </div>
          <div className="ml-10 flex gap-10 h-2/6 w-2/6">
            <Button onClick={handleClick} title="Mas informacion" color="green" />
            <Button onClick={()=>setIsModalOpen(true)} title="Cancelar proceso" color="red" />
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
