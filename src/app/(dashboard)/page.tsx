import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { getStudentsCountStats, getSubjectStatistics } from "@/lib/actions";
import { formatNumberWithCommas } from "@/lib/utils";

export default async function DashboardPage() {
  const { totalStudents, totalSubjects } = await getStudentsCountStats();
  const stats = await getSubjectStatistics();

  // Safe calculation for average performance
  const avgPerformance =
    stats.length > 0
      ? stats.reduce((acc, subject) => {
          const total =
            subject.level1 + subject.level2 + subject.level3 + subject.level4;
          const weighted =
            subject.level1 * 4 +
            subject.level2 * 3 +
            subject.level3 * 2 +
            subject.level4 * 1;
          return acc + (total > 0 ? weighted / total : 0);
        }, 0) / stats.length
      : 0;

  // Safe calculation for excellent students
  const excellentStudents =
    stats.length > 0
      ? stats.reduce((acc, subject) => acc + subject.level1, 0) / stats.length
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of student exam performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumberWithCommas(totalStudents)}
            </div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumberWithCommas(totalSubjects)}
            </div>
            <p className="text-xs text-muted-foreground">Exam subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isNaN(avgPerformance) ? "0.0" : avgPerformance.toFixed(1)}/4
            </div>
            <p className="text-xs text-muted-foreground">Performance level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Excellent (≥8.0)
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isNaN(excellentStudents)
                ? "0"
                : formatNumberWithCommas(Math.round(excellentStudents))}
            </div>
            <p className="text-xs text-muted-foreground">Average per subject</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-800">Level 1</div>
                  <div className="text-sm text-green-600">
                    Scores ≥ 8.0 points
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  Excellent
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-blue-800">Level 2</div>
                  <div className="text-sm text-blue-600">
                    Scores 6.0 - 7.9 points
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-700">Good</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-yellow-800">Level 3</div>
                  <div className="text-sm text-yellow-600">
                    Scores 4.0 - 5.9 points
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-700">
                  Average
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">Level 4</div>
                  <div className="text-sm text-red-600">
                    Scores {"<"} 4.0 points
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-700">
                  Below Average
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/search"
                className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-blue-900">
                  Search Student Scores
                </div>
                <div className="text-sm text-blue-700">
                  Look up scores by registration number
                </div>
              </a>
              <a
                href="/reports"
                className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-green-900">
                  View Performance Reports
                </div>
                <div className="text-sm text-green-700">
                  Analyze statistics and trends
                </div>
              </a>
              <a
                href="/reports#top-students"
                className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-purple-900">
                  Top Students Ranking
                </div>
                <div className="text-sm text-purple-700">
                  View top 10 Group A performers
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
