import PageHeader from "@/components/global/PageHeader";
import DashboardSummary from "@/components/pages/dashboard/DashboardSummary";
import PopularItems from "@/components/pages/dashboard/PopularItems";
import WeeklySales from "@/components/pages/report/WeeklySales";

// Dummy data (in a real app, this would come from your backend)
const reportData = {
  summary: {
    totalOrders: 312,
    totalRevenue: 25000, // Represents GHS
    averageOrderValue: 80.13, // Represents GHS
    pendingReservations: 15,
  },
  popularItems: [
    { name: "Jollof Rice", orders: 60, revenue: 900 },
    { name: "Waakye", orders: 55, revenue: 825 },
    { name: "Fufu with Light Soup", orders: 45, revenue: 675 },
    { name: "Banku with Tilapia", orders: 40, revenue: 800 },
  ],
  weeklySales: [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1500 },
    { day: "Wed", sales: 1800 },
    { day: "Thu", sales: 2000 },
    { day: "Fri", sales: 2500 },
    { day: "Sat", sales: 3000 },
    { day: "Sun", sales: 2800 },
  ],
};

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Report" />
      <DashboardSummary data={reportData.summary} />
      <div className="flex flex-col gap-6">
        <PopularItems items={reportData.popularItems} />
        <WeeklySales data={reportData.weeklySales} />
      </div>
    </div>
  );
}
