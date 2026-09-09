import { Unidad, Pago } from "@/types";

// Datos falsos solo para el desarrollo del frontend.
// Cuando conectemos Supabase, esta lista se reemplaza por una consulta real a la base de datos.
//
// Nota sobre moneda: "monto" siempre queda en dólares (es lo que se usa para calcular
// deuda). Cuando el pago fue en bolívares (Pago móvil / Transferencia), además se guarda
// "montoVES" y "tasaCambio" para dejar registro de cómo se hizo la conversión.
export const mockUnidades: Unidad[] = [
  {
    id: "u1",
    manzana: 10,
    parcela: 8,
    nombreResponsable: "Ana Rodríguez",
    cedula: "12.345.678",
    pin: "1010",
    cuotaMensual: 11,
    deuda: 0,
    historial: [
      { id: "p1", fecha: "2026-08-05", concepto: "Cuota de agosto", monto: 11, moneda: "VES", montoVES: 440, tasaCambio: 40, metodo: "Pago móvil", estado: "aprobado" },
      { id: "p2", fecha: "2026-07-04", concepto: "Cuota de julio", monto: 11, moneda: "VES", montoVES: 429, tasaCambio: 39, metodo: "Pago móvil", estado: "aprobado" },
    ],
  },
  {
    id: "u2",
    manzana: 3,
    parcela: 15,
    nombreResponsable: "Carlos Pérez",
    cedula: "18.902.331",
    pin: "0315",
    cuotaMensual: 11,
    deuda: 22,
    historial: [
      { id: "p3", fecha: "2026-06-02", concepto: "Cuota de mayo", monto: 11, moneda: "VES", montoVES: 418, tasaCambio: 38, metodo: "Transferencia", estado: "aprobado" },
    ],
  },
  {
    id: "u3",
    manzana: 7,
    parcela: 2,
    nombreResponsable: "Rosa Delgado",
    cedula: "11.220.998",
    pin: "0702",
    cuotaMensual: 11,
    deuda: 0,
    historial: [
      { id: "p4", fecha: "2026-08-08", concepto: "Cuota de agosto", monto: 11, moneda: "VES", montoVES: 440, tasaCambio: 40, metodo: "Pago móvil", estado: "aprobado" },
    ],
  },
  {
    id: "u4",
    manzana: 5,
    parcela: 11,
    nombreResponsable: "Manuel Torres",
    cedula: "20.113.045",
    pin: "0511",
    cuotaMensual: 11,
    deuda: 11,
    historial: [
      { id: "p5", fecha: "2026-07-10", concepto: "Cuota de julio", monto: 11, moneda: "USD", metodo: "Efectivo", estado: "aprobado" },
      { id: "p6", fecha: "2026-09-06", concepto: "Cuota de septiembre", monto: 11, moneda: "VES", montoVES: 451, tasaCambio: 41, metodo: "Pago móvil", estado: "pendiente" },
    ],
  },
];

// Truco temporal solo para el prototipo sin backend:
// mutamos directamente el arreglo de arriba para que, al navegar entre
// la vista del residente y la del administrador SIN recargar la página,
// el pago reportado aparezca en ambos lados. Cuando conectemos Supabase,
// esta función se reemplaza por un INSERT real a la base de datos.
export function registrarPagoEnUnidad(unidadId: string, pago: Pago) {
  const unidad = mockUnidades.find((u) => u.id === unidadId);
  if (unidad) {
    unidad.historial = [pago, ...unidad.historial];
  }
}