import { RowDataPacket } from "mysql2";

export type Result = {
  id: number;
  test_code: string;
  value: string;
  date: Date;
  document_id?: string;
  abnormal: boolean;
  note?: string;
  created_at: Date;
  deleted_at?: Date;
  unit?: string;
  title?: string;
} & RowDataPacket;
