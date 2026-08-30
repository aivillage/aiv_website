import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateContentIdentities } from "./check-content-identities";

const root = mkdtempSync(join(tmpdir(), "aiv-content-identities-"));
const volunteers = join(root, "src/content/volunteers");
const sponsors = join(root, "src/content/sponsors");

function volunteer(firstName: string, lastName: string, slug: string) {
  return `---\nfirst_name: ${firstName}\nlast_name: ${lastName}\nslug: ${slug}\n---\n`;
}

try {
  mkdirSync(volunteers, { recursive: true });
  mkdirSync(sponsors, { recursive: true });
  writeFileSync(join(sponsors, "example.md"), "---\nname: Example\n---\n");
  writeFileSync(
    join(volunteers, "alice.md"),
    volunteer("Alice", "Smith", "alice-smith"),
  );
  writeFileSync(
    join(volunteers, "bob.md"),
    volunteer("Bob", "Jones", "bob-jones"),
  );

  assert.deepEqual(validateContentIdentities(root).failures, []);

  writeFileSync(
    join(volunteers, "bob.md"),
    volunteer("Bob", "Jones", "alice-smith"),
  );
  assert.match(
    validateContentIdentities(root).failures.join("\n"),
    /Duplicate volunteer slug/,
  );

  writeFileSync(
    join(volunteers, "bob.md"),
    volunteer("Bob", "Jones", "Bob Jones"),
  );
  assert.match(
    validateContentIdentities(root).failures.join("\n"),
    /Invalid volunteer slug/,
  );
} finally {
  rmSync(root, { recursive: true, force: true });
}

console.log("Content identity validation tests passed.");
