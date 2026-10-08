/**
 * Google Apps Script — paste into Extensions > Apps Script
 * Spreadsheet tabs must be named exactly: "RSVP" and "Firmas"
 *
 * RSVP header row:
 *   Timestamp | Nombre | Apellido | Invitados | Alergias | Telefono
 * Firmas header row:
 *   Timestamp | Nombre | Mensaje
 *
 * Deploy > New deployment > Web app
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * After editing code: Deploy > Manage deployments > Edit (pencil)
 *   Version: New version > Deploy
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "rsvp") {
      const sheet = ss.getSheetByName("RSVP");
      if (!sheet) throw new Error('Missing sheet tab named "RSVP"');
      sheet.appendRow([
        data.createdAt || new Date().toISOString(),
        data.firstName,
        data.lastName,
        data.guests,
        data.allergies || "",
        data.phone,
      ]);
      return json_({ ok: true });
    }

    if (data.type === "guestbook") {
      const sheet = ss.getSheetByName("Firmas");
      if (!sheet) throw new Error('Missing sheet tab named "Firmas"');
      sheet.appendRow([
        data.createdAt || new Date().toISOString(),
        data.name,
        data.message,
      ]);
      return json_({ ok: true });
    }

    return json_({ ok: false, error: "unknown_type" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "";
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "guestbook") {
      const sheet = ss.getSheetByName("Firmas");
      if (!sheet) throw new Error('Missing sheet tab named "Firmas"');
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
      return json_({ messages: messages });
    }

    return json_({ ok: true, service: "xv-samantha" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
