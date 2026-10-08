# Samantha Abigail · Invitación XV

Invitación digital mobile-first para los XV de Samantha Abigail.

Parte del ecosistema **[rendevu.mx](https://rendevu.mx)** — invitaciones digitales bajo un mismo dominio:

| Destino | Uso |
| --- | --- |
| `rendevu.mx` | One-pager / home de la marca (próximo) |
| `rendevu.mx/xv-samantha` | Esta invitación |
| `rendevu.mx/<slug>` | Futuras invitaciones |

En local el `basePath` va vacío. Para desplegar bajo `/xv-samantha`:

```
NEXT_PUBLIC_BASE_PATH=/xv-samantha
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Google Sheets (RSVP + Firmas)

1. Crea un Google Sheet con pestañas `RSVP` y `Firmas` (headers en la fila 1; ver `google-apps-script.js`).
2. Extensiones → Apps Script → pega el contenido de `google-apps-script.js`.
3. Implementar → Nueva implementación → Aplicación web (Ejecutar como: yo; Acceso: cualquiera).
4. Copia la URL a `.env.local`:

```
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
```

Sin esa variable, los formularios se guardan en `data/rsvp.json` y `data/guestbook.json` (útil en local).

## Contenido editable

Fecha, countdown, dress code, fotos e itinerario: `src/lib/event.ts`.
