import { Result } from "../types";
import { pool } from "./services/db/db";
import { groupBy } from "lodash-es";
import type { Dictionary } from "lodash";

export const getResultsSummary = async (): Promise<Dictionary<Result[]>> => {
  const [rows, fields] = await pool.query<
    Result[]
  >(`SELECT results.id as id, results.code as code, value, date, abnormal, markers.default_title as title, units.title as unit 
FROM results 
LEFT JOIN markers ON markers.code = results.code
LEFT JOIN units ON units.id = markers.default_unit_id;`);

  return groupBy(rows, "code");
};

export const getMarkerResults = async (code: string): Promise<Result[]> => {
  const [rows, fields] = await pool.query<Result[]>(
    `SELECT results.id as id, results.code as code, value, date, abnormal, markers.default_title as title, units.title as unit 
FROM results 
LEFT JOIN markers ON markers.code = results.code
LEFT JOIN units ON units.id = markers.default_unit_id
WHERE results.code = ?`,
    [code]
  );
  return rows;
};
