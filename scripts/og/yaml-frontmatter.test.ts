import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseYamlFrontmatter } from "./yaml-frontmatter";

const tests: Array<{ name: string; run: () => void }> = [];

function test(name: string, run: () => void) {
  tests.push({ name, run });
}

function parse(source: string) {
  return parseYamlFrontmatter(source, "fixture.md");
}

test("parses a valid YAML mapping", () => {
  assert.deepEqual(parse("---\ntitle: Example\ncount: 6\n---\nBody"), {
    title: "Example",
    count: 6,
  });
});

test("parses a nested image object", () => {
  assert.deepEqual(
    parse(
      "---\nimage:\n  path: /images/card.png\n  width: 1200\n  height: 630\n---",
    ),
    {
      image: {
        path: "/images/card.png",
        width: 1200,
        height: 630,
      },
    },
  );
});

test("parses arrays", () => {
  assert.deepEqual(parse("---\ntags:\n  - security\n  - events\n---"), {
    tags: ["security", "events"],
  });
});

test("parses booleans", () => {
  assert.deepEqual(parse("---\ndraft: true\npublished: false\n---"), {
    draft: true,
    published: false,
  });
});

test("parses quoted strings", () => {
  assert.deepEqual(parse('---\ntitle: "AI Village: DEF CON"\n---'), {
    title: "AI Village: DEF CON",
  });
});

test("parses multiline block scalars", () => {
  assert.deepEqual(
    parse("---\ndescription: |\n  First line.\n  Second line.\n---"),
    {
      description: "First line.\nSecond line.\n",
    },
  );
});

test("returns an empty object for empty frontmatter", () => {
  assert.deepEqual(parse("---\n---\nBody"), {});
});

test("returns an empty object when frontmatter is absent", () => {
  assert.deepEqual(parse("# Heading\n\nBody"), {});
});

test("removes one leading UTF-8 BOM", () => {
  assert.deepEqual(parse("\uFEFF---\ntitle: BOM\n---"), { title: "BOM" });
});

test("supports CRLF delimiters", () => {
  assert.deepEqual(parse("---\r\ntitle: CRLF\r\n---\r\nBody"), {
    title: "CRLF",
  });
});

test("rejects unclosed frontmatter", () => {
  assert.throws(
    () => parse("---\ntitle: Missing close\nBody"),
    /Unclosed YAML frontmatter in fixture\.md\./,
  );
});

test("rejects a scalar YAML root", () => {
  assert.throws(
    () => parse("---\nscalar value\n---"),
    /Frontmatter in fixture\.md must be a YAML mapping\./,
  );
});

test("rejects an array YAML root", () => {
  assert.throws(
    () => parse("---\n- one\n- two\n---"),
    /Frontmatter in fixture\.md must be a YAML mapping\./,
  );
});

for (const delimiter of [
  "---js",
  "---javascript",
  "---coffee",
  "---toml",
  "---yaml",
]) {
  test(`rejects the ${delimiter} opening delimiter`, () => {
    assert.throws(
      () => parse(`${delimiter}\npayload: harmless\n---`),
      /Only YAML frontmatter using an exact `---` delimiter is allowed/,
    );
  });
}

test("rejects a non-exact closing delimiter", () => {
  assert.throws(
    () => parse("---\ntitle: Example\n--- \nBody"),
    /Unclosed YAML frontmatter in fixture\.md\./,
  );
});

test("keeps JavaScript-looking quoted YAML text as plain text", () => {
  const payload =
    'require("node:fs").writeFileSync("/tmp/should-not-exist", process.env.HOME)';
  assert.deepEqual(parse(`---\npayload: ${JSON.stringify(payload)}\n---`), {
    payload,
  });
});

test("CORE_SCHEMA leaves date-like values as strings", () => {
  assert.deepEqual(parse("---\ndate: 2026-08-06\n---"), {
    date: "2026-08-06",
  });
});

test("malicious JavaScript frontmatter cannot execute or create a sentinel", () => {
  const directory = mkdtempSync(
    path.join(os.tmpdir(), "aiv-yaml-frontmatter-"),
  );
  const sentinel = path.join(directory, "executed.txt");
  const payload =
    `require("node:fs").writeFileSync(${JSON.stringify(sentinel)}, ` +
    `process.env.HOME ?? "executed")`;

  try {
    assert.throws(
      () => parse(`---javascript\n${payload}\n---`),
      /Only YAML frontmatter using an exact `---` delimiter is allowed/,
    );
    assert.equal(existsSync(sentinel), false);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

let failures = 0;

console.log("\nYAML frontmatter security\n");

for (const { name, run } of tests) {
  try {
    run();
    console.log(`  PASS  ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL  ${name}`);
    console.error(error);
  }
}

console.log(
  failures === 0
    ? "\nAll YAML frontmatter security tests passed.\n"
    : `\n${failures} test(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
