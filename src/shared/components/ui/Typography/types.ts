import React from "react";

import { TypographyProps as MuiTypographyProps } from "@material-ui/core";
import { Prefer } from "../../../types/utility";

export type TypographyVariants = MuiTypographyProps["variant"] | any;

export type TypographyProps<C extends React.ElementType = "p"> = {
  component?: C;
} & Prefer<
  {
    variant?: TypographyVariants;
    color?: any;
    loading?: boolean;
    withEllipsis?: boolean;
  },
  MuiTypographyProps<C>
>;
