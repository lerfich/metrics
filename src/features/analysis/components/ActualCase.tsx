import { SavedCasesSpreadsheetHeadlines } from "features/collection/constants";
import React from "react";
import { Spreadsheet } from "shared/features/spreadsheet";
import { useParams } from "react-router-dom";
import { CaseNotFound } from "./CaseNotFound";

export const ActualCase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => console.log(id, "id"), [id]);

  return (
    <>
      {id === ":id" ? (
        <CaseNotFound />
      ) : (
        <Spreadsheet
          data={[]}
          headlines={SavedCasesSpreadsheetHeadlines}
          toolbarOptions={
            {
              // filters: MembersSpreadsheetFilters,
              // downloadHandler,
              // rawData: tableData?.membersFilterByZipRequest?.items ?? [],
            }
          }
          cellActions={[]}
          itemsCount={1 ?? 0}
          loading={false}
        />
      )}
    </>
  );
};
