import React from "react";

import { ActualCaseSpreadsheetHeadlines } from "../../constants";
import { Spreadsheet } from "shared/features/spreadsheet";
import { ActualCaseContentInput } from "features/analysis/types";

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

  return (
    <Spreadsheet
      data={foundTweets}
      headlines={ActualCaseSpreadsheetHeadlines}
      toolbarOptions={{
        // filters: MembersSpreadsheetFilters,
        // downloadHandler,
        // rawData: tableData?.membersFilterByZipRequest?.items ?? [],
        showTotalCount: true,
      }}
      cellActions={[]}
      itemsCount={tweetsCount ?? 0}
      loading={false}
    />
  );
};
