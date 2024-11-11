import { auth } from "@/auth";
import { getMarkerResults } from "@/backend/results";
import dayjs from "dayjs";

type Params = {
  marker: string;
};

export default async function Page({ params }: { params: Params }) {
  const { marker } = params;

  const session = await auth();

  if (!session?.user?.id) {
    return <>Unauthenticated</>;
  }

  const results = await getMarkerResults(session.user.id, marker);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="">History</div>

      {results.map((result) => {
        return (
          <div key={result.id}>
            {dayjs(result.date).format("MMM, d, YYYY")} {result.value}{" "}
            {result.unit}
          </div>
        );
      })}
    </div>
  );
}
