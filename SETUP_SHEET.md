# Setup Sheet

## Google Sheet ID

The sheet ID is part of the webhook URL:
```
https://script.google.com/macros/s/AKfycbxb1Vg_v0hZxCypBVZnRiEe0gKTVz7jGgx0NL-_Oj1V73sKY9uCMifW7MCfrq8H5T8/exec
```

## Sheet Columns

| Column | Header |
|--------|--------|
| A | Timestamp |
| B | Name |
| C | Phone |
| D | City |
| E | Product |
| F | Quantity |
| G | Notes |
| H | Status |

## Apps Script Code

See `apps-script.gs` for the full code.

## Deployment Steps

1. Create new Google Sheet
2. Add headers in row 1
3. Open Extensions > Apps Script
4. Paste code from `apps-script.gs`
5. Save project
6. Click Deploy > New deployment
7. Select type: Web app
8. Set access to: Anyone
9. Copy web app URL
10. Add to `.env` file