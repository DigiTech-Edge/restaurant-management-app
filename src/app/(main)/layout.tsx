import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 p-4 pt-16 md:pt-4 overflow-auto">{children}</div>
    </main>
  );
}
