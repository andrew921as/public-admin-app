export const formatDate = (date: Date | string | null | undefined) => {
	if (!date) return 'Ahorita';

	try {
		// Convert string to Date if it's a string
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		// Check if dateObj is a valid date
		if (isNaN(dateObj.getTime())) {
			throw new Error('Invalid date');
		}

		return new Intl.DateTimeFormat('es-CO', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(dateObj);
	} catch (error) {
		console.error('Error formatting date:', error, 'Original value:', date);
		return 'Fecha desconocida';
	}
};


// Helper to convert a UTC ISO string to a local Date with same year/month/day
export function convertUTCToLocal(dateStr: string): Date {
	const d = new Date(dateStr);
	return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}