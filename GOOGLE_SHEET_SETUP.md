# Google Sheet Setup Guide

## Sheet Structure

Create a Google Sheet with these columns:
1. Timestamp
2. Name
3. Phone
4. City
5. Product
6. Quantity
7. Notes
8. Status

## Apps Script

1. Open Extensions > Apps Script
2. Replace code with contents of `apps-script.gs`
3. Deploy as Web App
4. Copy deployment URL
5. Add URL to `.env` as `VITE_SHEET_WEBHOOK_URL`

## Webhook URL
```
https://script.google.com/macros/s/AKfycbxb1Vg_v0hZxCypBVZnRiEe0gKTVz7jGgx0NL-_Oj1V73sKY9uCMifW7MCfrq8H5T8/exec
```

## Testing
Send a test POST request to verify the webhook works.