"use client";

import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Result } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  code: string;
  results: Result[];
};

export function BiomarkerSummary({ code, results }: Props) {
  const lastResult = results[results.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={"/biomarkers/" + code}>{code}</Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {lastResult.value} {lastResult.unit}
        </div>
        <div className="leading-none text-muted-foreground">
          {dayjs(results[results.length - 1].date).format("MMM D, YYYY")}
        </div>
      </CardFooter>
    </Card>
  );
}
