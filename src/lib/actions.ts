"use server";

import { db } from "@/db";
import { SubjectStats } from "./typings";
import { examScoresTable, studentsTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function getSubjectStatistics(): Promise<SubjectStats[]> {
  // Get all statistics in a single query to avoid dynamic column name issues
  const statement = sql`
      SELECT
        -- Math statistics
        COUNT(CASE WHEN ${examScoresTable.math} >= 8 THEN 1 END) as math_level1,
        COUNT(CASE WHEN ${examScoresTable.math} >= 6 AND ${examScoresTable.math} < 8 THEN 1 END) as math_level2,
        COUNT(CASE WHEN ${examScoresTable.math} >= 4 AND ${examScoresTable.math} < 6 THEN 1 END) as math_level3,
        COUNT(CASE WHEN ${examScoresTable.math} < 4 THEN 1 END) as math_level4,

        -- Literature statistics
        COUNT(CASE WHEN ${examScoresTable.literature} >= 8 THEN 1 END) as literature_level1,
        COUNT(CASE WHEN ${examScoresTable.literature} >= 6 AND ${examScoresTable.literature} < 8 THEN 1 END) as literature_level2,
        COUNT(CASE WHEN ${examScoresTable.literature} >= 4 AND ${examScoresTable.literature} < 6 THEN 1 END) as literature_level3,
        COUNT(CASE WHEN ${examScoresTable.literature} < 4 THEN 1 END) as literature_level4,

        -- Foreign Language statistics
        COUNT(CASE WHEN ${examScoresTable.foreignLanguage} >= 8 THEN 1 END) as foreign_language_level1,
        COUNT(CASE WHEN ${examScoresTable.foreignLanguage} >= 6 AND ${examScoresTable.foreignLanguage} < 8 THEN 1 END) as foreign_language_level2,
        COUNT(CASE WHEN ${examScoresTable.foreignLanguage} >= 4 AND ${examScoresTable.foreignLanguage} < 6 THEN 1 END) as foreign_language_level3,
        COUNT(CASE WHEN ${examScoresTable.foreignLanguage} < 4 THEN 1 END) as foreign_language_level4,

        -- Physics statistics
        COUNT(CASE WHEN ${examScoresTable.physics} >= 8 THEN 1 END) as physics_level1,
        COUNT(CASE WHEN ${examScoresTable.physics} >= 6 AND ${examScoresTable.physics} < 8 THEN 1 END) as physics_level2,
        COUNT(CASE WHEN ${examScoresTable.physics} >= 4 AND ${examScoresTable.physics} < 6 THEN 1 END) as physics_level3,
        COUNT(CASE WHEN ${examScoresTable.physics} < 4 THEN 1 END) as physics_level4,

        -- Chemistry statistics
        COUNT(CASE WHEN ${examScoresTable.chemistry} >= 8 THEN 1 END) as chemistry_level1,
        COUNT(CASE WHEN ${examScoresTable.chemistry} >= 6 AND ${examScoresTable.chemistry} < 8 THEN 1 END) as chemistry_level2,
        COUNT(CASE WHEN ${examScoresTable.chemistry} >= 4 AND ${examScoresTable.chemistry} < 6 THEN 1 END) as chemistry_level3,
        COUNT(CASE WHEN ${examScoresTable.chemistry} < 4 THEN 1 END) as chemistry_level4,

        -- Biology statistics
        COUNT(CASE WHEN ${examScoresTable.biology} >= 8 THEN 1 END) as biology_level1,
        COUNT(CASE WHEN ${examScoresTable.biology} >= 6 AND ${examScoresTable.biology} < 8 THEN 1 END) as biology_level2,
        COUNT(CASE WHEN ${examScoresTable.biology} >= 4 AND ${examScoresTable.biology} < 6 THEN 1 END) as biology_level3,
        COUNT(CASE WHEN ${examScoresTable.biology} < 4 THEN 1 END) as biology_level4,

        -- History statistics
        COUNT(CASE WHEN ${examScoresTable.history} >= 8 THEN 1 END) as history_level1,
        COUNT(CASE WHEN ${examScoresTable.history} >= 6 AND ${examScoresTable.history} < 8 THEN 1 END) as history_level2,
        COUNT(CASE WHEN ${examScoresTable.history} >= 4 AND ${examScoresTable.history} < 6 THEN 1 END) as history_level3,
        COUNT(CASE WHEN ${examScoresTable.history} < 4 THEN 1 END) as history_level4,

        -- Geography statistics
        COUNT(CASE WHEN ${examScoresTable.geography} >= 8 THEN 1 END) as geography_level1,
        COUNT(CASE WHEN ${examScoresTable.geography} >= 6 AND ${examScoresTable.geography} < 8 THEN 1 END) as geography_level2,
        COUNT(CASE WHEN ${examScoresTable.geography} >= 4 AND ${examScoresTable.geography} < 6 THEN 1 END) as geography_level3,
        COUNT(CASE WHEN ${examScoresTable.geography} < 4 THEN 1 END) as geography_level4,

        -- Civics statistics
        COUNT(CASE WHEN ${examScoresTable.civicEducation} >= 8 THEN 1 END) as civics_level1,
        COUNT(CASE WHEN ${examScoresTable.civicEducation} >= 6 AND ${examScoresTable.civicEducation} < 8 THEN 1 END) as civics_level2,
        COUNT(CASE WHEN ${examScoresTable.civicEducation} >= 4 AND ${examScoresTable.civicEducation} < 6 THEN 1 END) as civics_level3,
        COUNT(CASE WHEN ${examScoresTable.civicEducation} < 4 THEN 1 END) as civics_level4
      FROM ${examScoresTable}
    `;
  const { rows: result } = await db.run(statement);
  console.log("Subject statistics result:", result);
  if (result.length === 0) return [];

  const row = result[0];
  const subjects = [
    { key: "math", name: "Math" },
    { key: "literature", name: "Literature" },
    { key: "foreign_language", name: "Foreign Language" },
    { key: "physics", name: "Physics" },
    { key: "chemistry", name: "Chemistry" },
    { key: "biology", name: "Biology" },
    { key: "history", name: "History" },
    { key: "geography", name: "Geography" },
    { key: "civics", name: "Civics" },
  ];

  const stats: SubjectStats[] = subjects.map(({ key, name }) => ({
    subject: name,
    a: row[`${key}_level1`],
    level1: Number(row[`${key}_level1`] ?? "0"),
    level2: Number(row[`${key}_level2`] ?? "0"),
    level3: Number(row[`${key}_level3`] ?? "0"),
    level4: Number(row[`${key}_level4`] ?? "0"),
  }));

  return stats;
}

export async function getStudentsCountStats() {
  const studentsCount = await db.$count(studentsTable);
  const subjectsCount = 9; // Assuming 9 subjects as per the original code
  return {
    totalStudents: studentsCount,
    totalSubjects: subjectsCount,
  };
}
