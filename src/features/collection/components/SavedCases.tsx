import React from "react";
import { observer } from "mobx-react";

import { Spreadsheet } from "shared/features/spreadsheet";
import { SavedCasesSpreadsheetHeadlines } from "../constants";
import { useHistory } from "react-router-dom";
import { APP_URL } from "shared/components/navigation/constants";
import { buildUrl } from "shared/routes/routerUtils";
import { Box } from "@material-ui/core";

const SavedCases = () => {
  const history = useHistory();
  const onDetailsClick = React.useCallback(() => {
    const url = buildUrl(APP_URL.actualCase, {
      pathParams: { id: "XDXD" },
    });
    history.push(url);
  }, [history]);

  return (
    <Box onClick={onDetailsClick} width={"100%"}>
      <Spreadsheet
        data={[
          {
            id: "xxx",
            title: "HEY",
            progress: "90%",
            status: "LMAO FINISHED. IDIOT LOST",
          },
        ]}
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
    </Box>
  );
};

export default observer(SavedCases);
