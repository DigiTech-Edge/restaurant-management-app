"use client";

import { useMemo } from "react";
import useSWR from "swr";
import CompletedCard from "@/components/pages/orders/CompletedCard";
import OrderCard from "@/components/pages/orders/OrderCard";
import { ORDER_STATUS } from "@/lib/constants";
import { FormattedOrder } from "@/types/order.types";
import { FaClipboardList } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const orderStatuses = ["Pending", "Processing", "Completed"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OrdersClientWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get("status") || "Pending";

  const { data: rawOrders = [], isLoading } = useSWR<FormattedOrder[]>(
    "/api/orders",
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: false, // Prevent revalidation on tab focus
      keepPreviousData: true, // Keep showing old data while fetching new data
    }
  );

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", newStatus);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Format and memoize the orders
  const orders = useMemo(() => {
    if (!Array.isArray(rawOrders)) return [];

    return rawOrders.map((order) => ({
      id: order.id,
      orders: order.orders.map((item) => ({
        ...item,
        description: item.description,
      })),
      orderTime: order.orderTime,
      tableNumber: order.tableNumber,
      orderNumber: order.orderNumber,
      orderType: order.orderType,
      status: order.status,
      paymentMethod: order.paymentMethod,
    }));
  }, [rawOrders]);

  // Memoize order counts to prevent unnecessary recalculations
  const orderCounts = useMemo(() => {
    if (!Array.isArray(orders))
      return { pending: 0, processing: 0, completed: 0 };

    const counts = {
      pending: orders.filter((order) => order?.status === ORDER_STATUS.PENDING)
        .length,
      processing: orders.filter(
        (order) => order?.status === ORDER_STATUS.PROCESSING
      ).length,
      completed: orders.filter(
        (order) =>
          order?.status === ORDER_STATUS.COMPLETED ||
          order?.status === ORDER_STATUS.PAID
      ).length,
    };
    return counts;
  }, [orders]);

  // Filter orders based on selected status
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    if (!status) return [];

    return orders.filter((order) => {
      if (!order?.status) return false;

      switch (status.toLowerCase()) {
        case "pending":
          return order.status === ORDER_STATUS.PENDING;
        case "processing":
          return order.status === ORDER_STATUS.PROCESSING;
        case "completed":
          return (
            order.status === ORDER_STATUS.COMPLETED ||
            order.status === ORDER_STATUS.PAID
          );
        default:
          return false;
      }
    });
  }, [orders, status]);

  const NoOrdersMessage = () => (
    <div className="w-full flex flex-col items-center justify-center p-8 text-gray-500">
      <FaClipboardList size={48} className="mb-4" />
      <p className="text-lg font-semibold">
        {isLoading && !orders.length ? "Loading orders..." : "No orders found"}
      </p>
    </div>
  );

  return (
    <>
      <div className="flex md:flex-row flex-col flex-wrap gap-6 my-8">
        {orderStatuses.map((orderStatus) => {
          const count =
            orderStatus.toLowerCase() === "pending"
              ? orderCounts.pending
              : orderStatus.toLowerCase() === "processing"
              ? orderCounts.processing
              : orderCounts.completed;

          return (
            <button
              key={orderStatus}
              onClick={() => handleStatusChange(orderStatus)}
              className={`w-full md:w-60 min-w-[8rem] py-2 rounded-lg text-base ${
                status.toLowerCase() === orderStatus.toLowerCase()
                  ? "bg-[#5F0101] text-white"
                  : "bg-gray-200 text-[#5F0101] hover:opacity-70"
              }`}
            >
              {orderStatus} ({count})
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        {isLoading && !orders.length ? (
          <NoOrdersMessage />
        ) : filteredOrders.length === 0 ? (
          <NoOrdersMessage />
        ) : (
          <>
            {status.toLowerCase() === "pending" &&
              filteredOrders.map((order, index) => (
                <OrderCard
                  key={order.orderNumber}
                  {...order}
                  orderId={order.id}
                  delay={index * 0.2}
                  backgroundColor="#F3F4F6"
                />
              ))}
            {status.toLowerCase() === "processing" &&
              filteredOrders.map((order, index) => (
                <OrderCard
                  key={order.orderNumber}
                  {...order}
                  orderId={order.id}
                  delay={index * 0.2}
                  backgroundColor="#F6D0D0"
                />
              ))}
            {status.toLowerCase() === "completed" &&
              filteredOrders.map((order, index) => (
                <CompletedCard
                  key={order.orderNumber}
                  orders={order.orders}
                  orderTime={order.orderTime}
                  tableNumber={order.tableNumber}
                  orderNumber={order.orderNumber}
                  orderType={order.orderType}
                  paymentMethod={order.paymentMethod}
                  delay={index * 0.2}
                  isPaid={order.status === ORDER_STATUS.PAID}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
}
