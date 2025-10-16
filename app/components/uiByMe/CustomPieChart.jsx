import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const custom = [
  {
    name: "Rajiv Mishra",
    is_admin: true,
    is_owner: true,
    invested_amount: 30000,
  },
  {
    name: "Adarsh Patel",
    is_admin: false,
    is_owner: false,
    invested_amount: 30000,
  },
  {
    name: "Vishal Singh",
    is_admin: false,
    is_owner: false,
    invested_amount: 30000,
  },
  {
    name: "Sanjay Bhai",
    is_admin: false,
    is_owner: false,
    invested_amount: 20000,
  },
];
function CustomPieChart() {
  return (
    <div>
      {" "}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Investment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={custom}
                dataKey="invested_amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {custom.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
                contentStyle={{ borderRadius: "10px" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomPieChart;
