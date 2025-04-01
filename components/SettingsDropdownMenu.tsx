'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {SignOut} from '@/firebase/config';
import { Menu, X } from 'lucide-react';
import MenuInformation from './MenuInformation';

export default function SettingsDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close panel when pressing Escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);
	return (
		<>
			{/* Settings Button */}
			<div onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-white text-customRed cursor-pointer z-20">
				<Menu className="w-8 h-8" />
				<span className="text-lg font-medium">Menú</span>
			</div>

			{/* Overlay */}
			{isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30" onClick={() => setIsOpen(false)} />}

			{/* Side Panel */}
			<div
				className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white transform transition-transform duration-300 ease-in-out z-40 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Panel Header */}
        <div className="relative bg-customRed text-white p-6">
        <h2 className="text-2xl font-medium">Hola,</h2>
        <p className="text-2xl font-black">Admin!</p>
        <X
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 w-6 h-6 cursor-pointer"
        />
      </div>
				<MenuInformation />
			</div>
		</>
	);
}
