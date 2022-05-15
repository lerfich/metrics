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
import { PaperLayout } from "shared/components/layouts/PaperLayout";
import { Typography } from "shared/components/ui";

const datePeriodCss = (theme: any) => css`
  color: ${theme.palette.background.lightBlue};
`;

const MAX_TAGS_LENGTH_SHOW = 8;
const MAX_FILTERS_LENGTH_SHOW = 5;

export const ActualCaseSidebar: React.FC<ActualCaseContentInput> = ({
  dateFilter,
  tags,
  filters,
  socialFilter,
  onChangeFilter,
  isShowingCheckbox,
}) => {
  return (
    <PaperLayout>
      <Box
        height="100%"
        display="grid"
        gridTemplateRows="min-content  min-content 0.1fr min-content 0.1fr auto"
        mt={3}
        mx={1}
      >
        <Typography variant="subtitle5">Параметры сбора и анализа</Typography>
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography variant="subtitle5">Период:&nbsp;</Typography>
          <Typography variant="body1" css={datePeriodCss}>
            {dateFilter?.startDate?.setLocale("ru").toFormat("DD")}-
            {dateFilter?.endDate?.setLocale("ru").toFormat("DD")}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography variant="subtitle5">Тэги:&nbsp;</Typography>
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
          <Typography variant="subtitle5">Наложенные фильтры:&nbsp;</Typography>
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
