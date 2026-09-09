"use client";

import { useState, FormEvent } from "react";

// Credenciales fijas SOLO para este prototipo sin backend.
// En el paso de Supabase, esto se reemplaza por autenticación real
// (Supabase Auth), y estas credenciales dejan de existir en el código.
const USUARIO_DEMO = "admin";
const CLAVE_DEMO = "sansur2026";

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    if (usuario === USUARIO_DEMO && clave === CLAVE_DEMO) {
      setError("");
      onSuccess();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="text-2xl font-bold text-sansur-ink">
        Acceso del administrador
      </h1>
      <p className="mt-2 text-lg text-sansur-muted">
        Ingresa tu usuario y contraseña.
      </p>

      <form onSubmit={manejarEnvio} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="usuario" className="block text-lg font-semibold">
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            autoComplete="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mt-2 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
          />
        </div>

        <div>
          <label htmlFor="clave" className="block text-lg font-semibold">
            Contraseña
          </label>
          <input
            id="clave"
            type="password"
            autoComplete="current-password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="mt-2 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
          />
        </div>

        {error && (
          <p role="alert" className="text-lg font-semibold text-sansur-alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 rounded-card bg-sansur-green-500 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sansur-green-600"
        >
          Ingresar
        </button>
      </form>

      <p className="mt-6 text-base text-sansur-muted">
        Prototipo — usuario: <code>admin</code> / contraseña: <code>sansur2026</code>
      </p>
    </main>
  );
}