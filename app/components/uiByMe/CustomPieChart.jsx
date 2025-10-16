import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF66B2"];

function CustomPieChart({ data }) {
  const total_investment = data?.shopDetails?.total_investment || 110000;

  const categoryData = [
    { name: "Bombs", invested_amount: 50300 },
    { name: "Sparkels", invested_amount: 9900 },
    { name: "Sky shots", invested_amount: 23000 },
    { name: "Kids", invested_amount: 8700 },
    { name: "Others", invested_amount: 18100 },
  ];

  // State for dynamic radius (mobile vs desktop)
  const [outerRadius, setOuterRadius] = useState(100);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) setOuterRadius(90); // mobile
      else if (window.innerWidth < 1024) setOuterRadius(120); // tablet
      else setOuterRadius(140); // desktop large
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Category wise:
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Money spent on each category (Total: ₹{total_investment})
        </CardDescription>
      </CardHeader>

      {/* ↓ reduced padding for desktop so chart fills card */}
      <CardContent className="flex justify-center px-0 sm:px-4 md:px-2 lg:px-1 py-4">
        <ResponsiveContainer
          width="100%"
          height={window.innerWidth < 640 ? 300 : 400} // taller on desktop
          className="max-w-[600px]" // prevent over-expansion
        >
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="invested_amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {categoryData.map((entry, index) => (
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
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CustomPieChart;
