import React from "react";

import { Box } from "@material-ui/core";
import { buildUrl } from "shared/routes/routerUtils";
import { APP_URL } from "../constants";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "shared/components/ui";
import { css } from "@emotion/react";

const defaultTextCss = (theme: any) => css`
  color: ${theme.palette.text.light};
`;

const linkTextCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

const buttonCss = (theme: any) => css`
  text-transform: none;
  font-weight: 200;
  padding: 0;
  margin: 0;
`;

export const InvalidPage = () => {
  const history = useHistory();

  const { onAddCase, onCheckSavedCases } = React.useMemo(
    () => ({
      onAddCase: () => {
        const url = buildUrl(APP_URL.addCase, {});
        history.push(url);
      },
      onCheckSavedCases: () => {
        const url = buildUrl(APP_URL.savedCases, {});
        history.push(url);
      },
    }),
    [history]
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center"
    >
      <Typography variant="subtitle4" css={defaultTextCss}>
        Добрый день! Пожалуйста, &nbsp;
      </Typography>
      <Button onClick={onAddCase} size="small" css={buttonCss}>
        <Typography variant="subtitle4" css={linkTextCss}>
          создайте кейс &nbsp;
        </Typography>
      </Button>
      <Typography variant="subtitle4" css={defaultTextCss}>
        или &nbsp;
      </Typography>
      <Button onClick={onCheckSavedCases} size="small" css={buttonCss}>
        <Typography variant="subtitle4" color="textSecondary" css={linkTextCss}>
          выберите из уже существующих
        </Typography>
      </Button>
    </Box>
  );
};
