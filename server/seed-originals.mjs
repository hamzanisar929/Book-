import { readFile } from "node:fs/promises";
import { query, pool } from "./db.mjs";
export async function seedOriginals() {
  const items = JSON.parse(
    await readFile(new URL("./originals.json", import.meta.url), "utf8"),
  );
  for (const [bi, b] of items.entries()) {
    await query(
      "INSERT INTO ibook.books(id,title,author,category,description,chapters,available) VALUES($1,$2,$3,$4,$5,$6,true) ON CONFLICT(id) DO NOTHING",
      [
        b.id,
        b.title,
        b.author,
        b.category,
        b.description,
        JSON.stringify(b.chapters),
      ],
    );
    for (const [page, c] of b.chapters.entries())
      await query(
        "INSERT INTO ibook.reels(id,book_id,page,title,caption,tags,video_url,source_url,attribution,license,duration_seconds) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,12) ON CONFLICT(id) DO NOTHING",
        [
          `77bb6f90-a4a3-4a8c-9200-${String(bi * 10 + page + 1).padStart(12, "0")}`,
          b.id,
          page,
          c.title,
          `A visual reflection on “${c.title}”, page ${page + 1} of ${b.title}. Pause with the atmosphere of the story, then carry it forward.`,
          [b.category.toLowerCase(), "original", "story", b.art],
          `/reels/${b.art}-${page}.mp4`,
          "",
          "iBook Studio",
          "Original AI-assisted artwork and motion by iBook Studio",
        ],
      );
  }
  return items;
}
if (process.argv[1]?.endsWith("seed-originals.mjs")) {
  try {
    await seedOriginals();
    console.log("Original stories and page-linked reels seeded.");
  } finally {
    await pool.end();
  }
}
