import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <SessionProvider>
        <Sidebar />
        <div className="flex-1 p-4 pt-16 md:pt-4 overflow-auto">{children}</div>
      </SessionProvider>
    </main>
  );
}
