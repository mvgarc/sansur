"use client";

import { useState } from "react";
import { Unidad, identificarUnidad } from "@/types";
import { formatoMonto, formatoFecha, formatoBs } from "@/lib/format";
import { cuotasAtrasadas, cuotasQueCubre } from "@/lib/deuda";

interface PagoPendiente {
  unidad: Unidad;
  pagoId: string;
}

export default function PagosPendientes({
  unidades,
  onAprobar,
  onRechazar,
}: {
  unidades: Unidad[];
  onAprobar: (unidadId: string, pagoId: string) => void;
  onRechazar: (unidadId: string, pagoId: string) => void;
}) {
  const [expandido, setExpandido] = useState<string | null>(null);

  const pendientes: PagoPendiente[] = unidades.flatMap((u) =>
    u.historial
      .filter((p) => p.estado === "pendiente")
      .map((p) => ({ unidad: u, pagoId: p.id }))
  );

  if (pendientes.length === 0) {
    return (
      <div className="rounded-card border border-sansur-border bg-white p-6 text-lg text-sansur-muted">
        No hay comprobantes pendientes por revisar.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {pendientes.map(({ unidad, pagoId }) => {
        const pago = unidad.historial.find((p) => p.id === pagoId)!;
        const atrasadasAntes = cuotasAtrasadas(unidad.cuotaMensual, unidad.deuda);
        const cubiertas = cuotasQueCubre(unidad.cuotaMensual, pago.monto);
        const deudaDespues = Math.max(0, unidad.deuda - pago.monto);
        const atrasadasDespues = cuotasAtrasadas(unidad.cuotaMensual, deudaDespues);
        const key = `${unidad.id}-${pagoId}`;
        const abierto = expandido === key;

        return (
          <div key={key} className="rounded-card border border-sansur-border bg-white">
            <button
              onClick={() => setExpandido(abierto ? null : key)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <p className="text-lg font-bold text-sansur-ink">
                  {identificarUnidad(unidad)} · {unidad.nombreResponsable}
                </p>
                <p className="text-base text-sansur-muted">
                  {pago.concepto} ·{" "}
                  {pago.moneda === "VES" && pago.montoVES
                    ? `${formatoBs(pago.montoVES)} (≈ ${formatoMonto(pago.monto)})`
                    : formatoMonto(pago.monto)}{" "}
                  · {pago.metodo} · {formatoFecha(pago.fecha)}
                </p>
              </div>
              <span className="text-lg text-sansur-muted">{abierto ? "▲" : "▼"}</span>
            </button>

            {abierto && (
              <div className="border-t border-sansur-border px-5 py-4">
                <p className="text-lg text-sansur-ink">
                  Antes de este pago, {unidad.nombreResponsable} debía{" "}
                  <strong>{formatoMonto(unidad.deuda)}</strong>
                  {atrasadasAntes > 0 &&
                    ` (${atrasadasAntes} cuota${atrasadasAntes === 1 ? "" : "s"} atrasada${atrasadasAntes === 1 ? "" : "s"})`}
                  .
                </p>
                <p className="mt-2 text-lg text-sansur-ink">
                  Este pago de {formatoMonto(pago.monto)}
                  {pago.moneda === "VES" && pago.montoVES && (
                    <> ({formatoBs(pago.montoVES)} a tasa {pago.tasaCambio})</>
                  )}{" "}
                  cubre{" "}
                  <strong>
                    {cubiertas} cuota{cubiertas === 1 ? "" : "s"}
                  </strong>
                  .
                </p>
                <p className="mt-2 text-lg text-sansur-ink">
                  Si lo apruebas, la deuda quedaría en{" "}
                  <strong>{formatoMonto(deudaDespues)}</strong>
                  {atrasadasDespues > 0
                    ? ` (${atrasadasDespues} cuota${atrasadasDespues === 1 ? "" : "s"} pendiente${atrasadasDespues === 1 ? "" : "s"}).`
                    : " — al día."}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      onAprobar(unidad.id, pagoId);
                      setExpandido(null);
                    }}
                    className="rounded-card bg-sansur-green-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-sansur-green-600"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => {
                      onRechazar(unidad.id, pagoId);
                      setExpandido(null);
                    }}
                    className="rounded-card border-2 border-sansur-alert px-5 py-3 text-lg font-semibold text-sansur-alert"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}