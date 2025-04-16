import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AmbulanceForm } from '@/components/AmbulanceForm';
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
  error: jest.fn().mockReturnValue('Por favor ingrese el Id de la Ambulancia.'),
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

describe('AmbulanceForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and submit button', () => {
    render(<AmbulanceForm />);
    expect(screen.getByPlaceholderText('Id de la ambulancia')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear ambulancia/i })).toBeInTheDocument();
  });
  it('successfully creates ambulance and redirects', async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({});

    render(<AmbulanceForm />);
    fireEvent.change(screen.getByPlaceholderText('Id de la ambulancia'), {
      target: { value: 'AMB123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear ambulancia/i }));

    expect(mockToast.loading).toHaveBeenCalledWith('Creando Ambulancia...');

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/ambulance/register', { ambulanceId: 'AMB123' });
      expect(mockToast.success).toHaveBeenCalledWith('Ambulancia creada con éxito!', { id: 'toast-id' });
      expect(mockPush).toHaveBeenCalledWith('/dashboard/ambulance');
    });
  });

  it('shows backend error message if provided by AxiosError', async () => {
    const axiosError = new AxiosError('Request failed');
    (axiosError as any).response = {
      data: { message: 'Ambulancia ya registrada' },
    };

    (apiClient.post as jest.Mock).mockRejectedValueOnce(axiosError);

    render(<AmbulanceForm />);
    fireEvent.change(screen.getByPlaceholderText('Id de la ambulancia'), {
      target: { value: 'AMB123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear ambulancia/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Ambulancia ya registrada', { id: 'toast-id' });
    });
  });

  it('shows generic error if thrown error is not from Axios', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Algo salió mal'));

    render(<AmbulanceForm />);
    fireEvent.change(screen.getByPlaceholderText('Id de la ambulancia'), {
      target: { value: 'AMB999' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear ambulancia/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Algo salió mal', { id: 'toast-id' });
    });
  });
});
