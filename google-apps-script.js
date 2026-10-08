/**
 * Google Apps Script — pega esto en Extensiones > Apps Script
 * de un Google Sheet con dos pestañas: "RSVP" y "Firmas".
 *
 * 1. Crea un Sheet nuevo
 * 2. Renombra Sheet1 a "RSVP" y crea otra hoja "Firmas"
 * 3. En RSVP, fila 1: Timestamp | Nombre | Apellido | Invitados | Alergias | Telefono
 * 4. En Firmas, fila 1: Timestamp | Nombre | Mensaje
 * 5. Pega este código, Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copia la URL y ponla en .env.local como GOOGLE_SHEETS_WEBAPP_URL
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "rsvp") {
      const sheet = ss.getSheetByName("RSVP");
      sheet.appendRow([
        data.createdAt || new Date().toISOString(),
        data.firstName,
        data.lastName,
        data.guests,
        data.allergies || "",
        data.phone,
      ]);
      return ContentService.createTextOutput(
        JSON.stringify({ ok: true }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (data.type === "guestbook") {
      const sheet = ss.getSheetByName("Firmas");
      sheet.appendRow([
        data.createdAt || new Date().toISOString(),
        data.name,
        data.message,
      ]);
      return ContentService.createTextOutput(
        JSON.stringify({ ok: true }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "unknown_type" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "guestbook") {
    const sheet = ss.getSheetByName("Firmas");
    const values = sheet.getDataRange().getValues();
    const messages = [];
    for (var i = values.length - 1; i >= 1; i--) {
      var row = values[i];
      if (!row[1] && !row[2]) continue;
      messages.push({
        createdAt: row[0],
        name: row[1],
        message: row[2],
      });
    }
    return ContentService.createTextOutput(
      JSON.stringify({ messages: messages }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
