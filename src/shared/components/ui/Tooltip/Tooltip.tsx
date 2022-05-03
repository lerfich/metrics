import { forwardRef } from "react";

import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@material-ui/core";

import { ComponentDataProps } from "../../types";

type TooltipProps = MuiTooltipProps & ComponentDataProps;

export type TooltipPositionType = MuiTooltipProps["placement"];

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      "data-test": dataTest,
      "data-node-id": dataNodeID,
      "data-node-render-path": dataRenderPath,
      ...tooltipProps
    },
    ref
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
      >
        <MuiTooltip {...tooltipProps}>
          <div>{children}</div>
        </MuiTooltip>
      </div>
    );
  }
);
