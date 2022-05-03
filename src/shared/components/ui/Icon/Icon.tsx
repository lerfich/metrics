import React, { forwardRef, Ref } from 'react';

import * as MaterialIcons from '@mui/icons-material';

import { ComponentDataProps } from '../../types';

type MaterialIconNames = keyof typeof MaterialIcons;

type IconProps = ComponentDataProps & Record<string, any> & { name: MaterialIconNames };
// {
//   name: MaterialIconNames | string;
//   variant?: 'filled' | 'outlined' | 'rounded' | 'twoTone' | 'sharp';
//   color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
//   fontSize?: 'inherit' | 'default' | 'small' | 'large';
//   htmlColor?: string;
//   viewBox?: string;
//   style?: CSSProperties;
//   css?: SerializedStyles;
// };

const capitalize = (value = ''): string => {
  const head = value[0] || '';
  const rest = value.slice(1) || '';
  return head.toUpperCase() + rest;
};

export const Icon = forwardRef(
  (
    {
      name,
      variant = 'filled',
      style,
      color,
      fontSize,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...rest
    }: IconProps,
    ref: Ref<HTMLSpanElement>,
  ) => {
    const importVariant = variant === 'filled' ? '' : capitalize(variant);
    const MaterialIcon = MaterialIcons[`${name}${importVariant}` as MaterialIconNames];

    if (MaterialIcon) {
      return (
        // SvgIconComponent isn't aware of its forwardRef nature for some reason
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <MaterialIcon
          ref={ref}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
          fontSize={fontSize}
          color={color}
          style={style}
          {...rest}
        />
      );
    }

    return (
      <span
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        style={style}
      />
    );
  },
);
