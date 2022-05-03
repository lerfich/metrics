import React from "react";

import { css } from "@emotion/react";
import { Typography as MuiTypography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { has } from "ramda";
// import { getTextColor, MuiTheme } from "styles";
import { NonUndefined } from "utility-types";

import { Skeleton } from "../Skeleton";

import { TypographyProps } from "./types";

type TypographyRefElement<C extends React.ElementType> =
  C extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[C]
    : HTMLParagraphElement;

type TypographyForwardRefComponent = <C extends React.ElementType = "p">(
  props: TypographyProps<C> & React.RefAttributes<TypographyRefElement<C>>
) => JSX.Element | null;

type TypographyMakeStylesProps = {
  color: NonNullable<TypographyProps["color"]>;
};

const useStyles = makeStyles<any, TypographyMakeStylesProps>((theme: any) => ({
  /* Styles applied to the root element if `variant="subtitle3"`. */
  subtitle3: theme.typography.subtitle3,
  /* Styles applied to the root element if `variant="subtitle4"`. */
  subtitle4: theme.typography.subtitle4,
  subtitle5: theme.typography.subtitle5,
  /* Styles applied to the root element if `variant="special"`. */
  // color: (props) => ({
  //   // color: getTextColor(props.color, theme),
  // }),
}));

const customTypographyVariants = {
  subtitle3: "subtitle3",
  subtitle4: "subtitle4",
  subtitle5: "subtitle5",
};

function isCustomVariant(
  variant: NonUndefined<TypographyProps["variant"]>
): variant is any {
  return has(variant, customTypographyVariants);
}

const ellipsisCss = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Typography: TypographyForwardRefComponent = React.forwardRef(
  function Typography<C extends React.ElementType = "p">(
    {
      className,
      variant = "body1",
      color = "inherit",
      loading,
      withEllipsis,
      ...rest
    }: TypographyProps<C>,
    ref: React.Ref<any>
  ) {
    const classes = useStyles({ color });

    if (loading) {
      return <Skeleton variant={variant} />;
    }

    return (
      <MuiTypography
        ref={ref}
        className={clsx(
          {
            [(classes as Record<string, string>)[variant]]:
              isCustomVariant(variant),
          },
          classes.color,
          className
        )}
        paragraph
        variant={isCustomVariant(variant) ? "inherit" : variant}
        color="initial"
        {...rest}
        css={css`
          margin-bottom: 0;
          ${rest.css}
          ${withEllipsis ? ellipsisCss : undefined}
        `}
      />
    );
  }
);
