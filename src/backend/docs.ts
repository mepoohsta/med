import { Doc } from "@/types";
import { pool } from "./services/db/db";

export const getDocs = async (userId: string): Promise<Doc[]> => {
  const qeuryResults = await pool.query<Doc>(
    `SELECT id, url, title, date
        FROM docs
        WHERE user_id = $1;
    `,
    [userId]
  );
  return qeuryResults.rows;
};
