'use client';

import apiClient from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { UserUpdateData } from '@/types';
import React, {useState} from 'react';
import toast from 'react-hot-toast';

// Switch component code included directly
const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, checked = false, onCheckedChange, ...props }, ref) => {
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    onCheckedChange?.(!checked)
  }

  return (
    <button
      ref={ref}
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      onClick={handleClick}
      className={`inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? "bg-blue-400" : "bg-red-500"}`}
      {...props}
    >
      <span
        className={`
          pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform
          ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  )
})
Switch.displayName = "Switch"

export default function EditProfileForm ({firstName, lastName, userId, role, isActive}: UserUpdateData ){
	const [userName, setUserName] = useState(firstName);
	const [userLastName, setUserLastName] = useState(lastName);
  const [userIsActive, setUserIsActive] = useState(isActive);
	const [isLoading, setIsLoading] = useState(false);
  
  const handleChecketChange = async () => {
    if(userIsActive){
		  const loadingToast = toast.loading('Desactivando usuario...');
        try {
          await apiClient.post(`/admin/inactivate-user`, {userId: userId});
          toast.success('Usuario desactivado correctamente');
        }
        catch (error) {
          console.error('Error updating user info:', error);
          toast.error('Error al actualizar información');
        }
        finally {
          setIsLoading(false);
          toast.dismiss(loadingToast);
        }
    }else{
      const loadingToast = toast.loading('Activando usuario...');
        try {
          await apiClient.post(`/admin/activate-user`,{userId:userId});
          toast.success('Usuario activado correctamente');
        }
        catch (error) {
          console.error('Error updating user info:', error);
          toast.error('Error al actualizar información');
        }
        finally {
          setIsLoading(false);
          toast.dismiss(loadingToast);
        }
    }
    setUserIsActive(!userIsActive);
  }

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const loadingToast = toast.loading('Actualizando información...');
    try {
      // Update user info
      if(role === 'admin'){
        await apiClient.put(`/admin/update/${userId}`, { firstName: userName, lastName: userLastName });
      } else if(role === 'paramedic'){
        await apiClient.put(`/paramedic/${userId}`, { firstName: userName, lastName: userLastName });
      } else if(role === 'operator'){
        await apiClient.put(`/operator/${userId}`, { firstName: userName, lastName: userLastName });
      }else if(role === 'clinic'){
        await apiClient.put(`/healthCenter/update/${userId}`, { firstName: userName, lastName: userLastName });
      }
      toast.success('Información actualizada correctamente');
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.error('Error al actualizar información');
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
			<div className="space-y-4">
				<div>
					<input
						type="text"
						placeholder="Nombre"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
        <div>
					<input
						type="text"
						placeholder="Apellido"
						value={userLastName}
						onChange={(e) => setUserLastName(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col">
          <label htmlFor="user-active-toggle" className="text-base font-medium mb-1">
            Estado del usuario
          </label>
          <span className="text-sm text-gray-600">{userIsActive ? "Usuario activado" : "Usuario desactivado"}</span>
        </div>
        <Switch id="user-active-toggle" checked={userIsActive} onCheckedChange={handleChecketChange} />
      </div>
        {/* <div>
					<input
						type="email"
						placeholder="Email"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Contraseña actual"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
        <div>
					<input
						type="password"
						placeholder="Nueva Contraseña"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
        <div>
					<input
						type="password"
						placeholder="Confirmar Contraseña"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div> */}
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className="w-full px-4 py-3 text-white bg-customRed rounded-full hover:bg-gustomRed focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? 'Cargando...' : 'Guardar Cambios'}
			</button>
		</form>
	);
}
