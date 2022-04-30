import React from "react";
import { css } from "@emotion/react";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { APP_URL } from "shared/components/navigation/constants";
import { Typography } from "shared/components/ui";
import { buildUrl } from "shared/routes/routerUtils";

const savedCasesCss = (theme: any) => css`
  color: ${theme.palette.success.light};
`;

export const CaseNotFound: React.FC = () => {
  const history = useHistory();
  const onDetailsClick = React.useCallback(() => {
    const url = buildUrl(APP_URL.savedCases, {});
    history.push(url);
  }, [history]);

  return (
    <Box display="flex" justifyContent="start" alignItems="center">
      Вероятно, вы не выбрали один из существующих кейсов. Посмотрите на
      актуальные во вкладке &nbsp;
      <Box pt={2}>
        <Typography
          css={savedCasesCss}
          variant="subtitle5"
          onClick={onDetailsClick}
        >
          Мои задания
        </Typography>
      </Box>
    </Box>
  );
};
