import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

type Props = {
  data: { name: string; count: number }[];
};

export default function StatusChart({ data }: Props) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="count"
            isAnimationActive
            animationDuration={800}
            radius={[6, 6, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
