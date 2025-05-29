'use client';

import MenuInformation from './MenuInformation';

export default function SettingsMenu() {
  // const [isOpen, setIsOpen] = useState(false);

  // Close panel when pressing Escape key

	// useEffect(() => {
	// 	const handleEscape = (event: KeyboardEvent) => {
	// 		if (event.key === 'Escape') {
	// 			setIsOpen(false);
	// 		}
	// 	};

	// 	document.addEventListener('keydown', handleEscape);
	// 	return () => document.removeEventListener('keydown', handleEscape);
	// }, []);

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
				<MenuInformation />
			</div>
		</>
	);
}
