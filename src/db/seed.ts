import csvParser from "csv-parser";
import { sql } from "drizzle-orm";
import needle from "needle";
import { z } from "zod";

import { examScoresTable, studentsTable } from "./schema";
import { env } from "@/env";
import { db } from ".";

//#region Helpers
const GradeSchema = z
  .string()
  .optional()
  .transform((val) => (val ? parseFloat(val) : null));
const RowSchema = z.object({
  sbd: z.string().length(8),
  toan: GradeSchema,
  ngu_van: GradeSchema,
  ngoai_ngu: GradeSchema,
  vat_li: GradeSchema,
  hoa_hoc: GradeSchema,
  sinh_hoc: GradeSchema,
  lich_su: GradeSchema,
  dia_li: GradeSchema,
  gdcd: GradeSchema,
  ma_ngoai_ngu: z
    .enum(["N1", "N2", "N3", "N4", "N5", "N6", "N7", ""])
    .optional()
    .transform((val) => (val ? val : null)),
});
type RowType = z.infer<typeof RowSchema>;

function truncateStudentsTable() {
  return db.run(sql`DELETE FROM ${studentsTable}`);
}
function truncateExamScoresTable() {
  return db.run(sql`DELETE FROM ${examScoresTable}`);
}
function insertStudents(rows: RowType[]) {
  return db.insert(studentsTable).values(
    rows.map((row) => ({
      candidateNumber: row.sbd,
      foreignLanguage: row.ma_ngoai_ngu,
    }))
  );
}
function insertExamScores(rows: RowType[]) {
  return db.insert(examScoresTable).values(
    rows.map((row) => ({
      candidateNumber: row.sbd,
      math: row.toan,
      literature: row.ngu_van,
      foreignLanguage: row.ngoai_ngu,
      physics: row.vat_li,
      chemistry: row.hoa_hoc,
      biology: row.sinh_hoc,
      history: row.lich_su,
      geography: row.dia_li,
      civicEducation: row.gdcd,
    }))
  );
}

async function seedTables(table: RowType[]) {
  const insertTable = [...table];
  try {
    await insertStudents(insertTable);
    await insertExamScores(insertTable);
    await new Promise((resolve) => setTimeout(resolve, 50));
  } catch (err) {
    handleInsertError(err as Error);
  }
}

function logProgress(message: string) {
  // Clear the previous line and print the new message
  process.stdout.moveCursor?.(0, -1);
  process.stdout.clearLine?.(0);
  console.log(">>> " + message);
}

function handleInsertError(err: Error) {
  const { cause } = err;
  console.error("Error inserting data:", cause);
  console.log(`
    Helpful tips:
      - If you see "_ERROR: too many SQL variables", it means the batch size is too large.
      => Batch size too large, reducing to <= 1_000 rows per batch.
    `);
  process.exit(1);
}
//#endregion

// #region Main functions
async function* parseCsvStream() {
  const insertBatchSize = 1_000;
  const rawDatasetUrl =
    env.SEED_DATASET_URL ??
    "https://raw.githubusercontent.com/GoldenOwlAsia/webdev-intern-assignment-3/refs/heads/main/dataset/diem_thi_thpt_2024.csv";

  let errorCount = 0;
  let table: RowType[] = [];
  const stream = needle.get(rawDatasetUrl).pipe(csvParser());

  for await (const data of stream) {
    const parsedData = RowSchema.safeParse(data);

    if (!parsedData.success) {
      console.error("Invalid row data:", data, parsedData.error);
      errorCount++;
      continue;
    }

    table.push(parsedData.data as RowType);

    if (table.length >= insertBatchSize) {
      yield [table, errorCount] as const;
      table = [];
      errorCount = 0;
    }
  }

  if (table.length > 0) {
    yield [table, errorCount] as const;
    table = [];
    errorCount = 0;
  }
}

async function seedFromGenerator() {
  let successCount = 0;
  let errorCount = 0;

  for await (const [batch, parseErrorCount] of parseCsvStream()) {
    await seedTables(batch);
    successCount += batch.length;
    errorCount += parseErrorCount;
    logProgress(
      `Processed ${successCount.toLocaleString()} rows, encountered ${errorCount.toLocaleString()} errors.`
    );
  }

  logProgress(
    `Complete: Inserted ${successCount.toLocaleString()} rows successfully, encountered ${errorCount.toLocaleString()} errors.`
  );
}
// #endregion

// Add a newline to ensure the first log starts on a new line
console.log("\nIt will take a while to seed the database, please wait...\n");

logProgress("Truncating tables...");
await truncateExamScoresTable();
await truncateStudentsTable();
logProgress("Starting to fetch and parse CSV data...");
seedFromGenerator().catch((err) => {
  console.error("An error occurred while processing the CSV:", err);
  process.exit(1);
});
