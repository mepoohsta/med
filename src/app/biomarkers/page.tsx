import { BiomarkerSummary } from "@/components/ui/biomarker-summary";
import { getResultsSummary } from "../../backend/results";

export default async function Home() {
  const summary = await getResultsSummary();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(summary).map(([code, results]) => (
          <BiomarkerSummary code={code} results={results} />
        ))}
      </div>
    </div>
  );
}
