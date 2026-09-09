type Estado = "al-dia" | "con-deuda" | "pendiente";

const estilos: Record<Estado, string> = {
  "al-dia": "bg-sansur-green-100 text-sansur-green-700",
  "con-deuda": "bg-[#F3E2DA] text-sansur-alert",
  pendiente: "bg-sansur-surface text-sansur-muted border border-sansur-border",
};

const etiquetas: Record<Estado, string> = {
  "al-dia": "Al día",
  "con-deuda": "Con deuda",
  pendiente: "Pendiente de revisión",
};

export default function EstadoBadge({ estado }: { estado: Estado }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-lg font-semibold ${estilos[estado]}`}
    >
      {etiquetas[estado]}
    </span>
  );
}
