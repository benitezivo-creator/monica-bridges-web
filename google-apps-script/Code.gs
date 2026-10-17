// ==========================================================================
// RECLUTAMIENTO MÓNICA BRIDGES — SCRIPT DE RECEPCIÓN DE CVS Y POSTULACIONES
// Google Apps Script (Backend de integración con Google Sheets & Google Drive)
// ==========================================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1. Obtener o crear la Hoja de Cálculo
    var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create("Postulaciones Mónica Bridges");
    var sheet = ss.getActiveSheet();

    // Encabezados si es la primera vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha y Hora", "Nombre Completo", "Teléfono / WhatsApp", "Experiencia", "CV (Enlace Drive)", "Estado"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#F4DF9B");
    }

    // 2. Obtener o crear la Carpeta en Google Drive
    var folders = DriveApp.getFoldersByName("CVs Postulantes - Mónica Bridges");
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("CVs Postulantes - Mónica Bridges");

    // 3. Decodificar y Guardar el Archivo PDF/Word en Drive
    var fileUrl = "No adjuntado";
    if (data.fileData && data.fileName) {
      var bytes = Utilities.base64Decode(data.fileData.split(",")[1] || data.fileData);
      var blob = Utilities.newBlob(bytes, data.fileMimeType || "application/pdf", data.fileName);
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    // 4. Agregar Fila a Google Sheets con Menú Desplegable de Estado
    var timestamp = new Date();
    sheet.appendRow([timestamp, data.fullName, data.phone, data.experience, fileUrl, "En revisión"]);
    var lastRow = sheet.getLastRow();
    var cellState = sheet.getRange(lastRow, 6);

    // Regla de Validación (Desplegable: En revisión, Referencias OK, RECHAZADO)
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["En revisión", "Referencias OK", "RECHAZADO"], true)
      .setAllowInvalid(false)
      .build();
    cellState.setDataValidation(rule);

    // 5. Respuesta Automática por Email a la Candidata (Si proporciona mail)
    if (data.email) {
      var mailSubject = "Recepción de Postulación — Mónica Bridges Reclutamiento";
      var mailBody = "Hola " + data.fullName + ",\n\n" +
        "Hemos recibido correctamente tu postulación y Currículum Vitae.\n" +
        "Nuestro equipo de selección revisará tu perfil y referencias. En caso de coincidir con nuestras búsquedas activas, nos pondremos en contacto contigo a la brevedad.\n\n" +
        "Atentamente,\nEquipo de Selección — Mónica Bridges";
      MailApp.sendEmail(data.email, mailSubject, mailBody);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success", fileUrl: fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
