import { auth } from "@/auth";
import { getMarkerResults } from "@/backend/results";
import dayjs from "dayjs";

type Params = {
  markercode: string;
};

export default async function Page({ params }: { params: Params }) {
  const { markercode } = params;

  const session = await auth();

  if (!session?.user?.id) {
    return <>Unauthenticated</>;
  }

  const results = await getMarkerResults(session.user.id, markercode);
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
