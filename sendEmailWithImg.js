function sendEmail() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet1 = ss.getSheetByName('Contactos');
  var sheet2 = ss.getSheetByName('Mensaje');
  var subject = sheet2.getRange(2, 1).getValue();
  var message = sheet2.getRange(2, 2).getValue();
  var fileId = sheet2.getRange(2, 3).getValue();
  var file = DriveApp.getFileById(fileId).getBlob();
  var n = sheet1.getLastRow();
  
  for (var i = 2; i < n + 1; i++) {
    var emailAddress = sheet1.getRange(i, 3).getValue();
    var name = sheet1.getRange(i, 1).getValue();
    var lastname = sheet1.getRange(i, 2).getValue();

    message = message.replace("<nombre>", name).replace("<apellido>", lastname);
    MailApp.sendEmail(emailAddress, subject, message, {attachments: [file]});
  }

}