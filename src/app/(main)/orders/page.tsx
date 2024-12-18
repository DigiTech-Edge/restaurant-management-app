import PageHeader from "@/components/global/PageHeader";
import CompletedCard from "@/components/pages/orders/CompletedCard";
import OrderCard from "@/components/pages/orders/OrderCard";
import { updateSearchParams } from "@/services/actions/searchParams.action";
import { getAllOrders } from "@/services/order.service";
import { ORDER_STATUS } from "@/lib/constants";
import { FormattedOrder } from "@/types/order.types";
import { FaClipboardList } from "react-icons/fa";

const orderStatuses = ["Pending", "Processing", "Completed"];

export default async function Orders({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const orders = await getAllOrders();
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status || "Pending";

  // Helper to format orders for the UI
  const formatOrdersForUI = (orders: FormattedOrder[]) => {
    return orders.map((order) => ({
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
  };

  // Get order counts for each status
  const getOrderCounts = () => {
    const counts = {
      pending: orders.filter((order) => order.status === ORDER_STATUS.PENDING)
        .length,
      processing: orders.filter(
        (order) => order.status === ORDER_STATUS.PROCESSING
      ).length,
      completed: orders.filter(
        (order) =>
          order.status === ORDER_STATUS.COMPLETED ||
          order.status === ORDER_STATUS.PAID
      ).length,
    };
    return counts;
  };

  // Filter orders based on status
  const getFilteredOrders = (status: string) => {
    return orders.filter((order) => {
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
  };

  const orderCounts = getOrderCounts();
  const filteredOrders = formatOrdersForUI(getFilteredOrders(status));

  const NoOrdersMessage = () => (
    <div className="w-full flex flex-col items-center justify-center p-8 text-gray-500">
      <FaClipboardList size={48} className="mb-4" />
      <p className="text-lg font-semibold">No orders found</p>
    </div>
  );

  return (
    <div>
      <PageHeader title="Orders" />
      <div className="flex md:flex-row flex-col flex-wrap gap-6 my-8">
        {orderStatuses.map((orderStatus) => {
          const count =
            orderStatus.toLowerCase() === "pending"
              ? orderCounts.pending
              : orderStatus.toLowerCase() === "processing"
              ? orderCounts.processing
              : orderCounts.completed;

          return (
            <form
              key={orderStatus}
              action={updateSearchParams}
              className="flex-grow md:flex-grow-0"
            >
              <input type="hidden" name="status" value={orderStatus} />
              <button
                type="submit"
                className={`w-full md:w-60 min-w-[8rem] py-2 rounded-lg text-base ${
                  status.toLowerCase() === orderStatus.toLowerCase()
                    ? "bg-[#5F0101] text-white"
                    : "bg-gray-200 text-[#5F0101] hover:opacity-70"
                }`}
              >
                {orderStatus} ({count})
              </button>
            </form>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredOrders.length === 0 ? (
          <NoOrdersMessage />
        ) : (
          <>
            {status.toLowerCase() === "pending" &&
              filteredOrders.map((order, index) => (
                <OrderCard
                  key={order.orderNumber}
                  {...order}
                  delay={index * 0.2}
                  backgroundColor="#F3F4F6"
                />
              ))}
            {status.toLowerCase() === "processing" &&
              filteredOrders.map((order, index) => (
                <OrderCard
                  key={order.orderNumber}
                  {...order}
                  delay={index * 0.2}
                  backgroundColor="#F6D0D0"
                />
              ))}
            {status.toLowerCase() === "completed" &&
              filteredOrders.map((order, index) => (
                <CompletedCard
                  key={order.orderNumber}
                  {...order}
                  delay={index * 0.2}
                  isPaid={order.status === ORDER_STATUS.PAID}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
