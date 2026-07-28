/**
 * Minimal RFC 4180 CSV parser.
 *
 * Hand-rolled rather than pulled from npm because poster abstracts routinely
 * contain commas, quotes, and hard line breaks — a naive `split(",")` mangles
 * them silently, which is the worst possible failure mode for a publish queue.
 * Handles quoted fields, escaped quotes (""), CRLF, and embedded newlines.
 */

export function parseCsv(input: string): string[][] {
  // Strip a UTF-8 BOM; Google Sheets exports include one.
  const text = input.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (char === ",") {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }

    if (char === "\r" || char === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
      // Consume CRLF as a single terminator.
      i += char === "\r" && text[i + 1] === "\n" ? 2 : 1;
      continue;
    }

    field += char;
    i += 1;
  }

  // Trailing field / row, unless the file ended on a clean newline.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}
