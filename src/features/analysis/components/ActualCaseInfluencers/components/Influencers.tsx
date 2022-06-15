import { css } from "@emotion/react";
import { MenuItem, Box, Chip } from "@material-ui/core";
import { InfluencerType } from "providers/types";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Modal, Select, Typography } from "shared/components/ui";
import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
  useSpreadsheetContext,
} from "shared/features/spreadsheet";
import { InfluencersSpreadsheetHeadlines, SORT_TYPES } from "../constants";
import { InfluencerProfile } from "./InfluencerProfile";

const topCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

const sortTopCss = (theme: any) => css`
  color: ${theme.palette.warning.dark};
`;

export const Influencers = () => {
  const { influencers } = useDatabaseContext();
  const [sortType, setSortType] = React.useState(Object.keys(SORT_TYPES)[0]);
  const { currentRowId } = useSpreadsheetContext();
  const onChangeSort = React.useCallback(
    (e) => setSortType(e.target.value),
    [setSortType]
  );

  const switchCount = React.useCallback(
    (likes: number, tweets: number, reposts: number, involved: number) => {
      switch (sortType) {
        case Object.keys(SORT_TYPES)[0]: {
          return likes.toString();
        }
        case Object.keys(SORT_TYPES)[1]: {
          return tweets.toString();
        }
        case Object.keys(SORT_TYPES)[2]: {
          return reposts.toString();
        }
        case Object.keys(SORT_TYPES)[3]: {
          return involved.toString();
        }
        default: {
          return likes.toString();
        }
      }
    },
    [sortType]
  );

  const switchCountType = React.useMemo(() => {
    switch (sortType) {
      case Object.keys(SORT_TYPES)[0]: {
        return "Likes";
      }
      case Object.keys(SORT_TYPES)[1]: {
        return "Posts";
      }
      case Object.keys(SORT_TYPES)[2]: {
        return "Reposts";
      }
      case Object.keys(SORT_TYPES)[3]: {
        return "Involved";
      }
      default: {
        return "Likes";
      }
    }
  }, [sortType]);

  const compareInfluencers = React.useCallback(
    (a: InfluencerType, b: InfluencerType) => {
      switch (sortType) {
        case Object.keys(SORT_TYPES)[0]: {
          return b.likesCount - a.likesCount;
        }
        case Object.keys(SORT_TYPES)[1]: {
          return b.tweetsCount - a.tweetsCount;
        }
        case Object.keys(SORT_TYPES)[2]: {
          return b.repostsCount - a.repostsCount;
        }
        case Object.keys(SORT_TYPES)[3]: {
          return b.involved - a.involved;
        }
        default: {
          return b.likesCount - a.likesCount;
        }
      }
    },
    [sortType]
  );

  const foundInfluencers = React.useMemo(
    () =>
      influencers
        ?.sort(compareInfluencers)
        .map(
          ({
            userId,
            user,
            likesCount,
            tweetsCount,
            repostsCount,
            involved,
          }) => ({
            id: userId.toString() || "",
            userId: userId.toString() || "ID не найдено",
            user: user || "Имя пользователя не найдено",
            count: (
              <Chip
                label={switchCount(
                  likesCount,
                  tweetsCount,
                  repostsCount,
                  involved
                )}
                color="primary"
              />
            ),
          })
        ) ?? [],
    [compareInfluencers, influencers, switchCount]
  );

  const downloadHandler = React.useCallback(
    (toolbarData: InfluencerType[]) => {
      downloadCsv(
        formatDataToCsv({
          type: "object-array",
          data: toolbarData.map(
            ({
              userId,
              user,
              likesCount,
              tweetsCount,
              repostsCount,
              involved,
            }: InfluencerType) => ({
              userId: userId.toString() || "ID не найдено",
              user: user || "Имя пользователя не найдено",
              count: switchCount(
                likesCount,
                tweetsCount,
                repostsCount,
                involved
              ),
            })
          ),
          titles: [
            "ID пользователя",
            "Имя и фамилия",
            `Количество ${switchCountType}`,
          ],
        }),
        "Influencers TOP"
      );
    },
    [switchCount, switchCountType]
  );

  const [isInfluencerProfileVisible, setIsInfluencerProfileVisible] =
    React.useState(false);

  const { onInfluencerProfileOpen, onInfluencerProfileClose } = React.useMemo(
    () => ({
      onInfluencerProfileOpen: () => setIsInfluencerProfileVisible(true),
      onInfluencerProfileClose: () => setIsInfluencerProfileVisible(false),
    }),
    []
  );

  return (
    <Box display="grid" gridTemplateColumns="auto">
      <Modal
        isVisibleDivider
        titleProps={{ title: "Influencer profile" }}
        dialogProps={{
          open: isInfluencerProfileVisible,
          onClose: onInfluencerProfileClose,
        }}
      >
        <InfluencerProfile
          userId={currentRowId}
          onModalClose={onInfluencerProfileClose}
        />
      </Modal>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="subtitle2" css={topCss}>
          Influencers TOP
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
            {Object.entries(SORT_TYPES).map((entry) => (
              <MenuItem key={entry[0]} value={entry[0]}>
                <Typography variant="subtitle5" css={sortTopCss}>
                  {entry[1]}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Spreadsheet
        data={foundInfluencers}
        headlines={InfluencersSpreadsheetHeadlines(switchCountType)}
        toolbarOptions={{
          withDownload: true,
          downloadHandler,
          rawData: influencers?.sort(compareInfluencers) ?? [],
          shouldOpenModal: onInfluencerProfileOpen,
        }}
        cellActions={[]}
        itemsCount={influencers?.length ?? 0}
        loading={false}
      />
    </Box>
  );
};
