'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {SignOut} from '@/firebase/config';

export default function SettingsMenu() {
  const router = useRouter();
  const [tap, setTap] = useState(0);

	const handleLogOut = async () => {
		try {
			await SignOut();
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};
  const handleOnClick = (index:number) => {
    setTap(index);
    if (index) {
      router.push('/dashboard/users');        
    } else {
      router.push('/dashboard');
    }
  }
	return (
		<>
			{/* Side Panel */}
			<div
				className='fixed top-0 left-0 h-full w-1/6 bg-white transform transition-transform duration-300 ease-in-out z-40 translate-x-0'
			>
				{/* Panel Header */}
				<div className="relative bg-customRed text-white p-6">
					<h2 className="text-2xl font-medium">Hola,</h2>
					<p className="text-2xl font-black">Admin!</p>
				</div>

        {/* Panel Body */}
        <div className="py-6">
          <div className={`flex items-center justify-between ${tap === 0 ? 'bg-customRed text-white' : 'text-customRed'} p-4 cursor-pointer `} onClick={() => handleOnClick(0)}>
            <h2 className="text-lg font-medium">En proceso</h2>
          </div>
          <div className={`flex items-center justify-between ${tap === 1 ? 'bg-customRed text-white' : 'text-customRed'} p-4 cursor-pointer`} onClick={() => handleOnClick(1)}>
            <h2 className="text-lg font-medium">Usuarios</h2>
          </div>
        </div>

				{/* Panel Footer with Logout Button */}
				<div className="absolute bottom-0 left-0 right-0 p-6">
					<button onClick={handleLogOut} className="text-customRed text-lg font-medium hover:text-red-700">
						Cerrar sesión
					</button>
				</div>
			</div>
		</>
	);
}
