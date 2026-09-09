import { Unidad, identificarUnidad } from "@/types";
import { formatoMonto, formatoFecha } from "@/lib/format";
import EstadoBadge from "./EstadoBadge";

export default function FichaResidente({ unidad }: { unidad: Unidad }) {
  const alDia = unidad.deuda <= 0;
  const ultimoPago = unidad.historial[0];

  return (
    <div className="rounded-card border-2 border-sansur-green-500 bg-white p-8">
      <div className="flex items-start justify-between gap-4 border-b border-sansur-border pb-6 mb-6">
        <div>
          <p className="text-2xl font-bold text-sansur-ink">
            {identificarUnidad(unidad)}
          </p>
          <p className="text-lg text-sansur-muted">{unidad.nombreResponsable}</p>
        </div>
        <EstadoBadge estado={alDia ? "al-dia" : "con-deuda"} />
      </div>

      <dl className="space-y-4">
        <Fila etiqueta="Cuota mensual" valor={formatoMonto(unidad.cuotaMensual)} />
        <Fila
          etiqueta="Deuda actual"
          valor={formatoMonto(unidad.deuda)}
          destacado={!alDia}
        />
        <Fila
          etiqueta="Último pago"
          valor={ultimoPago ? formatoFecha(ultimoPago.fecha) : "Sin pagos registrados"}
        />
      </dl>
    </div>
  );
}

function Fila({
  etiqueta,
  valor,
  destacado,
}: {
  etiqueta: string;
  valor: string;
  destacado?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-xl">
      <dt className="text-sansur-muted">{etiqueta}</dt>
      <dd
        className={`font-semibold ${destacado ? "text-sansur-alert" : "text-sansur-ink"}`}
      >
        {valor}
      </dd>
    </div>
  );
}
