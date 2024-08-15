"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesData {
  day: string;
  sales: number;
}

const WeeklySales: React.FC<{ data: SalesData[] }> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="font-bold text-large text-[#5F0101]">
        Weekly Sales
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#5F0101" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default WeeklySales;
