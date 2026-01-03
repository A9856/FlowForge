import { useState } from "react";
import { useTaskStore } from "../store/task-store";

import StatusDailyChart from "../components/charts/status-daily-chart";
import StatusPieChart from "../components/charts/status-pie-chart";

import { filterByRange } from "../lib/date-filter";
import { exportCSV } from "../lib/export-csv";
import { exportPDF } from "../lib/export-pdf";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Analytics() {
  const tasks = useTaskStore((s) => s.tasks);
  const [range, setRange] = useState<"week" | "month">("week");

  /* ---------------- DATE RANGE LOGIC ---------------- */

  const today = new Date();

  const startDate =
    range === "week"
      ? new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      : new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  /* ---------------- FILTER TASKS ---------------- */

  const filtered = filterByRange(tasks, range);

  /* ---------------- SUMMARY (FOR PIE + PDF) ---------------- */

  const summary = {
    Ideas: filtered.filter((t) => t.status === "ideas").length,
    Planned: filtered.filter((t) => t.status === "planned").length,
    Progress: filtered.filter((t) => t.status === "progress").length,
    Done: filtered.filter((t) => t.status === "done").length,
  };

  const pieData = Object.entries(summary).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      <Card>
        {/* ---------------- HEADER ---------------- */}
        <CardHeader className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Analytics</CardTitle>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={range === "week" ? "default" : "outline"}
                onClick={() => setRange("week")}
              >
                Weekly
              </Button>
              <Button
                variant={range === "month" ? "default" : "outline"}
                onClick={() => setRange("month")}
              >
                Monthly
              </Button>

              <Button
                variant="outline"
                onClick={() => exportCSV(pieData)}
              >
                Export CSV
              </Button>

              <Button
                variant="outline"
                onClick={() => exportPDF(summary)}
              >
                Export PDF
              </Button>
            </div>
          </div>

          {/* ---------------- DATE RANGE DISPLAY ---------------- */}
          <p className="text-sm text-muted-foreground">
            Showing data from{" "}
            <span className="font-medium">
              {formatDate(startDate)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {formatDate(today)}
            </span>
          </p>
        </CardHeader>

        {/* ---------------- CONTENT ---------------- */}
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie / Donut Chart */}
          <StatusPieChart data={pieData} />

          {/* Status-wise Daily Line Chart */}
          <StatusDailyChart data={filtered} />
        </CardContent>
      </Card>
    </div>
  );
}
