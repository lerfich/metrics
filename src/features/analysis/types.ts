import { DateTime } from "luxon";
import { Dispatch, SetStateAction } from "react";

export interface ActualCaseContentInput {
  tweets?: {
    id?: string;
    text?: string;
    author?: string;
    date?: DateTime | null;
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
    startDate?: DateTime | null;
    endDate?: DateTime | null;
  };
  tags?: string[];
  filters?: string[];
  socialFilter?: {
    [x: string]: boolean;
  };
  onChangeFilter?: (e: any, name: any) => void;
  isShowingCheckbox?: boolean;
  setIsShowingCheckbox?: React.Dispatch<React.SetStateAction<boolean>>;
}
