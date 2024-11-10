import { getMarkerResults } from "@/backend/results";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

type Params = {
  marker: string;
};

export default async function Page({ params }: { params: Params }) {
  const { marker } = params;

  const results = await getMarkerResults(marker);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="">History</div>

      {results.map((result) => {
        return (
          <>
            <div>
              {dayjs(result.date).format("MMM, d, YYYY")} {result.value}{" "}
              {result.unit}
            </div>
          </>
        );
      })}
    </div>
  );
}
