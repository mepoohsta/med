import { auth } from "@/auth";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import Link from "next/link";
import { getDocs } from "@/backend/docs";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return <>Unauthenticated</>;
  }

  const docs = await getDocs(session.user.id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid grid-cols-4 gap-4">
        {docs.map(({ id, url, title, date }) => {
          return (
            <Card key={id}>
              <Link href={url} target="_blank">
                <CardHeader>
                  <CardTitle>{title ?? "Untitled"}</CardTitle>
                </CardHeader>
                {date && (
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                      {dayjs(date).format("MMM D, YYYY")}
                    </div>
                  </CardFooter>
                )}
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
