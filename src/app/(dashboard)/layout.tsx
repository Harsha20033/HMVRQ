import { SyncUser } from "@/components/dashboard/SyncUser";
import DashboardGrid from "@/components/dashboard/DashboardGrid";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardGrid />
      <SyncUser />
      {children}
    </>
  );
}