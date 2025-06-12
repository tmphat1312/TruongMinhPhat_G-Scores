import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Download, Upload, SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage system configuration and data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Data Operations</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Student Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                Use the SQL scripts in the project to set up the database schema
                and seed initial data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Performance Levels</h3>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Database Configuration</h3>
              <p className="text-sm text-gray-600 mb-2">
                Set up your DATABASE_URL environment variable to connect to your
                Neon database.
              </p>
              <code className="block p-2 bg-gray-100 rounded text-sm">
                DATABASE_URL=postgresql://username:password@host/database
              </code>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Run Database Scripts</h3>
              <p className="text-sm text-gray-600 mb-2">
                Execute the SQL scripts in the following order:
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>001-create-tables.sql - Creates the database schema</li>
                <li>002-seed-data.sql - Populates sample student data</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Subjects Covered</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <span className="bg-blue-100 px-2 py-1 rounded">Math</span>
                <span className="bg-blue-100 px-2 py-1 rounded">
                  Literature
                </span>
                <span className="bg-blue-100 px-2 py-1 rounded">
                  Foreign Language
                </span>
                <span className="bg-green-100 px-2 py-1 rounded">Physics</span>
                <span className="bg-green-100 px-2 py-1 rounded">
                  Chemistry
                </span>
                <span className="bg-green-100 px-2 py-1 rounded">Biology</span>
                <span className="bg-yellow-100 px-2 py-1 rounded">History</span>
                <span className="bg-yellow-100 px-2 py-1 rounded">
                  Geography
                </span>
                <span className="bg-yellow-100 px-2 py-1 rounded">Civics</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
