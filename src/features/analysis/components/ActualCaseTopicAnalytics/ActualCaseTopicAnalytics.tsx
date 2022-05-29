import { Box, Chip, useTheme } from "@material-ui/core";
import { TopicAnalysis } from "providers/types";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Chart, Modal, Select, Typography } from "shared/components/ui";
import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
  useSpreadsheetContext,
} from "shared/features/spreadsheet";
import { ActualTopicStats } from "./ActualTopicStats";
import { topicAnalysisHeadlines } from "./constants";

export const ActualCaseTopicAnalytics = () => {
  const theme: any = useTheme();
  const { topicAnalysis } = useDatabaseContext();
  const { currentRowId } = useSpreadsheetContext();
  const [isTopicProfileVisible, setIsTopicProfileVisible] =
    React.useState(false);
  const { onTopicProfileOpen, onTopicProfileClose } = React.useMemo(
    () => ({
      onTopicProfileOpen: () => setIsTopicProfileVisible(true),
      onTopicProfileClose: () => setIsTopicProfileVisible(false),
    }),
    []
  );

  const topicData = React.useMemo(
    () =>
      topicAnalysis.map(({ id, title }) => ({
        id: id.toString(),
        name: (
          <Chip
            style={{
              color: theme.palette.success.dark,
            }}
            label={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={1.5}
              >
                <Typography variant="subtitle4" color="inherit">
                  {title}
                </Typography>
              </Box>
            }
          ></Chip>
        ),
      })),
    [theme, topicAnalysis]
  );

  const downloadHandler = React.useCallback((toolbarData: TopicAnalysis[]) => {
    downloadCsv(
      formatDataToCsv({
        type: "object-array",
        data: toolbarData.map(({ id, title }: TopicAnalysis) => ({
          id,
          title,
        })),
        titles: ["ID", `Topic Name`],
      }),
      "Semantic Analysis Table"
    );
  }, []);

  return (
    <Box display="grid" gridTemplateColumns="auto">
      <Modal
        isVisibleDivider
        titleProps={{ title: "Topic Analysis" }}
        dialogProps={{
          open: isTopicProfileVisible,
          onClose: onTopicProfileClose,
        }}
      >
        <ActualTopicStats
          topicId={currentRowId}
          onModalClose={onTopicProfileClose}
        />
      </Modal>
      <Spreadsheet
        data={topicData}
        headlines={topicAnalysisHeadlines}
        toolbarOptions={{
          withDownload: true,
          downloadHandler,
          rawData: topicAnalysis ?? [],
          shouldOpenModal: onTopicProfileOpen,
        }}
        cellActions={[]}
        itemsCount={topicAnalysis?.length ?? 0}
        loading={false}
      />
    </Box>
  );
};
