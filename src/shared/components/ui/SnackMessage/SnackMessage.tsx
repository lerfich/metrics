import React, { forwardRef, useCallback } from "react";
import { css } from "@emotion/react";
import { Box, CardActions, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { SnackbarContent, useSnackbar } from "notistack";
import { Grid, IconButton } from "@mui/material";

import { ALERT_TITLE_OPTIONS } from "../../../constants";

import { Icon } from "..";

const theme = {
  palette: {
    alerts: {
      color: {
        success: "#01B9A1",
        error: "#EB4336",
        info: "#295F7B",
        warning: "#FF782A",
      },
      backgroundColor: {
        success: "#E5F8F5",
        error: "#FDECEA",
        info: "#ECF1F3",
        warning: "#FFF5EE",
      },
    },
  },
};

const styles = {
  icon: {
    success: css`
      color: ${theme.palette.alerts.color.success};
    `,
    error: css`
      color: ${theme.palette.alerts.color.error};
    `,
    info: css`
      color: ${theme.palette.alerts.color.info};
    `,
    warning: css`
      color: ${theme.palette.alerts.color.warning};
    `,
  },
  success: css`
    width: 100%;
    border: 2px solid ${theme.palette.alerts.color.success};
    border-radius: 5px;
    color: ${theme.palette.alerts.color.success};
    background-color: ${theme.palette.alerts.backgroundColor.success};
  `,
  error: css`
    width: 100%;
    border: 2px solid ${theme.palette.alerts.color.error};
    border-radius: 5px;
    color: ${theme.palette.alerts.color.error};
    background-color: ${theme.palette.alerts.backgroundColor.error};
  `,
  info: css`
    width: 100%;
    border: 2px solid ${theme.palette.alerts.color.info};
    border-radius: 5px;
    color: ${theme.palette.alerts.color.info};
    background-color: ${theme.palette.alerts.backgroundColor.info};
  `,
  warning: css`
    width: 100%;
    border: 2px solid ${theme.palette.alerts.color.warning};
    border-radius: 5px;
    color: ${theme.palette.alerts.color.warning};
    background-color: ${theme.palette.alerts.backgroundColor.warning};
  `,
};

const contentContainerCSS = css`
  @media (min-width: 900px) {
    width: 500px;
  }
`;

const messageBoxCSS = css`
  color: #757d7c;
  font-weight: 300;
`;

const BUTTON_HEIGHT = 30;

const buttonCSS = css`
  left: 15px;
  padding: 0;

  &:hover {
    background-color: transparent;
  }
`;

const titleCSS = css`
  font-size: 14px;
  font-weight: 800;
`;

const closeIconCSS = css`
  color: #2f3231;
  height: ${BUTTON_HEIGHT / 2}px;
`;

export enum SNACK_TYPES {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

const ICON_OPTIONS = {
  [SNACK_TYPES.success]: (
    <Icon
      css={styles.icon.success}
      name="CheckCircleOutline"
      viewBox="0 0 24 24"
    />
  ),
  [SNACK_TYPES.info]: (
    <Icon css={styles.icon.info} name="ErrorOutline" viewBox="0 0 24 24" />
  ),
  [SNACK_TYPES.warning]: (
    <Icon css={styles.icon.warning} name="Warning" viewBox="0 0 24 24" />
  ),
  [SNACK_TYPES.error]: (
    <Icon css={styles.icon.error} name="ErrorOutline" viewBox="0 0 24 24" />
  ),
};

export const createSnackMessage =
  (
    variant: any,
    onClickNotification?: (
      link?: string | undefined
    ) => (() => void) | undefined,
    link?: string | undefined
  ) =>
  (key: string, message: string) =>
    (
      <Box onClick={onClickNotification && onClickNotification(link)}>
        <SnackMessage id={key} variant={variant} message={message} />
      </Box>
    );

export const SnackMessage = forwardRef<
  HTMLDivElement,
  {
    id: string | number | any;
    message: string | React.ReactNode;
    variant: string;
  }
>((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} css={contentContainerCSS}>
      <CardActions css={styles.success}>
        <Grid container spacing={1}>
          <Grid item marginTop="3px">
            {ICON_OPTIONS[SNACK_TYPES.success]}
          </Grid>
          <Grid item xs={10}>
            <Typography css={titleCSS}>
              {" "}
              {ALERT_TITLE_OPTIONS.success}{" "}
            </Typography>
            <Box css={messageBoxCSS}> {props.message} </Box>
          </Grid>
          <Grid item>
            <IconButton
              css={buttonCSS}
              size="small"
              disableRipple={true}
              onClick={handleDismiss}
            >
              <CloseIcon css={closeIconCSS} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </SnackbarContent>
  );
});
