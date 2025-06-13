import { sql } from "drizzle-orm";
import { check, int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* Foreign Language Codes (ma_ngoai_ngu):
  N1 - Tiếng Anh;
  N2 - Tiếng Nga;
  N3 - Tiếng Pháp;
  N4 - Tiếng Trung Quốc;
  N5 - Tiếng Đức;
  N6 - Tiếng Nhật;
  N7 - Tiếng Hàn.
*/
// prettier-ignore
const ForeignLanguageCodes = ["N1", "N2", "N3", "N4", "N5", "N6", "N7"] as const;

export const studentsTable = sqliteTable(
  "hocsinh_table",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    candidateNumber: text("sbd").notNull().unique(),
    foreignLanguage: text("ma_ngoai_ngu", {
      enum: ForeignLanguageCodes,
    }),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => [
    check("sbd_check_length", sql`length(${table.candidateNumber}) = 8`),
    check(
      "sbd_check_format",
      sql`(${table.candidateNumber} GLOB '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')`
    ),
    check(
      "ma_ngoai_ngu_check",
      sql`(${table.foreignLanguage} IN ('N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7'))`
    ),
  ]
);

export const examScoresTable = sqliteTable(
  "diemthi_table",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    candidateNumber: text("sbd")
      .references(() => studentsTable.candidateNumber, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    math: real("toan"),
    literature: real("ngu_van"),
    foreignLanguage: real("ngoai_ngu"),
    physics: real("vat_li"),
    chemistry: real("hoa_hoc"),
    biology: real("sinh_hoc"),
    history: real("lich_su"),
    geography: real("dia_li"),
    civicEducation: real("gdcd"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => [
    check("toan_check", sql`${table.math} >= 0 AND ${table.math} <= 10`),
    check(
      "ngu_van_check",
      sql`${table.literature} >= 0 AND ${table.literature} <= 10`
    ),
    check(
      "ngoai_ngu_check",
      sql`${table.foreignLanguage} >= 0 AND ${table.foreignLanguage} <= 10`
    ),
    check(
      "vat_li_check",
      sql`${table.physics} >= 0 AND ${table.physics} <= 10`
    ),
    check(
      "hoa_hoc_check",
      sql`${table.chemistry} >= 0 AND ${table.chemistry} <= 10`
    ),
    check(
      "sinh_hoc_check",
      sql`${table.biology} >= 0 AND ${table.biology} <= 10`
    ),
    check(
      "lich_su_check",
      sql`${table.history} >= 0 AND ${table.history} <= 10`
    ),
    check(
      "dia_li_check",
      sql`${table.geography} >= 0 AND ${table.geography} <= 10`
    ),
    check(
      "gdcd_check",
      sql`${table.civicEducation} >= 0 AND ${table.civicEducation} <= 10`
    ),
  ]
);
