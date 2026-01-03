import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatusDailyChart({ data }: { data: any[] }) {
  return (
    <div className="w-full min-h-[260px] md:min-h-[320px]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Line type="monotone" dataKey="ideas" stroke="#6366f1" />
          <Line type="monotone" dataKey="planned" stroke="#22c55e" />
          <Line type="monotone" dataKey="progress" stroke="#f59e0b" />
          <Line type="monotone" dataKey="done" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
