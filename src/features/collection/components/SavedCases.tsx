import React, { useEffect } from "react";
import { observer } from "mobx-react";

import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
} from "shared/features/spreadsheet";
import { SavedCasesSpreadsheetHeadlines } from "../constants";
import { Box, Chip, CircularProgress, LinearProgress } from "@material-ui/core";
import { useSavedCases } from "../hooks/useSavedCases";
import { css, useTheme } from "@emotion/react";
import { Typography } from "shared/components/ui";
import { DatabaseType } from "providers/types";
import { CASE_STATUSES } from "shared/constants/status";
import { useSearchContext } from "shared/features/search";

const titleCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

const progressCss = (theme: any) => css`
  width: 50%;
  padding-top: ${theme.spacing(1)}px;
  border-radius: ${theme.spacing(1)}px;
  color: ${theme.palette.primary.main};
`;

const prevStatusCss = (theme: any) => css`
  color: ${theme.palette.muted};
  font-size: ${theme.typography.fontSize - 6}px;
`;

const SavedCases = () => {
  const { data: tableData, loading } = useSavedCases();
  const { searchQuery } = useSearchContext();
  useEffect(() => console.log(searchQuery, "sq"), [searchQuery]);
  const theme: any = useTheme();

  const switchChip = React.useCallback(
    (reportStatus: string) => {
      switch (reportStatus) {
        case CASE_STATUSES.crawling: {
          return {
            css: { backgroundColor: theme.palette.info.dark },
            label: "crawling",
          };
        }
        case CASE_STATUSES.sentiment: {
          return {
            css: { backgroundColor: theme.palette.warning.dark },
            label: "sentiment analysis",
          };
        }
        case CASE_STATUSES.ready: {
          return {
            css: { backgroundColor: theme.palette.success.main },
            label: "analysis is ready",
          };
        }
        case CASE_STATUSES.error: {
          return {
            css: { backgroundColor: theme.palette.error.light },
            label: "error",
          };
        }
        case CASE_STATUSES.waiting: {
          return {
            css: { backgroundColor: theme.palette.info.dark },
            label: "waiting to start",
          };
        }

        default: {
          return {
            css: { backgroundColor: theme.palette.error.light },
            label: "error",
          };
        }
      }
    },
    [
      theme.palette.error.light,
      theme.palette.info.dark,
      theme.palette.success.main,
      theme.palette.warning.dark,
    ]
  );

  const previousStatus = React.useCallback((status: string) => {
    switch (status) {
      case CASE_STATUSES.crawling: {
        return "";
      }
      case CASE_STATUSES.sentiment: {
        return "crawling";
      }
      case CASE_STATUSES.ready: {
        return "sentiment analysis";
      }
      case CASE_STATUSES.error: {
        return "sentiment analysis";
      }
      default:
        return "";
    }
  }, []);

  const statusPrettier = React.useCallback(
    (reportStatus: string) => (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Chip
          style={{ ...switchChip(reportStatus).css }}
          css={css`
            color: green;
          `}
          label={switchChip(reportStatus).label}
          size="medium"
        />
        <Typography css={prevStatusCss}>
          {previousStatus(reportStatus)}
        </Typography>
      </Box>
    ),
    [previousStatus, switchChip]
  );

  const downloadHandler = React.useCallback((toolbarData: DatabaseType[]) => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data: toolbarData.map(({ title, progress, status }: any) => ({
          title: title ?? "Title not found",
          progress: progress ?? "Progress not found",
          status: status ?? "Status not found",
        })),
        titles: ["Title", "Progress", "Status"],
      }),
      "Saved cases"
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
            <Box
              display="flex"
              justifyContent="start"
              width={"100%"}
              alignItems="center"
            >
              <LinearProgress
                variant="determinate"
                value={progress && progress * 100}
                css={progressCss}
              />
              {status !== CASE_STATUSES.error &&
                status !== CASE_STATUSES.ready &&
                status !== CASE_STATUSES.waiting && (
                  <Box ml={1.5}>
                    <CircularProgress variant="indeterminate" />
                  </Box>
                )}
            </Box>
          </Box>
        ),
        status: statusPrettier(status ?? ""),
      })) || [],
    [statusPrettier, tableData]
  );

  return (
    <Box width={"100%"}>
      <Spreadsheet
        data={savedCases}
        headlines={SavedCasesSpreadsheetHeadlines}
        toolbarOptions={{
          shouldRedirectToCase: true,
          withDownload: true,
          withSearch: true,
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
