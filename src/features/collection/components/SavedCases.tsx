import React from "react";
import { observer } from "mobx-react";

import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
  useSpreadsheetContext,
} from "shared/features/spreadsheet";
import { SavedCasesSpreadsheetHeadlines } from "../constants";
import { Box, LinearProgress } from "@material-ui/core";
import { useSavedCases } from "../hooks/useSavedCases";
import { css } from "@emotion/react";
import { Typography } from "shared/components/ui";
import { DatabaseType } from "providers/types";

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
  const { data: tableData, loading } = useSavedCases();

  const downloadHandler = React.useCallback((toolbarData: DatabaseType[]) => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data: toolbarData.map(({ title, progress, status }: any) => ({
          title: title ?? "Название не найдено",
          progress: progress ?? "Прогресс не найден",
          status: status ?? "Статус не найден",
        })),
        titles: ["Название", "Прогресс", "Статус"],
      }),
      "Сохраненные кейсы"
    );
  }, []);

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
    <Box width={"100%"}>
      <Spreadsheet
        data={savedCases}
        headlines={SavedCasesSpreadsheetHeadlines}
        toolbarOptions={{
          shouldRedirect: true,
          withDownload: true,
          downloadHandler,
          rawData: tableData ?? [],
        }}
        cellActions={[]}
        itemsCount={1 ?? 0}
        loading={loading}
      />
    </Box>
  );
};

export default observer(SavedCases);
