import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/Input';

describe('Input component', () => {
  it('renders with default props', () => {
    render(<Input />);
    const input = screen.getByPlaceholderText('Ingrese un valor') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
    expect(input.value).toBe('');
  });

  it('renders label when withLabel is true', () => {
    render(<Input withLabel placeholder="Correo electrónico" name="email" />);
    expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Ingrese un valor');
    fireEvent.change(input, { target: { value: 'nuevo texto' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders as required when required prop is true', () => {
    render(<Input required />);
    const input = screen.getByPlaceholderText('Ingrese un valor');
    expect(input).toBeRequired();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByPlaceholderText('Ingrese un valor');
    expect(input).toBeDisabled();
  });

  it('applies maxLength, min, and step props', () => {
    render(<Input maxLength={10} min={5} step={1} type="number" />);
    const input = screen.getByPlaceholderText('Ingrese un valor');
    expect(input).toHaveAttribute('maxlength', '10');
    expect(input).toHaveAttribute('min', '5');
    expect(input).toHaveAttribute('step', '1');
  });
});
