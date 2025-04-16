import {render, screen, fireEvent} from '@testing-library/react';
import ConfirmModal from '@/components/ConfirmModal';

describe('ConfirmModal', () => {
	const mockOnClose = jest.fn();
	const mockOnConfirm = jest.fn();
	const mockAmbulances = [
		{id: '1', name: 'Ambulance 1'},
		{id: '2', name: 'Ambulance 2'},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('does not render when isOpen is false', () => {
		render(<ConfirmModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Test Modal" />);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('renders modal with title when isOpen is true', () => {
		render(<ConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Test Modal" />);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Test Modal')).toBeInTheDocument();
	});

	it('calls onConfirm when click Si', () => {
		render(<ConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Test Modal" />);

		fireEvent.click(screen.getByText("Si"));
		expect(mockOnConfirm).toHaveBeenCalled();
	});

  it('calls onClose when click No', () => {
		render(<ConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Test Modal" />);

		fireEvent.click(screen.getByText("No"));
		expect(mockOnConfirm).not.toHaveBeenCalled();
	});
});
