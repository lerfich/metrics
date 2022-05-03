import React from 'react';

import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';

const errorTextCss = (theme: any) => css`
  font-size: 1rem;
  color: #f44336;
  text-align: center;
`;

export const FormError = ({ text }: { text: string }) => (
  <Typography css={errorTextCss}>{text}</Typography>
);
