import { DateTime } from "luxon";

export type TweetsType = {
  id?: string;
  text?: string;
  author?: string;
  date?: DateTime | null;
}[];

export type GeneralStatsType = {
  likes: number;
  comments: number;
  posts: number;
  reposts: number;
  general_coverage: number;
};

export type DatabaseType = {
  id?: string;
  title?: string;
  status?: string;
  progress?: number;
  dateFilter?: {
    startDate?: DateTime | null;
    endDate?: DateTime | null;
  };
  filters: string[];
  tags: string[];
  tweets?: TweetsType;
  tweetsCount?: number;
  generalStats?: GeneralStatsType;
};

export type DatabaseContextValue = {
  database: DatabaseType[];
  setDatabase: React.Dispatch<React.SetStateAction<DatabaseType[]>>;
};
