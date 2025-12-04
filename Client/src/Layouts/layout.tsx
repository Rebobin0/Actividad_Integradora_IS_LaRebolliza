import React, { type JSX } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";

export default function Layout(): JSX.Element {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto py-6 max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-extrabold">Administrador de productos</h1>
            <p className="text-slate-300 text-sm">Panel de administración</p>
          </div>

          <nav className="flex items-center gap-3">
            <Link className="text-slate-200 hover:text-white" to="/">
              Inicio
            </Link>
            <Link className="text-slate-200 hover:text-white" to="/products/new">
              Nuevo producto
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Cerrar sesión
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="mt-10 mx-auto p-10 max-w-6xl bg-white rounded-lg shadow">
        <Outlet />
      </main>
    </>
  );
}
