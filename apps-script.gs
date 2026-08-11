function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Ajoute les en-tetes si premiere ligne
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Nom', 'Telephone', 'Adresse', 'Ville', 'Produit', 'Quantite', 'Prix Total', 'Statut']);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(),
      data.nom || '',
      data.telephone || '',
      data.adresse || '',
      data.ville || '',
      data.produit || '',
      data.quantite || '',
      data.prix || '',
      'Nouvelle'
    ]);

    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status: 'OK'}))
    .setMimeType(ContentService.MimeType.JSON);
}
