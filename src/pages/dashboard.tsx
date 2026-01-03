import { useTaskStore } from "../store/task-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusChart from "../components/charts/status-chart";

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);

  const chartData = [
    { name: "Ideas", count: tasks.filter(t => t.status === "ideas").length },
    { name: "Planned", count: tasks.filter(t => t.status === "planned").length },
    { name: "Progress", count: tasks.filter(t => t.status === "progress").length },
    { name: "Done", count: tasks.filter(t => t.status === "done").length },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {chartData.map((c) => (
          <Card key={c.name}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {c.count}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
