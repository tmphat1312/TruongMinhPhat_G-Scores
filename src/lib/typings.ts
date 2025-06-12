import { examScoresTable, studentsTable } from "@/db/schema";

export interface PerformanceLevel {
  level: number;
  description: string;
  count: number;
}

export interface SubjectStats {
  subject: string;
  level1: number;
  level2: number;
  level3: number;
  level4: number;
}

export type ExamScore = typeof examScoresTable.$inferSelect;
export type Student = typeof studentsTable.$inferSelect;
export type StudentWithScores = Pick<
  Student,
  "id" | "candidateNumber" | "foreignLanguage"
> & {
  scores: Omit<ExamScore, "createdAt" | "updatedAt" | "id" | "candidateNumber">;
};
