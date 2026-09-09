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
