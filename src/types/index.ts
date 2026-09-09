// Modelo de datos de San Sur.
// Por ahora solo manejamos viviendas identificadas por Manzana/Parcela.
// Más adelante se pueden sumar otros tipos de unidad (apartamentos, aportantes especiales)
// sin romper esta estructura: bastaría con extender `Unidad`.

export type MetodoPago = "Pago móvil" | "Transferencia" | "Zelle" | "Efectivo";

export type EstadoPago = "aprobado" | "pendiente" | "rechazado";

export interface Pago {
  id: string;
  fecha: string; // formato ISO: "2026-09-08"
  monto: number;
  metodo: MetodoPago;
  estado: EstadoPago;
  comprobanteUrl?: string; // más adelante: URL real en Supabase Storage
}

export interface Unidad {
  id: string;
  manzana: number;
  parcela: number;
  nombreResponsable: string;
  cedula: string;
  cuotaMensual: number;
  deuda: number;
  historial: Pago[];
}

// Identificador legible, ej: "Manzana 10, Parcela 8"
export function identificarUnidad(u: Pick<Unidad, "manzana" | "parcela">): string {
  return `Manzana ${u.manzana}, Parcela ${u.parcela}`;
}
