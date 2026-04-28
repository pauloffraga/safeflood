import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WaterChart({ data }) {

  return (
    <div style={{ width: "100%", height: 250 }}>

      <ResponsiveContainer>
        <LineChart data={data}>

          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="level"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}