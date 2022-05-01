import { DateTime } from "luxon";

export interface ActualCaseContentInput {
  tweets?: {
    id?: string;
    text?: string;
    author?: string;
    date?: DateTime;
  }[];
  tweetsCount?: number;
  generalStats?: {
    likes?: number;
    comments?: number;
    posts?: number;
    reposts?: number;
    general_coverage?: number;
  };
  dateFilter?: {
    startDate?: DateTime;
    endDate?: DateTime;
  };
  tags?: string[];
  filters?: string[];
}

// export interface ActualCaseSidebarInput {}
