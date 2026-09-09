# San Sur -> Sistema de condominio

Sistema de gestión de pagos del Condominio San Sur. Por ahora trabaja únicamente
con viviendas identificadas por **Manzana y Parcela** (ej. Manzana 10, Parcela 8).
Apartamentos, iglesia y colegio se agregarán más adelante cuando se defina cómo
manejan sus aportes.

## Estado actual

Frontend con datos de ejemplo (`src/data/mockUnidades.ts`), sin base de datos real
todavía. Sirve para validar el diseño y el flujo con el administrador del condominio
antes de conectar el backend.

## Cómo correrlo en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en el navegador.

## Estructura del proyecto

```
src/
  app/
    page.tsx                 → pantalla de inicio (elegir rol)
    administrador/page.tsx   → panel del administrador
    residente/page.tsx       → consulta del residente
    layout.tsx               → layout raíz
    globals.css              → estilos globales + Tailwind
  components/
    TarjetaUnidad.tsx        → tarjeta de una unidad en el listado del admin
    FichaResidente.tsx       → ficha de pago tipo recibo
    EstadoBadge.tsx          → insignia "Al día" / "Con deuda"
  data/
    mockUnidades.ts          → datos de ejemplo (se reemplaza por Supabase después)
  types/
    index.ts                 → tipos TypeScript del dominio (Unidad, Pago)
  lib/
    format.ts                → formateo de montos y fechas
```

## Próximos pasos

1. Terminar de definir el modelo de datos (¿todas las viviendas pagan igual?
   ¿cómo se maneja la mora?).
2. Crear proyecto en [Supabase](https://supabase.com) (plan gratuito) y migrar
   `mockUnidades.ts` a una tabla real.
3. Login por cédula para residentes, usuario aparte para el administrador.
4. Subida real de comprobantes (Supabase Storage).
5. Generar nota de pago en PDF.
6. Desplegar en [Vercel](https://vercel.com) (plan gratuito).

## Paleta de colores

| Uso | Color |
|---|---|
| Verde principal | `#3C8156` |
| Verde oscuro (hover) | `#2F6B47` |
| Superficie clara | `#F3F8F4` |
| Texto principal | `#16261B` |
| Texto secundario | `#4B5D50` |
| Alerta / deuda | `#B5502F` |

Tipografía: **Atkinson Hyperlegible** — diseñada específicamente para máxima
legibilidad, ideal considerando que muchos residentes son adultos mayores.
