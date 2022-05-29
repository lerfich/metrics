import React from "react";

import { ActualCaseSpreadsheetHeadlines } from "../../constants";
import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
} from "shared/features/spreadsheet";
import { ActualCaseContentInput } from "features/analysis/types";
import { TweetsType } from "providers/types";

const MAX_TEXT_LENGTH = 20;

export const ActualCaseContentSpreadsheet = ({
  tweets,
  tweetsCount,
}: ActualCaseContentInput) => {
  const foundTweets = React.useMemo(
    () =>
      tweets?.map(({ id, date, text, author }) => ({
        id: id || "",
        tweetId: id || "ID не найден",
        date: date?.toFormat("D"),
        user: author,
        text:
          text && text?.length > MAX_TEXT_LENGTH
            ? text?.slice(0, MAX_TEXT_LENGTH) + "..."
            : text || "Текст не найден",
      })) ?? [],
    [tweets]
  );

  console.log(tweets, "tweets");

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
      data={foundTweets}
      headlines={ActualCaseSpreadsheetHeadlines}
      toolbarOptions={{
        withDownload: true,
        downloadHandler,
        rawData: tweets ?? [],
        showTotalCount: true,
      }}
      cellActions={[]}
      itemsCount={tweetsCount ?? 0}
      loading={false}
    />
  );
};
