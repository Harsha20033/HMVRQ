import { SyncUser } from "@/components/dashboard/SyncUser";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SyncUser />
      {children}
    </>
  );
}