import { getUserPapers } from "@/actions/getHistory";
import { HistoryClient } from "@/components/dashboard/HistoryClient";

export default async function HistoryPage() {
  const papers = await getUserPapers();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Paper History</h1>
      <HistoryClient initialPapers={papers || []} />
    </div>
  );
}
