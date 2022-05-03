import React, { CSSProperties, forwardRef } from "react";

import { SerializedStyles } from "@emotion/react";
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  Select as MaterialSelect,
  SelectProps as MaterialSelectProps,
} from "@material-ui/core";

import { ComponentDataProps } from "../../types";

export type SelectProps = Omit<MaterialSelectProps, "ref" | "renderValue"> &
  ComponentDataProps &
  Pick<FormControlProps, "variant" | "size"> & {
    renderValue?: (
      value: string | string[] | number | number[]
    ) => React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
  };

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      disabled,
      label,
      className,
      error,
      variant,
      size,
      renderValue,
      "data-test": dataTest,
      "data-node-id": dataNodeID,
      "data-node-render-path": dataRenderPath,
      ...otherSelectProps
    },
    ref
  ) => {
    return (
      <FormControl
        variant={variant}
        size={size}
        disabled={disabled}
        className={className}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <MaterialSelect
          {...otherSelectProps}
          label={label}
          renderValue={renderValue as MaterialSelectProps["renderValue"]}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
);
