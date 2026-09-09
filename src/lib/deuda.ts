// Cuántas cuotas mensuales representa la deuda actual de una unidad.
// Ej: deuda de $33 con cuota de $11 → 3 cuotas atrasadas.
export function cuotasAtrasadas(cuotaMensual: number, deuda: number): number {
  if (cuotaMensual <= 0) return 0;
  return Math.round(deuda / cuotaMensual);
}

// Cuántas cuotas cubre un monto pagado, respecto a la cuota mensual.
// Ej: pagó $11 con cuota de $11 → 1 cuota. Pagó $22 → 2 cuotas.
export function cuotasQueCubre(cuotaMensual: number, monto: number): number {
  if (cuotaMensual <= 0) return 0;
  return Math.round(monto / cuotaMensual);
}