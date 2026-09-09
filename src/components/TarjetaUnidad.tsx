import { Unidad, identificarUnidad } from "@/types";
import { formatoMonto } from "@/lib/format";
import EstadoBadge from "./EstadoBadge";

export default function TarjetaUnidad({ unidad }: { unidad: Unidad }) {
  const alDia = unidad.deuda <= 0;

  return (
    <div className="rounded-card border border-sansur-border bg-white p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xl font-bold text-sansur-ink">
          {identificarUnidad(unidad)}
        </p>
        <p className="text-lg text-sansur-muted">{unidad.nombreResponsable}</p>
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        <EstadoBadge estado={alDia ? "al-dia" : "con-deuda"} />
        {!alDia && (
          <p className="text-lg font-semibold text-sansur-alert">
            Debe {formatoMonto(unidad.deuda)}
          </p>
        )}
      </div>
    </div>
  );
}
