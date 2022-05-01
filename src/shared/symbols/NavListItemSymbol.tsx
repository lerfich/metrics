import React, { Fragment, useCallback } from "react";
import { Interpolation, Theme } from "@emotion/react";
import { ListItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Tooltip } from "../components/ui";
import { APP_URL } from "../components/navigation/constants";

type NavListItemSymbolProps = {
  classes?: Record<string, any>;
  style?: Record<string, any>;
  css?: Interpolation<Theme>;
  className?: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onMouseOver?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onMouseOut?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onMouseDown?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onMouseUp?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onMouseEnter?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onMouseLeave?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onWheel?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onContextMenu?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onAuxClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  key?: string | undefined;
  children?: React.ReactNode;
  path?: string;
  exact?: boolean;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  selectedBackgroundColor?: string;
  selectedColor?: string;
  selectedIconColor?: string;
  color?: string;
  button?: any;
  alignItems?: any;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  disableRipple?: boolean;
  divider?: any;
  tooltipTitle?: string;
  tooltipPlacement?: any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  listItemText?: React.ReactNode;
  text?: string;
  startIconStyle?: Record<string, any>;
  endIconStyle?: Record<string, any>;
  autoFocus?: any;
  selected?: any;
  onClosePopover?: any;
};

const NavListItem = ({
  button,
  startIcon,
  endIcon,
  listItemText,
  ...symbolProps
}: NavListItemSymbolProps) => (
  <ListItem {...symbolProps} button={button}>
    {startIcon && <Fragment>{[startIcon]}</Fragment>}
    <Fragment>{listItemText}</Fragment>
    {endIcon && <Fragment>{[endIcon]}</Fragment>}
  </ListItem>
);

export const NavListItemSymbol: React.FC<NavListItemSymbolProps> = ({
  onClick,
  path,
  tooltipTitle,
  tooltipPlacement,
  ...symbolProps
}) => {
  const history = useHistory();

  const onClickItem = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (symbolProps?.onClosePopover) {
        symbolProps?.onClosePopover();
      }
      if (onClick) {
        onClick(event);
        return;
      }

      const url = path;
      history.push(url || APP_URL.invalidPage);
    },
    [symbolProps, onClick, path, history]
  );

  return (
    <Fragment>
      {!tooltipTitle && <NavListItem {...symbolProps} onClick={onClickItem} />}
      {tooltipTitle && (
        <Tooltip
          placement={tooltipPlacement}
          title={tooltipTitle}
          onClick={onClickItem}
        >
          <NavListItem {...symbolProps} />
        </Tooltip>
      )}
    </Fragment>
  );
};
