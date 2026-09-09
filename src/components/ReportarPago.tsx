"use client";

import { useState, FormEvent } from "react";
import { Pago, MetodoPago, monedaSegunMetodo } from "@/types";
import { fechaHoyISO, conceptoSugeridoHoy } from "@/lib/format";
import { registrarPagoEnUnidad } from "@/data/mockUnidades";

export default function ReportarPago({
  unidadId,
  onRegistrado,
}: {
  unidadId: string;
  onRegistrado: (pago: Pago) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [metodo, setMetodo] = useState<MetodoPago>("Pago móvil");
  const [montoUSD, setMontoUSD] = useState("");
  const [montoVES, setMontoVES] = useState("");
  const [tasaCambio, setTasaCambio] = useState("");
  const [fecha, setFecha] = useState(fechaHoyISO());
  const [concepto, setConcepto] = useState(conceptoSugeridoHoy());
  const [archivo, setArchivo] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const moneda = monedaSegunMetodo(metodo);
  const equivalenteUSD =
    moneda === "VES" && parseFloat(montoVES) > 0 && parseFloat(tasaCambio) > 0
      ? (parseFloat(montoVES) / parseFloat(tasaCambio)).toFixed(2)
      : null;

  function adjuntarComprobante() {
    // Simulación: en la app real esto abre el selector de fotos del teléfono
    // y sube el archivo a Supabase Storage. Por ahora solo simula el nombre.
    const nombres = ["captura_pago.jpg", "comprobante.png", "recibo_pagomovil.jpg"];
    setArchivo(nombres[Math.floor(Math.random() * nombres.length)]);
  }

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();

    if (!archivo) {
      setError("Adjunta la foto o captura del comprobante.");
      return;
    }

    let nuevoPago: Pago;

    if (moneda === "VES") {
      const bs = parseFloat(montoVES);
      const tasa = parseFloat(tasaCambio);
      if (!bs || bs <= 0) {
        setError("Ingresa el monto en bolívares que pagaste.");
        return;
      }
      if (!tasa || tasa <= 0) {
        setError("Ingresa la tasa BCV del día en que pagaste.");
        return;
      }
      nuevoPago = {
        id: `p-${Date.now()}`,
        fecha,
        concepto,
        monto: parseFloat((bs / tasa).toFixed(2)),
        moneda: "VES",
        montoVES: bs,
        tasaCambio: tasa,
        metodo,
        estado: "pendiente",
        comprobanteUrl: archivo,
      };
    } else {
      const usd = parseFloat(montoUSD);
      if (!usd || usd <= 0) {
        setError("Ingresa el monto en dólares que pagaste.");
        return;
      }
      nuevoPago = {
        id: `p-${Date.now()}`,
        fecha,
        concepto,
        monto: usd,
        moneda: "USD",
        metodo,
        estado: "pendiente",
        comprobanteUrl: archivo,
      };
    }

    setError("");
    registrarPagoEnUnidad(unidadId, nuevoPago);
    onRegistrado(nuevoPago);

    setConfirmado(true);
    setMontoUSD("");
    setMontoVES("");
    setTasaCambio("");
    setArchivo(null);
    setAbierto(false);
    setTimeout(() => setConfirmado(false), 4000);
  }

  return (
    <div className="mt-8">
      {confirmado && (
        <div className="mb-4 rounded-card border-2 border-sansur-green-500 bg-sansur-green-50 p-4 text-lg font-semibold text-sansur-green-700">
          Reportaste tu pago. El administrador lo revisará pronto.
        </div>
      )}

      {!abierto ? (
        <button
          onClick={() => setAbierto(true)}
          className="w-full rounded-card bg-sansur-green-500 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sansur-green-600"
        >
          Reportar un pago
        </button>
      ) : (
        <div className="rounded-card border border-sansur-border bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-sansur-ink">Reportar pago</h3>
            <button
              onClick={() => setAbierto(false)}
              className="text-base font-semibold text-sansur-muted"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
            <div>
              <label htmlFor="metodo" className="block text-lg font-semibold">
                ¿Cómo pagaste?
              </label>
              <select
                id="metodo"
                value={metodo}
                onChange={(e) => setMetodo(e.target.value as MetodoPago)}
                className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
              >
                <option>Pago móvil</option>
                <option>Transferencia</option>
                <option>Zelle</option>
                <option>Efectivo</option>
              </select>
            </div>

            {moneda === "VES" ? (
              <>
                <div>
                  <label htmlFor="montoVES" className="block text-lg font-semibold">
                    ¿Cuántos bolívares pagaste?
                  </label>
                  <input
                    id="montoVES"
                    type="number"
                    step="0.01"
                    placeholder="440.00"
                    value={montoVES}
                    onChange={(e) => setMontoVES(e.target.value)}
                    className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
                  />
                </div>
                <div>
                  <label htmlFor="tasaCambio" className="block text-lg font-semibold">
                    Tasa BCV de ese día
                  </label>
                  <input
                    id="tasaCambio"
                    type="number"
                    step="0.01"
                    placeholder="40.00"
                    value={tasaCambio}
                    onChange={(e) => setTasaCambio(e.target.value)}
                    className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
                  />
                  {equivalenteUSD && (
                    <p className="mt-2 text-base text-sansur-muted">
                      Equivale a ${equivalenteUSD}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="montoUSD" className="block text-lg font-semibold">
                  ¿Cuántos dólares pagaste?
                </label>
                <input
                  id="montoUSD"
                  type="number"
                  step="0.01"
                  placeholder="11.00"
                  value={montoUSD}
                  onChange={(e) => setMontoUSD(e.target.value)}
                  className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
                />
              </div>
            )}

            <div>
              <label htmlFor="concepto" className="block text-lg font-semibold">
                ¿A qué mes corresponde?
              </label>
              <input
                id="concepto"
                type="text"
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
              />
            </div>

            <div>
              <label htmlFor="fecha" className="block text-lg font-semibold">
                Fecha en que pagaste
              </label>
              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-4 py-4 text-xl"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold">Comprobante</label>
              <button
                type="button"
                onClick={adjuntarComprobante}
                className="mt-1 w-full rounded-card border-2 border-dashed border-sansur-green-500 bg-sansur-surface px-4 py-6 text-center text-lg text-sansur-muted"
              >
                {archivo ? `✓ ${archivo} adjuntado` : "Toca para adjuntar la foto del comprobante"}
              </button>
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
              Enviar reporte
            </button>
          </form>
        </div>
      )}
    </div>
  );
}