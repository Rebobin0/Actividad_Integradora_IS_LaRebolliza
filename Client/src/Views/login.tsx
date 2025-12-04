import React, { useState, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext"; // ajusta la ruta si hace falta

export default function Login(): JSX.Element {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = (searchParams.get("redirectTo") as string) || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });
      const data = await res.json();
      if (data.success) {
        login(); // cambia el estado del contexto y localStorage (tu provider lo hace)
        // volver a la ruta solicitada (replace evita dejar el login en el historial)
        navigate(redirectTo, { replace: true });
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="usuario">
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ingresa tu usuario"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
}
