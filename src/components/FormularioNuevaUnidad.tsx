"use client";

import { useState, FormEvent } from "react";
import { Unidad } from "@/types";

export default function FormularioNuevaUnidad({
  onCrear,
}: {
  onCrear: (unidad: Unidad) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [manzana, setManzana] = useState("");
  const [parcela, setParcela] = useState("");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [pin, setPin] = useState("");
  const [cuota, setCuota] = useState("11");
  const [confirmacion, setConfirmacion] = useState("");

  function limpiar() {
    setManzana("");
    setParcela("");
    setNombre("");
    setCedula("");
    setPin("");
    setCuota("11");
  }

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    if (!manzana || !parcela || !nombre || !cedula || pin.length !== 4) {
      return;
    }
    const nueva: Unidad = {
      id: `u-${Date.now()}`,
      manzana: parseInt(manzana, 10),
      parcela: parseInt(parcela, 10),
      nombreResponsable: nombre,
      cedula,
      pin,
      cuotaMensual: parseFloat(cuota) || 0,
      deuda: 0,
      historial: [],
    };
    onCrear(nueva);
    setConfirmacion(`Se agregó Manzana ${nueva.manzana}, Parcela ${nueva.parcela}.`);
    limpiar();
    setTimeout(() => setConfirmacion(""), 3500);
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="rounded-card border-2 border-sansur-green-500 px-5 py-3 text-lg font-semibold text-sansur-green-700 transition hover:bg-sansur-green-50"
      >
        + Agregar nueva unidad
      </button>
    );
  }

  return (
    <div className="rounded-card border border-sansur-border bg-sansur-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-sansur-ink">Nueva unidad</h3>
        <button
          onClick={() => setAbierto(false)}
          className="text-base font-semibold text-sansur-muted"
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="manzana" className="block text-base font-semibold">
              Manzana
            </label>
            <input
              id="manzana"
              type="number"
              value={manzana}
              onChange={(e) => setManzana(e.target.value)}
              className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-3 py-3 text-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="parcela" className="block text-base font-semibold">
              Parcela
            </label>
            <input
              id="parcela"
              type="number"
              value={parcela}
              onChange={(e) => setParcela(e.target.value)}
              className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-3 py-3 text-lg"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="nombre" className="block text-base font-semibold">
            Nombre del responsable
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-3 py-3 text-lg"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="cedula" className="block text-base font-semibold">
              Cédula
            </label>
            <input
              id="cedula"
              type="text"
              placeholder="12.345.678"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-3 py-3 text-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="pin" className="block text-base font-semibold">
              PIN (4 dígitos)
            </label>
            <input
              id="pin"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-3 py-3 text-lg tracking-[0.4em]"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="cuota" className="block text-base font-semibold">
            Cuota mensual (USD)
          </label>
          <input
            id="cuota"
            type="number"
            step="0.01"
            value={cuota}
            onChange={(e) => setCuota(e.target.value)}
            className="mt-1 w-full rounded-card border-2 border-sansur-border bg-white px-3 py-3 text-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-card bg-sansur-green-500 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sansur-green-600"
        >
          Guardar unidad
        </button>

        {confirmacion && (
          <p className="text-lg font-semibold text-sansur-green-700">
            {confirmacion}
          </p>
        )}
      </form>
    </div>
  );
}