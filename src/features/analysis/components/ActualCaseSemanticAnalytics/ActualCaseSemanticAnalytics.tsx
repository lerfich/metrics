import { css, useTheme } from "@emotion/react";
import { MenuItem, Box, Chip } from "@material-ui/core";
import { SemanticWordType } from "providers/types";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Modal, Select, Typography } from "shared/components/ui";
import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
  useSpreadsheetContext,
} from "shared/features/spreadsheet";
import { SemanticAnalysisTopHeadlines, SEMANTIC_WORD_TOP } from "./constants";
import { WordProfile } from "./WordProfile";

const topCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

export const ActualCaseSemanticAnalytics = () => {
  const theme: any = useTheme();
  const { positiveSemanticWords, neutralSemanticWords, negativeSemanticWords } =
    useDatabaseContext();
  const [sortType, setSortType] = React.useState(
    Object.keys(SEMANTIC_WORD_TOP)[0]
  );
  const { currentRowId } = useSpreadsheetContext();
  const onChangeSort = React.useCallback(
    (e) => setSortType(e.target.value),
    [setSortType]
  );

  const switchSpreadsheetData = React.useCallback(
    (sortType) => {
      switch (sortType) {
        case Object.keys(SEMANTIC_WORD_TOP)[0]: {
          return positiveSemanticWords;
        }
        case Object.keys(SEMANTIC_WORD_TOP)[1]: {
          return negativeSemanticWords;
        }
        case Object.keys(SEMANTIC_WORD_TOP)[2]: {
          return neutralSemanticWords;
        }
        default: {
          return positiveSemanticWords;
        }
      }
    },
    [negativeSemanticWords, neutralSemanticWords, positiveSemanticWords]
  );

  const switchCountColor = React.useCallback(
    (sortType) => {
      switch (sortType) {
        case Object.keys(SEMANTIC_WORD_TOP)[0]: {
          return theme.palette.success.light;
        }
        case Object.keys(SEMANTIC_WORD_TOP)[1]: {
          return theme.palette.error.light;
        }
        case Object.keys(SEMANTIC_WORD_TOP)[2]: {
          return theme.palette.info.light;
        }
        default: {
          return theme.palette.success.light;
        }
      }
    },
    [
      theme.palette.error.light,
      theme.palette.info.light,
      theme.palette.success.light,
    ]
  );

  const compareWordsImportance = React.useCallback(
    (a: SemanticWordType, b: SemanticWordType) => b.timesMeet - a.timesMeet,
    []
  );

  const wordsData = React.useMemo(
    () =>
      switchSpreadsheetData(sortType)
        ?.sort(compareWordsImportance)
        ?.map(({ wordId, word, timesMeet }) => ({
          id: wordId.toString(),
          word: (
            <Typography
              variant="subtitle5"
              style={{ color: switchCountColor(sortType) }}
            >
              {word}
            </Typography>
          ),
          timesMeet: (
            <Chip
              label={timesMeet}
              style={{ backgroundColor: switchCountColor(sortType) }}
            />
          ),
        })) ?? [],
    [compareWordsImportance, sortType, switchCountColor, switchSpreadsheetData]
  );

  React.useEffect(
    () => console.log("u showing that..", wordsData),
    [wordsData]
  );

  const downloadHandler = React.useCallback(
    (toolbarData: SemanticWordType[]) => {
      downloadCsv(
        formatDataToCsv({
          type: "object-array",
          data: toolbarData.map(
            ({ wordId, word, timesMeet }: SemanticWordType) => ({
              word: word || "Word not found",
              timesMeet,
            })
          ),
          titles: ["word", `${sortType} usage count`],
        }),
        "Semantic Analysis Table"
      );
    },
    [sortType]
  );

  const [isWordProfileVisible, setIsWordProfileVisible] = React.useState(false);

  const { onWordProfileOpen, onWordProfileClose } = React.useMemo(
    () => ({
      onWordProfileOpen: () => setIsWordProfileVisible(true),
      onWordProfileClose: () => setIsWordProfileVisible(false),
    }),
    []
  );

  return (
    <Box display="grid" gridTemplateColumns="auto">
      <Modal
        isVisibleDivider
        titleProps={{ title: "Word Analysis" }}
        dialogProps={{
          open: isWordProfileVisible,
          onClose: onWordProfileClose,
        }}
      >
        <WordProfile
          wordId={currentRowId}
          onModalClose={onWordProfileClose}
          sortType={sortType}
        />
      </Modal>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="subtitle2" css={topCss}>
          Semantic Analysis TOP
        </Typography>
        <Box display="grid" gridTemplateColumns="auto" ml={1} mt={0}>
          <Select
            value={sortType}
            onChange={onChangeSort}
            size="medium"
            disableUnderline
            css={css`
              height: 55px;
            `}
            labelWidth={150}
          >
            {Object.entries(SEMANTIC_WORD_TOP).map((entry) => (
              <MenuItem key={entry[0]} value={entry[0]}>
                <Typography variant="subtitle5">{entry[1]}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Spreadsheet
        data={wordsData}
        headlines={SemanticAnalysisTopHeadlines(sortType)}
        toolbarOptions={{
          withDownload: true,
          downloadHandler,
          rawData:
            switchSpreadsheetData(sortType)?.sort(compareWordsImportance) ?? [],
          shouldOpenModal: onWordProfileOpen,
        }}
        cellActions={[]}
        itemsCount={switchSpreadsheetData(sortType)?.length ?? 0}
        loading={false}
      />
    </Box>
  );
};
