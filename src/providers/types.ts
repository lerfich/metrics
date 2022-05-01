import { DateTime } from "luxon";

export type DatabaseContextValue = {
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
  tweets?: {
    id?: string;
    text?: string;
    author?: string;
    date?: DateTime | null;
  }[];
  tweetsCount?: number;
  generalStats?: {
    likes: number;
    comments: number;
    posts: number;
    reposts: number;
    general_coverage: number;
  };
}[];
