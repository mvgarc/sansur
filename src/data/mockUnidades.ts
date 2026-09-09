import { Unidad } from "@/types";

// Datos falsos solo para el desarrollo del frontend.
// Cuando conectemos Supabase, esta lista se reemplaza por una consulta real a la base de datos.
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
      { id: "p1", fecha: "2026-08-05", monto: 11, metodo: "Pago móvil", estado: "aprobado" },
      { id: "p2", fecha: "2026-07-04", monto: 11, metodo: "Pago móvil", estado: "aprobado" },
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
      { id: "p3", fecha: "2026-06-02", monto: 11, metodo: "Transferencia", estado: "aprobado" },
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
      { id: "p4", fecha: "2026-08-08", monto: 11, metodo: "Pago móvil", estado: "aprobado" },
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
      { id: "p5", fecha: "2026-07-10", monto: 11, metodo: "Efectivo", estado: "aprobado" },
      { id: "p6", fecha: "2026-09-06", monto: 11, metodo: "Pago móvil", estado: "pendiente" },
    ],
  },
];