export type Result = {
  id: number;
  marker_id: string;
  value: string;
  date: Date;
  abnormal: boolean;
  unit?: string;
  title?: string;
};

export type Doc = {
  id: string;
  url: string;
  title?: string;
  date?: string;
};
