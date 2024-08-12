import PageHeader from "@/components/global/PageHeader";
import DashboardSummary from "@/components/pages/dashboard/DashboardSummary";
import RecentOrders from "@/components/pages/dashboard/RecentOrders";
import PopularItems from "@/components/pages/dashboard/PopularItems";
import ReservationOverview from "@/components/pages/dashboard/ReservationOverview";

// Dummy data (in a real app, this would come from your backend)
const dashboardData = {
  summary: {
    totalOrders: 156,
    totalRevenue: 12500, // Now represents GHS
    averageOrderValue: 80.13, // Now represents GHS
    pendingReservations: 8,
  },
  recentOrders: [
    {
      id: "1",
      customerName: "John Doe",
      total: 95.5,
      status: "Completed",
      time: "10:30 AM",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      total: 120.75,
      status: "Processing",
      time: "11:15 AM",
    },
    {
      id: "3",
      customerName: "Bob Johnson",
      total: 55.25,
      status: "Pending",
      time: "11:45 AM",
    },
    {
      id: "4",
      customerName: "Alice Brown",
      total: 85.0,
      status: "Completed",
      time: "12:30 PM",
    },
  ],
  popularItems: [
    { name: "Margherita Pizza", orders: 45, revenue: 540 },
    { name: "Chicken Alfredo", orders: 38, revenue: 570 },
    { name: "Caesar Salad", orders: 32, revenue: 320 },
    { name: "Tiramisu", orders: 28, revenue: 224 },
  ],
  reservations: [
    { time: "12:00 PM", reserved: 3, available: 7 },
    { time: "1:00 PM", reserved: 5, available: 5 },
    { time: "2:00 PM", reserved: 2, available: 8 },
    { time: "6:00 PM", reserved: 8, available: 2 },
    { time: "7:00 PM", reserved: 10, available: 0 },
    { time: "8:00 PM", reserved: 6, available: 4 },
  ],
};

export default function Home() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" />
      <DashboardSummary data={dashboardData.summary} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOrders orders={dashboardData.recentOrders} />
        <PopularItems items={dashboardData.popularItems} />
      </div>
      <ReservationOverview reservations={dashboardData.reservations} />
    </div>
  );
}
