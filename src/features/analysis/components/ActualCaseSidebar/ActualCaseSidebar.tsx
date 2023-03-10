import { css } from "@emotion/react";
import {
  Box,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ActualCaseContentInput } from "features/analysis/types";
import { DateTime } from "luxon";
import { useDatabaseContext } from "providers/useDatabaseContext";
import { PaperLayout } from "shared/components/layouts/PaperLayout";
import { Typography } from "shared/components/ui";

const datePeriodCss = (theme: any) => css`
  color: ${theme.palette.background.lightBlue};
`;

const MAX_TAGS_LENGTH_SHOW = 8;
const MAX_FILTERS_LENGTH_SHOW = 5;

const parseDate = (date?: string) =>
  DateTime.fromJSDate(new Date(date ?? "")).toFormat("D");

const parseDateToLuxon = (date?: string) =>
  DateTime.fromJSDate(new Date(date ?? ""));

export const ActualCaseSidebar: React.FC<ActualCaseContentInput> = ({
  dateFilter,
  tags,
  filters,
  socialFilter,
  onChangeFilter,
  isShowingCheckbox,
}) => {
  const { parsedData } = useDatabaseContext();

  const { tweets } = parsedData?.globalObjects ?? {};
  const allDates =
    tweets?.map(({ created_at }) => parseDateToLuxon(created_at)) ?? [];

  const max = DateTime.max(...allDates);
  const min = DateTime.max(...allDates);
  return (
    <PaperLayout>
      <Box
        height="100%"
        display="grid"
        gridTemplateRows="min-content  min-content 0.1fr min-content 0.1fr auto"
        mt={3}
        mx={1}
      >
        <Typography variant="subtitle5">
          Collection and Analysis Options
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography variant="subtitle5">Period:&nbsp;</Typography>
          <Typography variant="body1" css={datePeriodCss}>
            {min?.setLocale("eng")?.toFormat("DD")}-
            {max?.setLocale("eng")?.toFormat("DD")}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography variant="subtitle5">Tags:&nbsp;</Typography>
          <Typography variant="body1" css={datePeriodCss}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {tags?.slice(0, MAX_TAGS_LENGTH_SHOW).map((value) => (
                <ListItem key={value} disableGutters>
                  <ListItemText primary={`${value}`} />
                </ListItem>
              ))}
            </List>
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography variant="subtitle5">Used filters:&nbsp;</Typography>
          <Typography variant="body1" css={datePeriodCss}>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              {filters?.slice(0, MAX_FILTERS_LENGTH_SHOW).map((value) => (
                <Box
                  display="grid"
                  gridTemplateColumns="auto auto"
                  justifyContent="start"
                  alignItems="center"
                >
                  <ListItemText primary={`${value}`} />
                  {isShowingCheckbox && (
                    <Checkbox
                      value={socialFilter?.value}
                      onChange={(e) =>
                        onChangeFilter &&
                        onChangeFilter(e, value?.split(" ")[0])
                      }
                    />
                  )}
                </Box>
              ))}
            </List>
          </Typography>
        </Box>
        <Box />
      </Box>
    </PaperLayout>
  );
};
