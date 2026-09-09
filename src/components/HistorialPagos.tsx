import { Pago } from "@/types";
import { formatoMonto, formatoFecha, formatoBs } from "@/lib/format";

export default function HistorialPagos({ historial }: { historial: Pago[] }) {
  if (historial.length === 0) {
    return (
      <p className="mt-6 text-lg text-sansur-muted">
        Aún no hay pagos registrados.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-2xl font-bold text-sansur-ink">
        Historial de pagos
      </h2>

      {/* En pantallas angostas se puede desplazar horizontalmente sin romper la tabla */}
      <div className="overflow-x-auto rounded-card border border-sansur-border">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="bg-sansur-surface">
              <Th>Concepto</Th>
              <Th>Método</Th>
              <Th>Monto</Th>
              <Th>Fecha</Th>
            </tr>
          </thead>
          <tbody>
            {historial.map((pago) => (
              <tr key={pago.id} className="border-t border-sansur-border">
                <td className="px-4 py-4 text-lg">
                  {pago.concepto}
                  {pago.estado === "pendiente" && (
                    <span className="ml-2 inline-block rounded-full bg-sansur-surface px-3 py-0.5 text-sm font-semibold text-sansur-muted">
                      Pendiente de revisión
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-lg text-sansur-muted">
                  {pago.metodo}
                </td>
                <td className="px-4 py-4 text-lg font-semibold text-sansur-ink">
                  {pago.moneda === "VES" && pago.montoVES ? (
                    <>
                      {formatoBs(pago.montoVES)}
                      <div className="text-sm font-normal text-sansur-muted">
                        ≈ {formatoMonto(pago.monto)} (tasa {pago.tasaCambio})
                      </div>
                    </>
                  ) : (
                    formatoMonto(pago.monto)
                  )}
                </td>
                <td className="px-4 py-4 text-lg text-sansur-muted">
                  {formatoFecha(pago.fecha)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-base font-semibold text-sansur-muted">
      {children}
    </th>
  );
}