function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.city || '',
    data.product || '',
    data.quantity || 1,
    data.notes || '',
    'Nouveau'
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Order received'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}