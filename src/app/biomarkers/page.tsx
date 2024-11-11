import { getResultsSummary } from "../../backend/results";
import { auth } from "@/auth";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return <>Unauthenticated</>;
  }

  const summary = await getResultsSummary(session.user.id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(summary).map(([markerId, results]) => {
          const lastResult = results[results.length - 1];

          return (
            <Card key={markerId}>
              <Link href={"/biomarkers/" + markerId}>
                <CardHeader>
                  <CardTitle>{markerId}</CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    {lastResult.value} {lastResult.unit}
                  </div>
                  <div className="leading-none text-muted-foreground">
                    {dayjs(results[results.length - 1].date).format(
                      "MMM D, YYYY"
                    )}
                  </div>
                </CardFooter>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
