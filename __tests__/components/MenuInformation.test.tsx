import { render, screen, fireEvent } from '@testing-library/react';
import MenuInformation from '@/components/MenuInformation';
import { useRouter } from 'next/navigation';
import { SignOut } from '@/firebase/config';

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/firebase/config', () => ({
  SignOut: jest.fn(),
}));

describe('MenuInformation component', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('renders all menu items and logout button', () => {
    render(<MenuInformation />);
    expect(screen.getByText('En proceso')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Ambulancias')).toBeInTheDocument();
    expect(screen.getByText('Hospitales')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  it('navigates to the correct route when a menu item is clicked', () => {
    render(<MenuInformation />);

    fireEvent.click(screen.getByText('Usuarios'));
    expect(pushMock).toHaveBeenCalledWith('/dashboard/users');

    fireEvent.click(screen.getByText('Ambulancias'));
    expect(pushMock).toHaveBeenCalledWith('/dashboard/ambulance');

    fireEvent.click(screen.getByText('Hospitales'));
    expect(pushMock).toHaveBeenCalledWith('/dashboard/healthCenter');
  });

  it('calls SignOut when "Cerrar sesión" is clicked', async () => {
    render(<MenuInformation />);
    const button = screen.getByText('Cerrar sesión');
    fireEvent.click(button);
    expect(SignOut).toHaveBeenCalled();
  });
});
