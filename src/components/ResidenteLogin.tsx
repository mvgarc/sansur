"use client";

import { useState, FormEvent } from "react";
import { Unidad } from "@/types";
import { mockUnidades } from "@/data/mockUnidades";

export default function ResidenteLogin({
  onSuccess,
}: {
  onSuccess: (unidad: Unidad) => void;
}) {
  const [cedula, setCedula] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    const unidad = mockUnidades.find(
      (u) => u.cedula.replace(/\./g, "") === cedula.replace(/\./g, "")
    );

    if (!unidad) {
      setError("No encontramos esa cédula. Verifica que esté bien escrita.");
      return;
    }
    if (unidad.pin !== pin) {
      setError("El PIN no coincide con esa cédula.");
      return;
    }
    setError("");
    onSuccess(unidad);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="text-2xl font-bold text-sansur-ink">
        Consulta tu estado de cuenta
      </h1>
      <p className="mt-2 text-lg text-sansur-muted">
        Ingresa tu cédula y tu PIN de 4 dígitos.
      </p>

      <form onSubmit={manejarEnvio} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="cedula" className="block text-lg font-semibold">
            Cédula
          </label>
          <input
            id="cedula"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 12.345.678"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="mt-2 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
          />
        </div>

        <div>
          <label htmlFor="pin" className="block text-lg font-semibold">
            PIN (4 dígitos)
          </label>
          <input
            id="pin"
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="mt-2 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl tracking-[0.5em]"
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
          Ver mi ficha
        </button>
      </form>

      <p className="mt-6 text-base text-sansur-muted">
        ¿No recuerdas tu PIN? Pídeselo al administrador del condominio.
      </p>

      <details className="mt-4 text-base text-sansur-muted">
        <summary className="cursor-pointer font-semibold">
          Datos de prueba (solo en este prototipo)
        </summary>
        <ul className="mt-2 list-disc pl-5">
          {mockUnidades.map((u) => (
            <li key={u.id}>
              {u.cedula} · PIN {u.pin}
            </li>
          ))}
        </ul>
      </details>
    </main>
  );
}