import assert from "node:assert/strict";
import { z } from "astro/zod";
import type { EventEntry } from "../../src/utils/site";
import {
  effectiveEventEndDate,
  formatDateRange,
  isEventUpcomingOrOngoing,
  isoDateOnly,
  validateEventDateRange,
} from "../../src/utils/site";

const tests: Array<{ name: string; run: () => void }> = [];

function test(name: string, run: () => void) {
  tests.push({ name, run });
}

function utcDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function event(date: string, endDate?: string): Pick<EventEntry, "data"> {
  return {
    data: {
      title: "Test event",
      date: utcDate(date),
      endDate: endDate ? utcDate(endDate) : undefined,
      legacyUrls: [],
    },
  } as Pick<EventEntry, "data">;
}

const eventDateSchema = z
  .object({
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  })
  .superRefine(validateEventDateRange);

test("formats a one-day event without endDate", () => {
  assert.equal(formatDateRange(utcDate("2026-08-06")), "August 6, 2026");
});

test("formats an equal start and end as one day", () => {
  assert.equal(
    formatDateRange(utcDate("2026-08-06"), utcDate("2026-08-06")),
    "August 6, 2026",
  );
});

test("formats a same-month range", () => {
  assert.equal(
    formatDateRange(utcDate("2026-08-06"), utcDate("2026-08-09")),
    "August 6–9, 2026",
  );
});

test("formats a cross-month same-year range", () => {
  assert.equal(
    formatDateRange(utcDate("2026-08-30"), utcDate("2026-09-02")),
    "August 30–September 2, 2026",
  );
});

test("formats a cross-year range", () => {
  assert.equal(
    formatDateRange(utcDate("2026-12-31"), utcDate("2027-01-02")),
    "December 31, 2026–January 2, 2027",
  );
});

test("emits a UTC date-only ISO value", () => {
  assert.equal(isoDateOnly(new Date("2026-08-06T23:59:59.999Z")), "2026-08-06");
});

test("effective end date falls back to the start date", () => {
  assert.equal(
    isoDateOnly(effectiveEventEndDate(event("2026-08-06"))),
    "2026-08-06",
  );
});

test("explicit end date wins", () => {
  assert.equal(
    isoDateOnly(effectiveEventEndDate(event("2026-08-06", "2026-08-09"))),
    "2026-08-09",
  );
});

test("one-day event remains current throughout its date", () => {
  assert.equal(
    isEventUpcomingOrOngoing(
      event("2026-08-06"),
      new Date("2026-08-06T23:59:59.999Z"),
    ),
    true,
  );
});

test("multi-day event remains current on its start date", () => {
  assert.equal(
    isEventUpcomingOrOngoing(
      event("2026-08-06", "2026-08-09"),
      utcDate("2026-08-06"),
    ),
    true,
  );
});

test("multi-day event remains current on every intermediate date", () => {
  assert.equal(
    isEventUpcomingOrOngoing(
      event("2026-08-06", "2026-08-09"),
      utcDate("2026-08-07"),
    ),
    true,
  );
  assert.equal(
    isEventUpcomingOrOngoing(
      event("2026-08-06", "2026-08-09"),
      utcDate("2026-08-08"),
    ),
    true,
  );
});

test("multi-day event remains current on its end date", () => {
  assert.equal(
    isEventUpcomingOrOngoing(
      event("2026-08-06", "2026-08-09"),
      new Date("2026-08-09T23:59:59.999Z"),
    ),
    true,
  );
});

test("multi-day event becomes past the next day", () => {
  assert.equal(
    isEventUpcomingOrOngoing(
      event("2026-08-06", "2026-08-09"),
      utcDate("2026-08-10"),
    ),
    false,
  );
});

test("invalid endDate before date is rejected on the endDate field", () => {
  const result = eventDateSchema.safeParse({
    date: "2026-08-06",
    endDate: "2026-08-05",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.deepEqual(result.error.issues[0]?.path, ["endDate"]);
    assert.equal(
      result.error.issues[0]?.message,
      "endDate must be on or after date.",
    );
  }
});

test("endDate equal to date is accepted", () => {
  assert.equal(
    eventDateSchema.safeParse({ date: "2026-08-06", endDate: "2026-08-06" })
      .success,
    true,
  );
});

let failures = 0;

console.log("\nevent date ranges\n");

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
    ? "\nAll event date tests passed.\n"
    : `\n${failures} test(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
