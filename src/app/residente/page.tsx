"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUnidades } from "@/data/mockUnidades";
import { identificarUnidad } from "@/types";
import FichaResidente from "@/components/FichaResidente";

export default function ResidentePage() {
  const [idSeleccionado, setIdSeleccionado] = useState("");
  const unidad = mockUnidades.find((u) => u.id === idSeleccionado);

  return (
    <main className="mx-auto max-w-md px-5 py-8 sm:py-12">
      <Link href="/" className="text-lg font-semibold text-sansur-green-600">
        ← Volver
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-sansur-ink">
        Mi estado de cuenta
      </h1>
      <p className="mt-2 text-lg text-sansur-muted">
        Elige tu manzana y parcela para ver tu ficha.
      </p>

      <label htmlFor="unidad" className="mt-6 block text-lg font-semibold">
        Manzana y parcela
      </label>
      <select
        id="unidad"
        value={idSeleccionado}
        onChange={(e) => setIdSeleccionado(e.target.value)}
        className="mt-2 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
      >
        <option value="">— selecciona —</option>
        {mockUnidades.map((u) => (
          <option key={u.id} value={u.id}>
            {identificarUnidad(u)} · {u.nombreResponsable}
          </option>
        ))}
      </select>

      {unidad && (
        <div className="mt-8">
          <FichaResidente unidad={unidad} />
        </div>
      )}
    </main>
  );
}
