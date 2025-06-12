"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { SubjectStats } from "@/lib/typings";
import { formatNumberWithCommas } from "@/lib/utils";

interface PerformanceChartProps {
  data: SubjectStats[];
}

const chartConfig = {
  level1: {
    label: "Level 1 (≥8.0)",
    color: "#22c55e",
  },
  level2: {
    label: "Level 2 (6.0-7.9)",
    color: "#3b82f6",
  },
  level3: {
    label: "Level 3 (4.0-5.9)",
    color: "#f59e0b",
  },
  level4: {
    label: "Level 4 (<4.0)",
    color: "#ef4444",
  },
};

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="subject"
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis tickFormatter={(value) => formatNumberWithCommas(value)} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="level1"
            fill={chartConfig.level1.color}
            name={chartConfig.level1.label}
          />
          <Bar
            dataKey="level2"
            fill={chartConfig.level2.color}
            name={chartConfig.level2.label}
          />
          <Bar
            dataKey="level3"
            fill={chartConfig.level3.color}
            name={chartConfig.level3.label}
          />
          <Bar
            dataKey="level4"
            fill={chartConfig.level4.color}
            name={chartConfig.level4.label}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
