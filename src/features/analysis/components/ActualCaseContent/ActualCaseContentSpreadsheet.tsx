import React, { useEffect } from "react";

import { ActualCaseSpreadsheetHeadlines } from "../../constants";
import { DateTime } from "luxon";
import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
  useSpreadsheetContext,
} from "shared/features/spreadsheet";
import { ActualCaseContentInput } from "features/analysis/types";
import { TweetsType } from "providers/types";
import { useDatabaseContext } from "providers/useDatabaseContext";
import { useSearchContext } from "shared/features/search";

const MAX_TEXT_LENGTH = 20;

const parseDate = (date?: string) =>
  DateTime.fromJSDate(new Date(date ?? "")).toFormat("D");

export const ActualCaseContentSpreadsheet = ({
  tweets,
  tweetsCount,
}: ActualCaseContentInput) => {
  const { searchQuery } = useSearchContext();
  const { pageSize, page } = useSpreadsheetContext();

  const { parsedData } = useDatabaseContext();

  const { tweets: parsedTweets, users: parsedUsers } =
    parsedData?.globalObjects ?? {};

  console.log(parsedUsers, "eh?", parsedTweets);

  const foundTweets = React.useMemo(
    () =>
      parsedTweets?.map(({ created_at, full_text, id_str, user_id }) => ({
        id: id_str || "",
        tweetId: id_str || "ID не найден",
        date: parseDate(created_at),
        user:
          parsedUsers?.find(({ id }) => id === user_id)?.name ?? "Not found",
        text:
          full_text && full_text?.length > MAX_TEXT_LENGTH
            ? full_text?.slice(0, MAX_TEXT_LENGTH) + "..."
            : full_text || "Текст не найден",
      })) ?? [],
    [parsedTweets, parsedUsers]
  );

  const startPageSlice = (page - 1) * pageSize;
  const endPageSlice = page * pageSize;

  const searchedTweets = !searchQuery.length
    ? foundTweets.slice(startPageSlice, endPageSlice)
    : foundTweets
        ?.filter(
          ({ text, user }) =>
            text.includes(searchQuery) || user.includes(searchQuery)
        )
        .slice(startPageSlice, endPageSlice);

  const searchedTweetsCounts = !searchQuery.length
    ? foundTweets.length
    : foundTweets?.filter(
        ({ text, user }) =>
          text.includes(searchQuery) || user.includes(searchQuery)
      ).length;

  const downloadHandler = React.useCallback((toolbarData: TweetsType) => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data: toolbarData.map(({ id, date, text, author }: TweetsType[0]) => ({
          id,
          date: date?.toFormat("DD"),
          text,
          author,
        })),
        titles: ["ID", "Date", "Text", "Author"],
      }),
      "Posts Table"
    );
  }, []);

  return (
    <Spreadsheet
      data={searchedTweets}
      headlines={ActualCaseSpreadsheetHeadlines}
      toolbarOptions={{
        withDownload: true,
        downloadHandler,
        rawData: searchedTweets,
        withPerPage: true,
        showTotalCount: true,
        withSearch: true,
      }}
      cellActions={[]}
      itemsCount={searchedTweetsCounts}
      loading={false}
    />
  );
};
