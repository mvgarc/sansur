"use client";

import { useState } from "react";
import { Unidad, identificarUnidad, Pago } from "@/types";
import FichaResidente from "@/components/FichaResidente";
import ResidenteLogin from "@/components/ResidenteLogin";
import HistorialPagos from "@/components/HistorialPagos";
import ReportarPago from "@/components/ReportarPago";

export default function ResidentePage() {
  const [unidad, setUnidad] = useState<Unidad | null>(null);

  if (!unidad) {
    return <ResidenteLogin onSuccess={setUnidad} />;
  }

  function agregarPagoALaVista(pago: Pago) {
    setUnidad((prev) =>
      prev ? { ...prev, historial: [pago, ...prev.historial] } : prev
    );
  }

  return (
    <main className="mx-auto max-w-md px-5 py-8 sm:py-12">
      <button
        onClick={() => setUnidad(null)}
        className="text-lg font-semibold text-sansur-green-600"
      >
        ← Salir
      </button>

      <h1 className="mt-4 text-3xl font-bold text-sansur-ink">
        {identificarUnidad(unidad)}
      </h1>
      <p className="mt-2 text-lg text-sansur-muted">
        Este es tu estado de cuenta.
      </p>

      <div className="mt-6">
        <FichaResidente unidad={unidad} />
      </div>

      <ReportarPago unidadId={unidad.id} onRegistrado={agregarPagoALaVista} />

      <HistorialPagos historial={unidad.historial} />
    </main>
  );
}