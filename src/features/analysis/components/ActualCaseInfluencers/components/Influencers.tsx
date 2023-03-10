import { css } from "@emotion/react";
import { MenuItem, Box, Chip } from "@material-ui/core";
import { InfluencerType, User } from "providers/types";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Modal, Select, Typography } from "shared/components/ui";
import { useSearchContext } from "shared/features/search";
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
  const { searchQuery } = useSearchContext();
  const { influencers, parsedData } = useDatabaseContext();
  const { pageSize, page } = useSpreadsheetContext();
  const [sortType, setSortType] = React.useState(Object.keys(SORT_TYPES)[0]);
  const { currentRowId } = useSpreadsheetContext();
  const onChangeSort = React.useCallback(
    (e) => setSortType(e.target.value),
    [setSortType]
  );

  const switchCount = React.useCallback(
    (friends: number, favourites: number, followers: number) => {
      switch (sortType) {
        case Object.keys(SORT_TYPES)[0]: {
          return friends.toString();
        }
        case Object.keys(SORT_TYPES)[1]: {
          return favourites.toString();
        }
        case Object.keys(SORT_TYPES)[2]: {
          return followers.toString();
        }
        // case Object.keys(SORT_TYPES)[3]: {
        //   return involved.toString();
        // }
        default: {
          return friends.toString();
        }
      }
    },
    [sortType]
  );

  const switchCountType = React.useMemo(() => {
    switch (sortType) {
      case Object.keys(SORT_TYPES)[0]: {
        return "Friends";
      }
      case Object.keys(SORT_TYPES)[1]: {
        return "Favourites";
      }
      case Object.keys(SORT_TYPES)[2]: {
        return "Followers";
      }
      // case Object.keys(SORT_TYPES)[3]: {
      //   return "Involved";
      // }
      default: {
        return "Friends";
      }
    }
  }, [sortType]);

  const compareInfluencers = React.useCallback(
    (a: User, b: User) => {
      switch (sortType) {
        case Object.keys(SORT_TYPES)[0]: {
          return b.friends_count - a.friends_count;
        }
        case Object.keys(SORT_TYPES)[1]: {
          return b.favourites_count - a.favourites_count;
        }
        case Object.keys(SORT_TYPES)[2]: {
          return b.followers_count - a.followers_count;
        }
        // case Object.keys(SORT_TYPES)[3]: {
        //   return b.involved - a.involved;
        // }
        default: {
          return b.friends_count - a.friends_count;
        }
      }
    },
    [sortType]
  );

  const { tweets: parsedTweets, users: parsedUsers } =
    parsedData?.globalObjects ?? {};

  const foundInfluencers = React.useMemo(
    () =>
      parsedUsers
        ?.sort(compareInfluencers)
        .map(
          ({
            id_str,
            name,
            friends_count,
            favourites_count,
            followers_count,
          }) => ({
            id: id_str || "",
            userId: id_str || "ID не найдено",
            user: name || "Имя пользователя не найдено",
            count: (
              <Chip
                label={switchCount(
                  friends_count,
                  favourites_count,
                  followers_count
                )}
                color="primary"
              />
            ),
          })
        ) ?? [],
    [compareInfluencers, parsedUsers, switchCount]
  );

  const startPageSlice = (page - 1) * pageSize;
  const endPageSlice = page * pageSize;

  const searchedInfluencers = !searchQuery.length
    ? foundInfluencers.slice(startPageSlice, endPageSlice)
    : foundInfluencers
        ?.filter(({ user }) => user.includes(searchQuery))
        .slice(startPageSlice, endPageSlice);

  const searchedInfluencersCounts = !searchQuery.length
    ? foundInfluencers.length
    : foundInfluencers?.filter(({ user }) => user.includes(searchQuery)).length;

  const downloadHandler = React.useCallback(
    (toolbarData: User[]) => {
      downloadCsv(
        formatDataToCsv({
          type: "object-array",
          data: toolbarData.map(
            ({
              id_str,
              name,
              friends_count,
              favourites_count,
              followers_count,
            }: User) => ({
              userId: id_str || "ID не найдено",
              user: name || "Имя пользователя не найдено",
              count: switchCount(
                friends_count,
                favourites_count,
                followers_count
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
        data={searchedInfluencers}
        headlines={InfluencersSpreadsheetHeadlines(switchCountType)}
        toolbarOptions={{
          withDownload: true,
          withSearch: true,
          showTotalCount: true,
          withPerPage: true,
          downloadHandler,
          rawData: parsedUsers?.sort(compareInfluencers) ?? [],
          shouldOpenModal: onInfluencerProfileOpen,
        }}
        cellActions={[]}
        itemsCount={searchedInfluencersCounts}
        loading={false}
      />
    </Box>
  );
};
