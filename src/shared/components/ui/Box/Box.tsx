import React, { CSSProperties, forwardRef, ReactNode } from 'react';

import { Interpolation, Theme } from '@emotion/react';

import { ComponentDataProps } from '../../types';

export type BoxProps = ComponentDataProps &
  Pick<
    CSSProperties,
    | 'display'
    | 'overflow'
    | 'textOverflow'
    | 'visibility'
    | 'whiteSpace'
    | 'flexDirection'
    | 'flexWrap'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'order'
    | 'flex'
    | 'flexGrow'
    | 'flexShrink'
    | 'alignSelf'
    | 'color'
    | 'backgroundColor'
  > & {
    style?: CSSProperties;
    css?: Interpolation<Theme>;

    onClick?: React.MouseEventHandler<HTMLDivElement>;
    htmlElement?: 'div' | 'footer';
    children?: ReactNode;
  };

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      style = {},
      display,
      overflow,
      textOverflow,
      visibility,
      whiteSpace,
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignContent,
      order,
      flex,
      flexGrow,
      flexShrink,
      alignSelf,
      color,
      backgroundColor,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      htmlElement = 'div',
      ...rest
    },
    ref,
  ) => {
    return React.createElement(
      htmlElement,
      {
        ref,
        ...rest,
        'data-test': dataTest,
        'data-node-id': dataNodeID,
        'data-node-render-path': dataRenderPath,
        style: {
          display,
          overflow,
          textOverflow,
          visibility,
          whiteSpace,
          flexDirection,
          flexWrap,
          justifyContent,
          alignItems,
          alignContent,
          order,
          flex,
          flexGrow,
          flexShrink,
          alignSelf,
          color,
          backgroundColor,
          ...style,
        },
      },
      children,
    );
  },
);
