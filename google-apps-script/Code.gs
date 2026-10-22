// ==========================================================================
// RECLUTAMIENTO MÓNICA BRIDGES — BACKEND DE POSTULACIÓN ÚNICA
// ==========================================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1. Obtener o crear la Hoja de Cálculo
    var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create("Postulaciones Mónica Bridges");
    var sheet = ss.getActiveSheet();

    // Encabezados si es la primera vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha y Hora", 
        "Nombre Completo", 
        "Correo Electrónico", 
        "Teléfono / WhatsApp", 
        "Especialidad", 
        "Experiencia", 
        "CV (Enlace Drive)", 
        "Estado"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#F4DF9B");
    }

    // 2. Obtener o crear la Carpeta en Google Drive para los CVs
    var folders = DriveApp.getFoldersByName("CVs Postulantes - Mónica Bridges");
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("CVs Postulantes - Mónica Bridges");

    // 3. Decodificar y Guardar el Archivo PDF/Word en Drive
    var fileUrl = "No adjuntado";
    if (data.fileData && data.fileName) {
      var bytes = Utilities.base64Decode(data.fileData.split(",")[1] || data.fileData);
      var blob = Utilities.newBlob(bytes, data.fileMimeType || "application/pdf", data.fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    }

    // 4. Registrar en Google Sheets
    var timestamp = new Date();
    sheet.appendRow([
      timestamp, 
      data.fullName, 
      data.email || "No especificado", 
      data.phone, 
      data.specialty || "No especificada", 
      data.experience, 
      fileUrl, 
      "En revisión"
    ]);

    // Menú desplegable interactivo de Estado
    var lastRow = sheet.getLastRow();
    var cellState = sheet.getRange(lastRow, 8);
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["En revisión", "Entrevista", "RECHAZADO"], true)
      .setAllowInvalid(false)
      .build();
    cellState.setDataValidation(rule);

    // 5. NOTIFICACIÓN POR CORREO ELECTRÓNICO A MÓNICA
    var adminEmail = "monicabridges56@gmail.com";
    var adminSubject = "🚨 Nueva Postulación Web - " + data.fullName;
    var adminBody = "¡Hola Mónica!\n\n" +
      "Has recibido una nueva postulación desde la web:\n\n" +
      "• Nombre: " + data.fullName + "\n" +
      "• Especialidad: " + (data.specialty || "No especificada") + "\n" +
      "• Teléfono: " + data.phone + "\n" +
      "• Correo: " + (data.email || "No especificado") + "\n" +
      "• Experiencia: " + data.experience + "\n" +
      "• CV en Drive: " + fileUrl + "\n\n" +
      "Puedes revisar y gestionar el estado desde tu Google Sheets.";
    
    MailApp.sendEmail(adminEmail, adminSubject, adminBody);

    // 6. RESPUESTA AUTOMÁTICA POR CORREO A LA CANDIDATA
    if (data.email) {
      var candidateSubject = "Recepción de Postulación — Mónica Bridges";
      var candidateBody = "Hola " + data.fullName + ",\n\n" +
        "Hemos recibido correctamente tu postulación y Currículum Vitae.\n" +
        "Nuestro equipo de selección evaluará tu perfil y nos pondremos en contacto contigo en caso de avanzar.\n\n" +
        "Atentamente,\nEquipo de Selección — Mónica Bridges";
      MailApp.sendEmail(data.email, candidateSubject, candidateBody);
    }

    // 7. NOTIFICACIÓN INSTANTÁNEA POR WHATSAPP A MÓNICA
    try {
      var targetPhone = "+5491127789352"; // Número de WhatsApp de Mónica
      var apiKeyCallMeBot = "TU_API_KEY";  // Clave gratuita de CallMeBot (o API equivalente)
      
      var waMessage = "🚨 *Nueva Postulación - Mónica Bridges*\n\n" +
        "*Nombre:* " + data.fullName + "\n" +
        "*Especialidad:* " + (data.specialty || "N/A") + "\n" +
        "*Teléfono:* " + data.phone + "\n" +
        "*CV:* " + fileUrl;
        
      var waUrl = "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(targetPhone) + 
                  "&text=" + encodeURIComponent(waMessage) + 
                  "&apikey=" + encodeURIComponent(apiKeyCallMeBot);

      // Descomentar esta línea al configurar tu API key de WhatsApp:
      // UrlFetchApp.fetch(waUrl);
    } catch (waError) {
      console.log("Error al enviar WhatsApp: " + waError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
