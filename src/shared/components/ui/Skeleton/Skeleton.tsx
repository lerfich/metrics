import { css } from "@emotion/react";
import { Skeleton as MUISkeleton } from "@mui/material";

import { TypographyVariants } from "../Typography/types";

export type SkeletonProps = {
  variant: TypographyVariants;
};

const skeletonVariantCss =
  (variant: SkeletonProps["variant"]) => (theme: any) =>
    css`
      flex: 1;
      height: ${variant ? theme.typography[variant].lineHeight : "auto"};
    `;

export const Skeleton = ({ variant }: SkeletonProps) => {
  return <MUISkeleton css={skeletonVariantCss(variant)} />;
};
