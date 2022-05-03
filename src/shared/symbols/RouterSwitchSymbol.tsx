import React from "react";
import { css } from "@emotion/react";
import { Switch } from "react-router-dom";

const divCSS = css`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  height: 100%;
  min-width: 0;
`;

type RouterSwitchSymbolProps = {
  routes?: React.ReactNode;
  redirects?: React.ReactNode;
};

export const RouterSwitchSymbol: React.FC<RouterSwitchSymbolProps> = (
  symbolProps
) => {
  return (
    <div css={divCSS}>
      <Switch>{[symbolProps.routes, symbolProps.redirects]}</Switch>
    </div>
  );
};
