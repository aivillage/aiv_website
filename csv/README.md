# Local poster queue exports

This directory holds local exports from restricted Google Sheets used by the
poster publishing workflow.

CSV files may contain submitter contact information. All CSV exports in this
directory are intentionally ignored by Git. The raw Form response export and
the sanitized Website Publish Queue must never be committed.

Import the sanitized queue with:

```bash
pnpm posters:import "csv/Website Publish Queue.csv"
```
