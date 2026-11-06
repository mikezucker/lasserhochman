import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const slugs = [
  "real-property-tax-appeals",
  "real-estate",
  "litigation",
  "corporate-law",
  "estate-planning-and-administration",
  "taxation",
];
const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

for (const slug of slugs) {
  test(`${slug}: complete, independently editable educational guide`, async () => {
    const guide = await readJson(`../src/data/practice-guides/${slug}.json`);
    assert.equal(
      guide.reviewStatus,
      "Attorney review required before publication",
    );
    assert.ok(guide.introduction.length >= 2);
    for (const key of ["concepts", "services", "scenarios", "process"]) {
      assert.ok(guide[key].length >= 2, `${key} coverage`);
      for (const item of guide[key]) {
        assert.ok(item.title.trim());
        assert.ok(
          item.text.split(/\s+/).length >= 20,
          `Substantive ${key}: ${item.title}`,
        );
      }
    }
    assert.ok(guide.faqs.length >= 5 && guide.faqs.length <= 8);
    assert.equal(
      new Set(guide.faqs.map((faq) => faq.question)).size,
      guide.faqs.length,
    );
    for (const faq of guide.faqs) {
      assert.ok(faq.question.endsWith("?"));
      assert.ok(faq.answer.split(/\s+/).length >= 25);
    }
    for (const related of guide.related) {
      assert.ok(
        slugs.includes(related),
        `Existing related practice: ${related}`,
      );
      assert.notEqual(related, slug);
    }
    assert.ok(guide.sources.length >= 2);
    for (const source of guide.sources) {
      assert.ok(source.label);
      assert.match(
        new URL(source.url).hostname,
        /(?:^|\.)(?:njcourts\.gov|nj\.gov|irs\.gov|uscourts\.gov|monmouth\.nj\.us|mercercounty\.org)$/,
      );
    }
  });
}
