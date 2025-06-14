import { Award, Medal, Trophy } from "lucide-react";
import { Suspense } from "react";

import { PerformanceChart } from "@/components/performance-chart";
import { PageDescription } from "@/components/typography/page-description";
import { PageHeading } from "@/components/typography/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { getSubjectStatistics, getTopStudentsGroupA } from "@/lib/actions";
import { formatNumberWithCommas } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <PageHeading>Performance Reports</PageHeading>
        <PageDescription>
          Comprehensive analysis of student exam performance
        </PageDescription>
      </div>

      <Suspense fallback={<Skeleton className="h-[515px]" />}>
        <PerformanceDistribution />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[1000px]" />}>
        <TopStudentsGroupA />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[550px]" />}>
        <PerformanceSummary />
      </Suspense>
    </div>
  );
}

async function TopStudentsGroupA() {
  const topStudents = await getTopStudentsGroupA();
  return (
    <Card id="top-students">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="size-5 text-yellow-500" />
          Top 10 Students - Group A (Math + Physics + Chemistry)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ranking based on combined scores in Math, Physics, and Chemistry
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topStudents.map((student, index) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index === 0
                  ? "bg-yellow-50 border-yellow-200"
                  : index === 1
                  ? "bg-gray-50 border-gray-200"
                  : index === 2
                  ? "bg-orange-50 border-orange-200"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                  {index === 0 && (
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  )}
                  {index === 1 && <Medal className="h-4 w-4 text-gray-500" />}
                  {index === 2 && <Award className="h-4 w-4 text-orange-500" />}
                  {index > 2 && <span className="text-sm">{index + 1}</span>}
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {student.candidateNumber}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {student.totalScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">
                  M: {student.scores.math} | P: {student.scores.physics} | C:{" "}
                  {student.scores.chemistry}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

async function PerformanceDistribution() {
  const stats = await getSubjectStatistics();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Distribution by Subject</CardTitle>
        <p className="text-sm text-gray-600">
          Number of students in each performance level across all subjects
        </p>
      </CardHeader>
      <CardContent>
        <PerformanceChart data={stats} />
      </CardContent>
    </Card>
  );
}

async function PerformanceSummary() {
  const stats = await getSubjectStatistics();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((subject) => {
              const total =
                subject.level1 +
                subject.level2 +
                subject.level3 +
                subject.level4;
              const excellentRate =
                total > 0 ? (subject.level1 / total) * 100 : 0;
              return (
                <div
                  key={subject.subject}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{subject.subject}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {isNaN(excellentRate) ? "0.0" : excellentRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">excellent rate</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Assessments</span>
              <span className="text-lg font-bold">
                {formatNumberWithCommas(
                  stats.reduce(
                    (acc, s) => acc + s.level1 + s.level2 + s.level3 + s.level4,
                    0
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Excellent Scores (≥8.0)</span>
              <span className="text-lg font-bold text-green-600">
                {formatNumberWithCommas(
                  stats.reduce((acc, s) => acc + s.level1, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Good Scores (6.0-7.9)</span>
              <span className="text-lg font-bold text-blue-600">
                {formatNumberWithCommas(
                  stats.reduce((acc, s) => acc + s.level2, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Scores (4.0-5.9)</span>
              <span className="text-lg font-bold text-yellow-600">
                {formatNumberWithCommas(
                  stats.reduce((acc, s) => acc + s.level3, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Below Average ({"<"}4.0)</span>
              <span className="text-lg font-bold text-red-600">
                {formatNumberWithCommas(
                  stats.reduce((acc, s) => acc + s.level4, 0)
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
