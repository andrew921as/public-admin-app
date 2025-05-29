import { render, screen } from '@testing-library/react';
import EmergencyInfoComponent from '@/components/EmergencyInfoComponent';
import { SingleEmergency } from '@/types';
import { formatDate } from '@/utils/functions';

// Mock formatDate to return a predictable string
jest.mock('@/utils/functions', () => ({
  formatDate: jest.fn((date) => `formatted-${date}`),
}));

describe('EmergencyInfoComponent', () => {
  it('should show loading message when emergency is null', () => {
    render(<EmergencyInfoComponent emergency={null} />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render patient emergency info correctly', () => {
    const emergency: SingleEmergency = {
      id: 'em1',
      status: 'COMPLETED',
      startDate: '2023-01-01T00:00:00Z',
      pickupDate: '2023-01-01T01:00:00Z',
      deliveredDate: '2023-01-01T02:00:00Z',
      patient: {
        age: 30,
        weight: 70,
        height: 170,
        firstName: 'Juan',
        lastName: 'Pérez',
      },
      // agrega otros campos si tu tipo `SingleEmergency` los requiere
    };

    render(<EmergencyInfoComponent emergency={emergency} />);

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('30 años')).toBeInTheDocument();
    expect(screen.getByText('70 kg')).toBeInTheDocument();
    expect(screen.getByText('170 cm')).toBeInTheDocument();
    expect(screen.getByText('formatted-2023-01-01T00:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('formatted-2023-01-01T01:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('formatted-2023-01-01T02:00:00Z')).toBeInTheDocument();
  });
});
