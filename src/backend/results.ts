import { Result } from "../types";
import { pool } from "./services/db/db";
import { groupBy } from "lodash-es";
import type { Dictionary } from "lodash";

export const getResultsSummary = async (
  userId: string
): Promise<Dictionary<Result[]>> => {
  const rows = await getMarkerResults(userId);

  return groupBy(rows, "marker_id");
};

export const getMarkerResults = async (
  userId: string,
  markerId?: string
): Promise<Result[]> => {
  const qeuryResults = await pool.query<Result>(
    `SELECT results.id as id, markers.id as marker_id, value, date, abnormal, markers.default_title as title, units.id as unit 
      FROM results 
      LEFT JOIN markers ON markers.id = results.marker_id
      LEFT JOIN units ON units.id = markers.default_unit_id
      WHERE results.user_id = $1
       AND ($2::text IS NULL OR markers.id = $2::text)`,
    [userId, markerId]
  );
  return qeuryResults.rows;
};
