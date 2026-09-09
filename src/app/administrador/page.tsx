"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUnidades } from "@/data/mockUnidades";
import { formatoMonto } from "@/lib/format";
import TarjetaUnidad from "@/components/TarjetaUnidad";
import AdminLogin from "@/components/AdminLogin";

export default function AdministradorPage() {
  const [autenticado, setAutenticado] = useState(false);

  if (!autenticado) {
    return <AdminLogin onSuccess={() => setAutenticado(true)} />;
  }

  const alDia = mockUnidades.filter((u) => u.deuda <= 0).length;
  const conDeuda = mockUnidades.filter((u) => u.deuda > 0).length;
  const deudaTotal = mockUnidades.reduce((s, u) => s + u.deuda, 0);

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
        Manzanas y parcelas
      </h2>
      <div className="flex flex-col gap-4">
        {mockUnidades.map((u) => (
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