import { PageDescription } from "@/components/typography/page-description";
import { PageHeading } from "@/components/typography/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <PageHeading>Settings</PageHeading>
        <PageDescription>
          This page acts as a placeholder for future settings
        </PageDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subjects Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <span className="bg-blue-100 px-2 py-1 rounded">Math</span>
              <span className="bg-blue-100 px-2 py-1 rounded">Literature</span>
              <span className="bg-blue-100 px-2 py-1 rounded">
                Foreign Language
              </span>
              <span className="bg-green-100 px-2 py-1 rounded">Physics</span>
              <span className="bg-green-100 px-2 py-1 rounded">Chemistry</span>
              <span className="bg-green-100 px-2 py-1 rounded">Biology</span>
              <span className="bg-yellow-100 px-2 py-1 rounded">History</span>
              <span className="bg-yellow-100 px-2 py-1 rounded">Geography</span>
              <span className="bg-yellow-100 px-2 py-1 rounded">Civics</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Performance Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Level 1 (Excellent):</span>
                <span className="font-medium">≥ 8.0 points</span>
              </div>
              <div className="flex justify-between">
                <span>Level 2 (Good):</span>
                <span className="font-medium">6.0 - 7.9 points</span>
              </div>
              <div className="flex justify-between">
                <span>Level 3 (Average):</span>
                <span className="font-medium">4.0 - 5.9 points</span>
              </div>
              <div className="flex justify-between">
                <span>Level 4 (Below Average):</span>
                <span className="font-medium">{"<"} 4.0 points</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
