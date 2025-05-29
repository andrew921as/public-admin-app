import { fireEvent, render, screen } from '@testing-library/react';
import SettingsDropdownMenu from '@/components/SettingsDropdownMenu';

jest.mock('@/components/MenuInformation', () => () => <div>Información del menú</div>);

describe('SettingsDropdownMenu', () => {
  it('renders the menu button initially', () => {
    render(<SettingsDropdownMenu />);
    expect(screen.getByText('Menú')).toBeInTheDocument();
  });

  it('opens the side panel when menu button is clicked', () => {
    render(<SettingsDropdownMenu />);
    const menuButton = screen.getByText('Menú');
    fireEvent.click(menuButton);
    expect(screen.getByText('Admin!')).toBeInTheDocument();
    expect(screen.getByText('Información del menú')).toBeInTheDocument();
  });
});
