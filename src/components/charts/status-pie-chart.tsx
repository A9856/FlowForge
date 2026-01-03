import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function StatusPieChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
