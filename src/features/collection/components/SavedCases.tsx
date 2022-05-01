import React from "react";
import { observer } from "mobx-react";

import {
  Spreadsheet,
  useSpreadsheetContext,
} from "shared/features/spreadsheet";
import { SavedCasesSpreadsheetHeadlines } from "../constants";
import { useHistory } from "react-router-dom";
import { APP_URL } from "shared/components/navigation/constants";
import { buildUrl } from "shared/routes/routerUtils";
import { Box, LinearProgress } from "@material-ui/core";
import { useSavedCases } from "../hooks/useSavedCases";
import { css } from "@emotion/react";
import { Typography } from "shared/components/ui";

const titleCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

const progressCss = (theme: any) => css`
  width: 50%;
  padding-top: ${theme.spacing(1)}px;
  border-radius: ${theme.spacing(1)}px;
  color: ${theme.palette.primary.main};
`;

const statusCss = (theme: any) => css`
  color: ${theme.palette.warning.light};
`;

const SavedCases = () => {
  const { currentRowId } = useSpreadsheetContext();
  const history = useHistory();
  React.useEffect(
    () => console.log(currentRowId, "id u clicked in saved"),
    [currentRowId]
  );
  const onDetailsClick = React.useCallback(() => {
    const url = buildUrl(APP_URL.actualCase, {
      pathParams: { id: 2 },
    });
    history.push(url);
  }, [history]);

  const { data: tableData, loading } = useSavedCases();

  const savedCases = React.useMemo(
    () =>
      tableData?.map(({ id, title, progress, status }) => ({
        id: id ?? "",
        title: (
          <Typography variant="subtitle5" css={titleCss}>
            {title}
          </Typography>
        ),
        progress: (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
          >
            <Box ml={15}>
              <Typography variant="subtitle6" css={progressCss}>
                {progress && progress * 100}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress && progress * 100}
              css={progressCss}
            />
          </Box>
        ),
        status: (
          <Typography variant="subtitle5" css={statusCss}>
            {status}
          </Typography>
        ),
      })) || [],
    [tableData]
  );

  return (
    <Box onClick={onDetailsClick} width={"100%"}>
      <Spreadsheet
        data={savedCases}
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
        loading={loading}
      />
    </Box>
  );
};

export default observer(SavedCases);
