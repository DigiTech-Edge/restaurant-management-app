"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: string;
  time: string;
}

const RecentOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <Card>
      <CardHeader className="font-bold text-large text-[#5F0101]">
        Recent Orders
      </CardHeader>
      <CardBody>
        <Table aria-label="Recent orders table">
          <TableHeader>
            <TableColumn>Customer</TableColumn>
            <TableColumn>Total</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Time</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  <span className="text-[#5F0101] font-semibold">
                    GHS {order.total.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default RecentOrders;
