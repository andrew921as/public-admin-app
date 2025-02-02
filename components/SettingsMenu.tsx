'use client';

import {Settings, X} from 'lucide-react';
import {useState, useEffect} from 'react';
import {SignOut} from '@/firebase/config';

export default function SettingsMenu() {

	const handleLogOut = async () => {
		try {
			await SignOut();
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<>
			{/* Side Panel */}
			<div
				className='fixed top-0 left-0 h-full w-1/6 bg-white transform transition-transform duration-300 ease-in-out z-40 translate-x-0'
			>
				{/* Panel Header */}
				<div className="relative bg-customRed text-white p-6">
					<h2 className="text-2xl font-medium">Hola,</h2>
					<p className="text-2xl font-black">Administrador!</p>
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
