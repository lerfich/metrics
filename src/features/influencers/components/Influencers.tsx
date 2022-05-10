import { css } from "@emotion/react";
import { MenuItem, Box, Chip } from "@material-ui/core";
import { InfluencerType, TweetsType } from "providers/types";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Select, Typography } from "shared/components/ui";
import {
  downloadCsv,
  formatDataToCsv,
  Spreadsheet,
} from "shared/features/spreadsheet";
import { InfluencersSpreadsheetHeadlines, SORT_TYPES } from "../constants";

const topCss = (theme: any) => css`
  color: ${theme.palette.success.light};
`;

export const Influencers = () => {
  const { influencers } = useDatabaseContext();
  const [sortType, setSortType] = React.useState(Object.keys(SORT_TYPES)[0]);

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
        return "Лайков";
      }
      case Object.keys(SORT_TYPES)[1]: {
        return "Постов";
      }
      case Object.keys(SORT_TYPES)[2]: {
        return "Репостов";
      }
      case Object.keys(SORT_TYPES)[3]: {
        return "Вовлечено";
      }
      default: {
        return "Лайков";
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
        "Топ инфлюенсеров"
      );
    },
    [switchCount, switchCountType]
  );

  return (
    <Box display="grid" gridTemplateColumns="auto">
      <Box pt={5} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="subtitle2" css={topCss}>
          ТОП Инфлюенсеров
        </Typography>
      </Box>
      <Box m={3} display="grid" gridTemplateColumns="auto">
        <Select
          variant="outlined"
          label="Выберите тип сортировки"
          value={sortType}
          onChange={onChangeSort}
          size="small"
        >
          {Object.entries(SORT_TYPES).map((entry) => (
            <MenuItem key={entry[0]} value={entry[0]}>
              <Typography>{entry[1]}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Spreadsheet
        data={foundInfluencers}
        headlines={InfluencersSpreadsheetHeadlines(switchCountType)}
        toolbarOptions={{
          withDownload: true,
          downloadHandler,
          rawData: influencers?.sort(compareInfluencers) ?? [],
          showTotalCount: true,
          shouldRedirectToUser: true,
        }}
        cellActions={[]}
        itemsCount={influencers?.length ?? 0}
        loading={false}
      />
    </Box>
  );
};
