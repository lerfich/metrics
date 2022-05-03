import React from "react";

import { css, Interpolation, Theme } from "@emotion/react";
import { ListItemIcon } from "@material-ui/core";
import { Icon } from "shared/components/ui";

const listItemIconCSS = css`
  min-width: auto;
  color: inherit;
`;

type ListItemIconSymbolProps = {
  classes?: Record<string, any>;
  style?: Record<string, any>;
  css?: Interpolation<Theme>;
  className?: string;
  onClick?: (event: MouseEvent | undefined) => void;
  onMouseOver?: (event: MouseEvent | undefined) => void;
  onMouseOut?: (event: MouseEvent | undefined) => void;
  onMouseDown?: (event: MouseEvent | undefined) => void;
  onMouseUp?: (event: MouseEvent | undefined) => void;
  onMouseEnter?: (event: MouseEvent | undefined) => void;
  onMouseLeave?: (event: MouseEvent | undefined) => void;
  onWheel?: (event: MouseEvent | undefined) => void;
  onContextMenu?: (event: MouseEvent | undefined) => void;
  onAuxClick?: (event: MouseEvent | undefined) => void;
  key?: number;
  children?: React.ReactNode;
  name?: string;
  variant?: any;
  color?: any;
  fontSize?: any;
  viewBox?: string;
  htmlColor?: string;
};

export const ListItemIconSymbol: React.FC<ListItemIconSymbolProps> = (
  symbolProps
) => {
  return (
    <ListItemIcon css={listItemIconCSS}>
      <Icon
        classes={symbolProps?.classes}
        style={symbolProps?.style}
        css={symbolProps?.css}
        className={symbolProps?.className}
        onClick={symbolProps?.onClick}
        onMouseOver={symbolProps?.onMouseOver}
        onMouseOut={symbolProps?.onMouseOut}
        onMouseDown={symbolProps?.onMouseDown}
        onMouseUp={symbolProps?.onMouseUp}
        onMouseEnter={symbolProps?.onMouseEnter}
        onMouseLeave={symbolProps?.onMouseLeave}
        onWheel={symbolProps?.onWheel}
        onContextMenu={symbolProps?.onContextMenu}
        onAuxClick={symbolProps?.onAuxClick}
        name={symbolProps.name}
        variant={symbolProps.variant}
        color={symbolProps.color}
        fontSize={symbolProps.fontSize}
        viewBox={symbolProps.viewBox}
        htmlColor={symbolProps.htmlColor}
      />
    </ListItemIcon>
  );
};
