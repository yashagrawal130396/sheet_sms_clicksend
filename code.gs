function ticketsms() {
  var sheets = SpreadsheetApp.openById('SHEET_ID').getSheetByName('SHEET_NAME');
  var rows = getNextRowurl(sheets);
  var range = sheets.getRange(2, 5, rows, 12).getDisplayValues();
  
  // loop to read data from all the rows
  for (var i in range) {
    if (range[i][0] == '' || range[i][1] == '' || range[i][2] == '' || range[i][3] == '' || range[i][4] == '' || range[i][10] == '' || range[i][11] != '') continue;
    
    var data2= {"messages":[ {"from":"+13473181819",
                              "body":range[i][1] + ", tickets to your Headout experience in " + range[i][4] + " are ready - " + range[i][10] + "\nThey have also been sent to " + range[i][3],
                              "to":range[i][2] } ] };
    
    var headers = {'Content-Type': 'application/json',
                   "Authorization" : "Basic CLICK_SEND_API_KEY=="};
    
    try {
      
      var url ='https://rest.clicksend.com/v3/sms/send';
      var options = {
        method: "post",
        contentType:"application/json",
        headers : headers,
        payload: JSON.stringify(data2)
        //muteHttpExceptions: true
      };
      var res = UrlFetchApp.fetch(url, options);
      var data = JSON.parse(res.getContentText());
      
      sheets.getRange(2+Number(i), 16).setValue('SENT at ' + new Date());
    } catch (err) {
      sheets.getRange(2+Number(i), 16).setValue(err + ' at ' + new Date());
    }
  }
  Utilities.sleep(2000);
  bulkupdate();
}


function getNextRowurl(sheets) {  
  var bookingids = sheets.getRange("E2:E").getValues();
  for (var i in bookingids) {
    if(bookingids[i][0] == "") {
      return Number(i);
      break;
    }
  }
}
