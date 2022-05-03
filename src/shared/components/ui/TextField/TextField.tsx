import { forwardRef } from "react";

import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";

import { ComponentDataProps } from "../../types";

export type TextFieldProps = MuiTextFieldProps &
  ComponentDataProps & {
    debounce?: number;
    placeholder?: string;
  };

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      placeholder,
      debounce: debounceTime,
      onChange,
      value,
      "data-test": dataTest,
      "data-node-id": dataNodeID,
      "data-node-render-path": dataRenderPath,
      InputProps = {},
      ...rest
    },
    ref
  ) => {
    const {
      startAdornment: initialStartAdornment,
      endAdornment: initialEndAdornment,
      ...restInputProps
    } = InputProps;

    // I'm not sure if it's necessary but this is the way how
    // They add adornments in the TextFields (In the documentation)
    // https://material-ui.com/components/text-fields/#icons
    const startAdornment = initialStartAdornment && (
      <InputAdornment position="start">{initialStartAdornment}</InputAdornment>
    );
    const endAdornment = initialEndAdornment && (
      <InputAdornment position="end">{initialEndAdornment}</InputAdornment>
    );

    return (
      <MuiTextField
        ref={ref}
        placeholder={placeholder}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        InputProps={{
          startAdornment,
          endAdornment,
          ...restInputProps,
        }}
        {...rest}
        value={value}
        onChange={onChange}
      />
    );
  }
);
