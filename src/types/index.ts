// Modelo de datos de SanSur.
// Por ahora solo manejamos viviendas identificadas por Manzana/Parcela.
// Más adelante se pueden sumar otros tipos de unidad (apartamentos, aportantes especiales)
// sin romper esta estructura: bastaría con extender `Unidad`.

export type MetodoPago = "Pago móvil" | "Transferencia" | "Zelle" | "Efectivo";

export type EstadoPago = "aprobado" | "pendiente" | "rechazado";

export type Moneda = "USD" | "VES";

export interface Pago {
  id: string;
  fecha: string; // formato ISO: "2026-09-08" — cuándo se registró el pago
  concepto: string; // a qué corresponde, ej: "Cuota de junio"
  monto: number; // SIEMPRE en dólares (USD) — es el monto "de contabilidad", usado para calcular deuda
  moneda: Moneda; // en qué moneda pagó realmente el residente
  montoVES?: number; // solo si moneda === "VES": el monto original en bolívares que ingresó
  tasaCambio?: number; // solo si moneda === "VES": la tasa BCV usada para convertir a dólares
  metodo: MetodoPago;
  estado: EstadoPago;
  comprobanteUrl?: string; // más adelante: URL real en Supabase Storage
}

// Pago móvil y Transferencia se cobran en bolívares en San Sur.
// Zelle y Efectivo se manejan directamente en dólares.
export function monedaSegunMetodo(metodo: MetodoPago): Moneda {
  return metodo === "Pago móvil" || metodo === "Transferencia" ? "VES" : "USD";
}

export interface Unidad {
  id: string;
  manzana: number;
  parcela: number;
  nombreResponsable: string;
  cedula: string;
  // PIN de 4 dígitos que el administrador asigna al crear la unidad.
  // En esta etapa (sin backend) esto es solo para armar el flujo de UI.
  // Cuando conectemos Supabase, esto se reemplaza por un hash real de contraseña
  // y nunca viajará como texto plano ni vivirá en el código del frontend.
  pin: string;
  cuotaMensual: number;
  deuda: number;
  historial: Pago[];
}

// Identificador legible, ej: "Manzana 10, Parcela 8"
export function identificarUnidad(u: Pick<Unidad, "manzana" | "parcela">): string {
  return `Manzana ${u.manzana}, Parcela ${u.parcela}`;
}