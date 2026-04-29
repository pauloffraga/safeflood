import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function WaterChart({ data }) {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={data || []}>
          
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="level"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}