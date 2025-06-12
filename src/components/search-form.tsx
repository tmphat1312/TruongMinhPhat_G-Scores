"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchStudentByRegistration } from "@/lib/actions";
import { StudentWithScores } from "@/lib/typings";

const CandidateNumberSchema = z
  .string()
  .length(8, {
    message: "Registration number must be exactly 8 characters long",
  })
  .refine((value) => /^[0-9]+$/.test(value), {
    message: "Registration number must contain only digits",
  });

export function SearchForm() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [student, setStudent] = useState<StudentWithScores | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate the registration number
    const validation = CandidateNumberSchema.safeParse(registrationNumber);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setStudent(null);
      return;
    }

    startTransition(async () => {
      const result = await searchStudentByRegistration(
        registrationNumber.trim()
      );
      if (!result) {
        setError("No student found with this registration number.");
        setStudent(null);
      } else {
        setStudent(result);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="registration" className="mb-2.5">
                Registration Number
              </Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  id="registration"
                  type="text"
                  placeholder="Enter registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black hover:bg-gray-800"
                >
                  {isLoading ? "Searching..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {student && (
        <Card className={isLoading ? "opacity-50 animate-pulse" : ""}>
          <CardHeader>
            <CardTitle>Detailed Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label className="font-semibold">Registration Number:</Label>
                <p className="text-lg">{student.candidateNumber}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg border-b pb-2">
                    Core Subjects
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span>Math:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.math ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Literature:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.literature ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-nowrap">Foreign Language:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.foreignLanguage ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg border-b pb-2">
                    Sciences
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span>Physics:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.physics ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Chemistry:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.chemistry ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Biology:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.biology ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg border-b pb-2">
                    Social Studies
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span>History:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.history ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Geography:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.geography ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Civics:</span>
                      <span className="font-medium w-full text-end bg-secondary/50">
                        {student.scores.civicEducation ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
