import { SignOut } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MenuInformation() {
  const router = useRouter();
  const [tap, setTap] = useState(0);

  const handleOnClick = (index: number) => {
    setTap(index);
    switch (index) {
      case 0:
        router.push("/dashboard");
        break;
      case 1:
        router.push("/dashboard/users");
        break;
      case 2:
        router.push("/dashboard/ambulance");
        break;
      default:
        router.push("/dashboard");
    }
  };

  const handleLogOut = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Panel Body */}
      <div className="py-6">
        <div
          className={`flex items-center justify-between ${
            tap === 0 ? "bg-customRed text-white" : "text-customRed"
          } p-4 cursor-pointer `}
          onClick={() => handleOnClick(0)}
        >
          <h2 className="text-lg font-medium">En proceso</h2>
        </div>
        <div
          className={`flex items-center justify-between ${
            tap === 1 ? "bg-customRed text-white" : "text-customRed"
          } p-4 cursor-pointer`}
          onClick={() => handleOnClick(1)}
        >
          <h2 className="text-lg font-medium">Usuarios</h2>
        </div>
        <div
          className={`flex items-center justify-between ${
            tap === 2 ? "bg-customRed text-white" : "text-customRed"
          } p-4 cursor-pointer`}
          onClick={() => handleOnClick(2)}
        >
          <h2 className="text-lg font-medium">Ambulancias</h2>
        </div>
      </div>

      {/* Panel Footer with Logout Button */}
      <div className="bottom-0 left-0 right-0 p-6">
        <button
          onClick={handleLogOut}
          className="text-customRed text-lg font-medium hover:text-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
