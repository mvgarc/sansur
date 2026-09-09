export function formatoMonto(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function formatoFecha(iso: string): string {
  const [anio, mes, dia] = iso.split("-");
  const meses = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  return `${dia} ${meses[parseInt(mes, 10) - 1]} ${anio}`;
}

export function fechaHoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function conceptoSugeridoHoy(): string {
  const mesesLargos = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const mesActual = new Date().getMonth();
  return `Cuota de ${mesesLargos[mesActual]}`;
}

export function formatoBs(n: number): string {
  return `Bs ${n.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}