import { BiomarkerSummary } from "@/components/ui/biomarker-summary";
import { getResultsSummary } from "../../backend/results";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    return <>Unauthenticated</>;
  }

  const summary = await getResultsSummary(session.user.id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(summary).map(([markerId, results]) => (
          <BiomarkerSummary markerId={markerId} results={results} />
        ))}
      </div>
    </div>
  );
}
