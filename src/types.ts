export type Result = {
  id: number;
  marker_id: number;
  code: string;
  value: string;
  date: Date;
  abnormal: boolean;
  unit?: string;
  title?: string;
};
