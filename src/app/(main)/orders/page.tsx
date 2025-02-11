import { Suspense } from "react";
import PageHeader from "@/components/global/PageHeader";
import OrdersClientWrapper from "@/components/pages/orders/OrdersClientWrapper";
import { Spinner } from "@nextui-org/react";
function OrdersLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] text-gray-500">
      <Spinner size="lg" color="danger" />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <div>
      <PageHeader title="Orders" />
      <Suspense fallback={<OrdersLoading />}>
        <OrdersClientWrapper />
      </Suspense>
    </div>
  );
}
