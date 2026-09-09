"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUnidades } from "@/data/mockUnidades";
import { Unidad } from "@/types";
import { formatoMonto } from "@/lib/format";
import TarjetaUnidad from "@/components/TarjetaUnidad";
import AdminLogin from "@/components/AdminLogin";
import FormularioNuevaUnidad from "@/components/FormularioNuevaUnidad";
import PagosPendientes from "@/components/PagosPendientes";

export default function AdministradorPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [unidades, setUnidades] = useState<Unidad[]>(mockUnidades);

  if (!autenticado) {
    return <AdminLogin onSuccess={() => setAutenticado(true)} />;
  }

  const alDia = unidades.filter((u) => u.deuda <= 0).length;
  const conDeuda = unidades.filter((u) => u.deuda > 0).length;
  const deudaTotal = unidades.reduce((s, u) => s + u.deuda, 0);

  function agregarUnidad(nueva: Unidad) {
    setUnidades((prev) => [...prev, nueva]);
  }

  function aprobarPago(unidadId: string, pagoId: string) {
    setUnidades((prev) =>
      prev.map((u) => {
        if (u.id !== unidadId) return u;
        const pago = u.historial.find((p) => p.id === pagoId);
        if (!pago) return u;
        return {
          ...u,
          deuda: Math.max(0, u.deuda - pago.monto),
          historial: u.historial.map((p) =>
            p.id === pagoId ? { ...p, estado: "aprobado" as const } : p
          ),
        };
      })
    );
  }

  function rechazarPago(unidadId: string, pagoId: string) {
    setUnidades((prev) =>
      prev.map((u) => {
        if (u.id !== unidadId) return u;
        return {
          ...u,
          historial: u.historial.map((p) =>
            p.id === pagoId ? { ...p, estado: "rechazado" as const } : p
          ),
        };
      })
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-8 sm:py-12">
      <Link href="/" className="text-lg font-semibold text-sansur-green-600">
        ← Volver
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-sansur-ink">
        Panel del administrador
      </h1>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Resumen numero={alDia} etiqueta="Al día" />
        <Resumen numero={conDeuda} etiqueta="Con deuda" />
        <Resumen numero={formatoMonto(deudaTotal)} etiqueta="Deuda total" />
      </div>

      <h2 className="mb-3 mt-10 text-2xl font-bold text-sansur-ink">
        Pagos pendientes de revisión
      </h2>
      <PagosPendientes
        unidades={unidades}
        onAprobar={aprobarPago}
        onRechazar={rechazarPago}
      />

      <h2 className="mb-3 mt-10 text-2xl font-bold text-sansur-ink">
        Manzanas y parcelas
      </h2>
      <div className="mb-4">
        <FormularioNuevaUnidad onCrear={agregarUnidad} />
      </div>
      <div className="flex flex-col gap-4">
        {unidades.map((u) => (
          <TarjetaUnidad key={u.id} unidad={u} />
        ))}
      </div>
    </main>
  );
}

function Resumen({ numero, etiqueta }: { numero: number | string; etiqueta: string }) {
  return (
    <div className="rounded-card border border-sansur-border bg-sansur-surface p-4 text-center">
      <p className="text-2xl font-bold text-sansur-green-700">{numero}</p>
      <p className="text-base text-sansur-muted">{etiqueta}</p>
    </div>
  );
}