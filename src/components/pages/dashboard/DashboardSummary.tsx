"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import {
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaCalendarCheck,
} from "react-icons/fa";

interface SummaryData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingReservations: number;
}

const DashboardSummary: React.FC<{ data: SummaryData }> = ({ data }) => {
  const summaryItems = [
    { title: "Total Orders", value: data.totalOrders, icon: FaShoppingCart },
    {
      title: "Total Revenue",
      value: `GHS ${data.totalRevenue.toFixed(2)}`,
      icon: FaDollarSign,
    },
    {
      title: "Average Order Value",
      value: `GHS ${data.averageOrderValue.toFixed(2)}`,
      icon: FaChartLine,
    },
    {
      title: "Pending Reservations",
      value: data.pendingReservations,
      icon: FaCalendarCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index}>
          <CardBody className="flex flex-row items-center">
            <item.icon className="text-4xl text-[#5F0101] mr-4" />
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold">
                <span className="text-[#5F0101]">{item.value}</span>
              </p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;
