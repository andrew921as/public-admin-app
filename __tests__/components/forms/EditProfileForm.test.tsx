import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfileForm from '@/components/EditProfileForm';
import apiClient from '@/api/api';
import toast from 'react-hot-toast';

// 🔧 Mock de apiClient
jest.mock('@/api/api', () => ({
  post: jest.fn(),
  put: jest.fn(),
}));

// 🔧 Mock de toast
const mockToast = {
  loading: jest.fn().mockReturnValue('toast-id'),
  success: jest.fn(),
  error: jest.fn(),
  dismiss: jest.fn(),
};
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    loading: (...args: any[]) => mockToast.loading(...args),
    success: (...args: any[]) => mockToast.success(...args),
    error: (...args: any[]) => mockToast.error(...args),
    dismiss: (...args: any[]) => mockToast.dismiss(...args),
  },
}));

describe('EditProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders inputs and switch', () => {
    render(
      <EditProfileForm
        firstName="John"
        lastName="Doe"
        userId="user123"
        role="admin"
        isActive={true}
      />
    );

    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Apellido')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('updates user info successfully', async () => {
    render(
      <EditProfileForm
        firstName="John"
        lastName="Doe"
        userId="user123"
        role="admin"
        isActive={true}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText('Apellido'), {
      target: { value: 'Smith' },
    });

    fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));

    expect(mockToast.loading).toHaveBeenCalledWith('Actualizando información...');
    await waitFor(() => {
      expect(apiClient.put).toHaveBeenCalledWith('/admin/update/user123', {
        firstName: 'Jane',
        lastName: 'Smith',
      });
    });
    expect(mockToast.success).toHaveBeenCalledWith('Información actualizada correctamente');
    expect(mockToast.dismiss).toHaveBeenCalledWith('toast-id');
  });

  it('toggles user status from active to inactive', async () => {
    render(
      <EditProfileForm
        firstName="John"
        lastName="Doe"
        userId="user123"
        role="admin"
        isActive={true}
      />
    );

    fireEvent.click(screen.getByRole('switch'));

    expect(mockToast.loading).toHaveBeenCalledWith('Desactivando usuario...');
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/admin/inactivate-user', {
        userId: 'user123',
      });
    });
    expect(mockToast.success).toHaveBeenCalledWith('Usuario desactivado correctamente');
    expect(mockToast.dismiss).toHaveBeenCalledWith('toast-id');
  });

  it('toggles user status from inactive to active', async () => {
    render(
      <EditProfileForm
        firstName="Ana"
        lastName="Perez"
        userId="user456"
        role="admin"
        isActive={false}
      />
    );

    fireEvent.click(screen.getByRole('switch'));

    expect(mockToast.loading).toHaveBeenCalledWith('Activando usuario...');
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/admin/activate-user', {
        userId: 'user456',
      });
    });
    expect(mockToast.success).toHaveBeenCalledWith('Usuario activado correctamente');
    expect(mockToast.dismiss).toHaveBeenCalledWith('toast-id');
  });

  it('shows error toast when update fails', async () => {
    (apiClient.put as jest.Mock).mockRejectedValueOnce(new Error('Update failed'));

    render(
      <EditProfileForm
        firstName="John"
        lastName="Doe"
        userId="user123"
        role="admin"
        isActive={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Error al actualizar información');
    });
  });
});
