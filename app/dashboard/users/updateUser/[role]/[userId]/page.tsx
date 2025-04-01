"use client";
import apiClient from "@/api/api";
import EditProfileForm from "@/components/EditProfileForm";
import { StrokeeLogo } from "@/components/StrokeeLogo";
import { useAuth } from "@/context/AuthContext";
import { UserUpdateData } from "@/types";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const { role, userId } = useParams(); // Get emergencyId from URL
  const searchParams = useSearchParams(); // Get URL search params
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserUpdateData | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      setLoading(true);
      const userDataString = searchParams.get('data');
      if (userDataString) {
        try {
          const parsed = JSON.parse(decodeURIComponent(userDataString));
          setUserData(parsed);
        } catch (error) {
          console.error('Failed to parse emergency data:', error);
          fetchUser();
        }
      } else {
        fetchUser();
      }
      setLoading(false);
    };
    const fetchUser = async () => {
      const formatedRol = role === 'clinic' ? 'healthCenter' : role;
    const loadingToast = toast.loading('Cargando Usuario...');
      try {
        const response = await apiClient.get(`/${formatedRol}/${userId}`);
        if (role === 'clinic') {
          setUserData(response.data.healthCenterStaff);
        } else if (role === 'operator') {
          setUserData(response.data.operator);
        } else if (role === 'admin') {
          setUserData(response.data.admin);
        } else if (role === 'paramedic') {
          setUserData(response.data.paramedic);
        } else {
          setUserData(response.data.data);
        }
        toast.success('Usuario cargado.', { id: loadingToast });
      } catch (error) {
        console.error("Error fetching the user:", error);
        toast.error('Error al cargar el usuario, intente mas tarde.', { id: loadingToast });
      } finally {
      }
    }
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-customRed"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 flex">
      <div className="hidden w-1/6 container md:inline"></div>
      
      <div className="text-customRed mt-4 ml-4">
        <Link href="/dashboard/users">
          <ArrowBigLeft size={48} />
        </Link>
      </div>
      <div className="flex w-10/12 min-h-screen flex-col items-center justify-center p-8 gap-8">
        <StrokeeLogo />

        {loading ? (
          <div className="w-6 h-6 border-2 border-customRed border-t-transparent rounded-full animate-spin" />
        ) : (
          <EditProfileForm firstName={userData ? userData.firstName : ""} lastName={userData? userData.lastName:""} role={userData?userData.role:""} isActive={userData?userData.isActive:false} userId={userData?userData.userId:""} />
        )}
      </div>
    </main>
  );
}
