"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function FounderStatistics({ stats = [] }) {
  const chartData = stats.map(({ title, value }) => ({
    name: title.replace("Total ", ""),
    value,
  }));

  return (
    <div className="my-2 w-full max-w-4xl text-[#131B3A]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Founder Statistics</h2>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your opportunities and applications.
        </p>
      </div>

      <div className="h-80 w-full rounded-xl border border-[#6B7280]/30 bg-[#FAFAFA] p-4 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#131B3A", fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "#FFF1EB" }}
              contentStyle={{
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" name="Count" fill="#FF6B35" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}