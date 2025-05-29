// __tests__/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserForm } from "@/components/UserForm";
import apiClient from "@/api/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

jest.mock("@/api/api", () => ({
  post: jest.fn(),
  get: jest.fn().mockResolvedValue({
    data: {
      ambulances: [
        { ambulanceId: "AMB-123" },
        { ambulanceId: "AMB-456" },
      ],
    },
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(),
  loading: jest.fn(() => "toast-id"),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("UserForm", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useAuth as jest.Mock).mockReturnValue({ user: { id: "admin-id" } });
    jest.clearAllMocks();
  });

  test("renders form inputs correctly", () => {
    render(<UserForm />);
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Apellido")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /crear usuario/i })).toBeInTheDocument();
  });

  // test("validates required fields", async () => {
  //   render(<UserForm />);
  //   fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));
  //   await waitFor(() =>
  //     expect(toast.error).toHaveBeenCalledWith("Por favor ingrese un nombre y apellido.")
  //   );
  // });

  // test("validates email format", async () => {
  //   render(<UserForm />);
  //   fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Ana" } });
  //   fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Perez" } });
  //   fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "bademail" } });
  //   fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "123456" } });
  //   fireEvent.change(screen.getByPlaceholderText("Confirmar Contraseña"), { target: { value: "123456" } });
  //   fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));
  //   await waitFor(() =>
  //     expect(toast.error).toHaveBeenCalledWith("Correo electrónico inválido.")
  //   );
  // });

  test("submits form correctly for operator", async () => {
    render(<UserForm />);
    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Perez" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "ana@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "12345678" } });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Contraseña"), { target: { value: "12345678" } });

    fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith("/operator/register", {
        firstName: "Ana",
        lastName: "Perez",
        email: "ana@test.com",
        password: "12345678",
      });
      expect(toast.success).toHaveBeenCalledWith("¡Cuenta creada con éxito!", { id: "toast-id" });
      expect(pushMock).toHaveBeenCalledWith("/dashboard/users");
    });
  });

  test("shows ambulance select when role is paramedic and submits", async () => {
    render(<UserForm />);
  
    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Leo" } });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Ramirez" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "leo@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "87654321" } });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Contraseña"), { target: { value: "87654321" } });
  
    fireEvent.change(screen.getByRole("combobox", { name: "Rol" }), { target: { value: "paramedic" } });
  
    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: "Ambulancia" })).toBeInTheDocument();
    });
  
    fireEvent.change(screen.getByRole("combobox", { name: "Ambulancia" }), {
      target: { value: "AMB-123" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));
  
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith("/paramedic/register", {
        firstName: "Leo",
        lastName: "Ramirez",
        email: "leo@test.com",
        password: "87654321",
        ambulanceId: "AMB-123",
      });
    });
  });

  test("shows error if passwords do not match", async () => {
    render(<UserForm />);
    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Rios" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "lucas@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "12345678" } });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Contraseña"), { target: { value: "87654321" } });

    fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Las contraseñas no coinciden.")
    );
  });
});
