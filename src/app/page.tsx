import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-10 px-6 text-center">
      <div>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sansur-green-500 text-2xl font-bold text-white">
          SS
        </div>
        <h1 className="text-3xl font-bold text-sansur-ink">San Sur</h1>
        <p className="mt-2 text-lg text-sansur-muted">
          Pagos y estado de cuenta del condominio
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Link
          href="/administrador"
          className="rounded-card bg-sansur-green-500 px-6 py-5 text-xl font-semibold text-white transition hover:bg-sansur-green-600"
        >
          Soy administrador
        </Link>
        <Link
          href="/residente"
          className="rounded-card border-2 border-sansur-green-500 px-6 py-5 text-xl font-semibold text-sansur-green-700 transition hover:bg-sansur-green-50"
        >
          Soy residente
        </Link>
      </div>
    </main>
  );
}
