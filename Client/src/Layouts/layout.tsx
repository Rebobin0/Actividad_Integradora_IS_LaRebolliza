import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
        <header className="bg-slate-800">
          <div className="mx-auto py-10 max-w-6xl">
            <h1 className="text-white text-4xl font-extrabold">Administrador de productos</h1> 
          </div>
        </header>
        <main className="mt-10 mx-auto p-10 max-w-6xl bg-white rounded-lg shadow">
          <Outlet/>
        </main>
    </>
  );
}