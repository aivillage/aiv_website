# Local poster queue exports

This directory holds local exports from restricted Google Sheets used by the
poster publishing workflow.

CSV files may contain submitter contact information. All CSV exports in this
directory are intentionally ignored by Git and must never be committed. The
poster importer understands the current Google Form response export directly
and removes author contact/profile details from generated records.

Every complete Form response is listed in the poster archive. The hosting answer
controls only whether the uploaded poster file is displayed: `No` responses are
metadata-only, and a `Yes` response without an upload is imported with a warning
as metadata-only until its file arrives.

Import the current Form response export with:

```bash
pnpm posters:import "csv/Poster (Responses) - Form Responses 1.csv"
```
