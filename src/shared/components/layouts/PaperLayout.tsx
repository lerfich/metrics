import React from "react";
import { css, Paper, styled } from "@mui/material";

export const PaperLayout = styled((props) => (
  <Paper
    {...props}
    variant="elevation"
    css={css`
      height: 75%;
    `}
  />
))({
  boxShadow: "0 7px 21px 0 rgba(171, 171, 171, 0.17)",
  borderRadius: "8px",
});
