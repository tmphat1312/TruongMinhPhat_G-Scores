import "dotenv/config";

import csvParser from "csv-parser";
import needle from "needle";
import { z } from "zod";

import { env } from "@/env";
import { db } from ".";
import { examScoresTable, studentsTable } from "./schema";

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
const truncateStudentsTable = () => db.delete(studentsTable);
const truncateExamScoresTable = () => db.delete(examScoresTable);
const insertStudents = (rows: RowType[]) =>
  db.insert(studentsTable).values(
    rows.map((row) => ({
      candidateNumber: row.sbd,
      foreignLanguage: row.ma_ngoai_ngu,
    }))
  );
const insertExamScores = (rows: RowType[]) =>
  db.insert(examScoresTable).values(
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
const logProgress = (message: string) => {
  // Clear the previous line and print the new message
  process.stdout.moveCursor?.(0, -1);
  process.stdout.clearLine?.(0);
  console.log(">>> " + message);
};
//#endregion

let errorCount = 0;
let successCount = 0;
let table: RowType[] = [];

const insertBatchSize = 10_000;
const rawDatasetUrl = env.SEED_DATASET_URL;

// Add a newline to ensure the first log starts on a new line
console.log("\n");

logProgress("Truncating tables...");
await Promise.all([truncateStudentsTable(), truncateExamScoresTable()]);

logProgress("Starting to fetch and parse CSV data...");
needle
  .get(rawDatasetUrl)
  .pipe(csvParser())
  .on("data", (data) => {
    const parsedData = RowSchema.safeParse(data);
    if (!parsedData.success) {
      console.error("Invalid row data:", data, parsedData.error);
      errorCount++;
      return;
    }

    const row = parsedData.data;
    table.push(row);

    if (table.length % insertBatchSize === 0) {
      insertStudents(table).catch((err) => {
        console.error("Error inserting data:", err);
      });
      insertExamScores(table).catch((err) => {
        console.error("Error inserting data:", err);
      });
      table = []; // Clear the table after insertion
      successCount += insertBatchSize;
      logProgress(
        `Inserted ${successCount} rows, encountered ${errorCount} errors.`
      );
    }
  })
  .on("done", (err) => {
    if (err) {
      console.error("An error has occurred");
    }
    logProgress(
      `Inserted ${successCount} rows successfully, encountered ${errorCount} errors.`
    );
  });
