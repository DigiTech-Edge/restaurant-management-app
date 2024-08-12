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

interface MenuItem {
  name: string;
  orders: number;
  revenue: number;
}

const PopularItems: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <Card>
      <CardHeader className="font-bold text-large text-[#5F0101]">
        Popular Menu Items
      </CardHeader>
      <CardBody>
        <Table aria-label="Popular menu items table">
          <TableHeader>
            <TableColumn>Item</TableColumn>
            <TableColumn>Orders</TableColumn>
            <TableColumn>Revenue</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.orders}</TableCell>
                <TableCell>
                  <span className="text-[#5F0101] font-semibold">
                    GHS {item.revenue.toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default PopularItems;
