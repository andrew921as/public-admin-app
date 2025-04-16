import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HealthCenterForm } from '@/components/HealthCenterForm';
import apiClient from '@/api/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

// 🧪 Mocks
jest.mock('@/api/api', () => ({
  post: jest.fn(),
}));

const mockToast = {
  loading: jest.fn().mockReturnValue('toast-id'),
  success: jest.fn(),
  error: jest.fn(),
};
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    loading: (...args: any[]) => mockToast.loading(...args),
    success: (...args: any[]) => mockToast.success(...args),
    error: (...args: any[]) => mockToast.error(...args),
  },
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HealthCenterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and submit button', () => {
    render(<HealthCenterForm />);
    expect(screen.getByPlaceholderText('Nombre del centro medico')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear centro medico/i })).toBeInTheDocument();
  });

  it('successfully creates health center and redirects', async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({});

    render(<HealthCenterForm />);
    fireEvent.change(screen.getByPlaceholderText('Nombre del centro medico'), {
      target: { value: 'Clinica Prueba' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear centro medico/i }));

    expect(mockToast.loading).toHaveBeenCalledWith('Creando centro medico...');

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/clinic/register', {
        healthCenterName: 'Clinica Prueba',
      });
      expect(mockToast.success).toHaveBeenCalledWith('Centro medico creado con éxito!', {
        id: 'toast-id',
      });
      expect(mockPush).toHaveBeenCalledWith('/dashboard/healthCenter');
    });
  });

  it('shows backend error message if provided by AxiosError', async () => {
    const axiosError = new AxiosError('Request failed');
    (axiosError as any).response = {
      data: { message: 'El centro ya existe' },
    };

    (apiClient.post as jest.Mock).mockRejectedValueOnce(axiosError);

    render(<HealthCenterForm />);
    fireEvent.change(screen.getByPlaceholderText('Nombre del centro medico'), {
      target: { value: 'Centro Repetido' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear centro medico/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('El centro ya existe', { id: 'toast-id' });
    });
  });

  it('shows generic error if an unknown error occurs', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Error desconocido'));

    render(<HealthCenterForm />);
    fireEvent.change(screen.getByPlaceholderText('Nombre del centro medico'), {
      target: { value: 'Centro Genérico' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear centro medico/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Error desconocido', { id: 'toast-id' });
    });
  });
});
