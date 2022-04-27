import React, { forwardRef, useMemo } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Box } from "@material-ui/core";
import {
  KeyboardDatePicker as MuiKeyboardDatePicker,
  KeyboardDatePickerProps as MuiKeyboardDatePickerProps,
  KeyboardTimePicker as MuiKeyboardTimePicker,
  KeyboardTimePickerProps as MuiKeyboardTimePickerProps,
} from "@material-ui/pickers";

import { ComponentDataProps } from "../../types";

export type KeyboardDateTimePickerProps = ComponentDataProps &
  Omit<MuiKeyboardDatePickerProps, "value" | "initialFocusedDateTime"> &
  Omit<MuiKeyboardTimePickerProps, "value" | "initialFocusedDateTime"> & {
    initialFocusedDateTime?: string;
    value: string;
    css?: (theme: any) => SerializedStyles | string;
    timeLabel?: string;
  };

const dateTimeBoxCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;c
  grid-column-gap: 10px;
`;

export const KeyboardDateTimePicker = forwardRef<
  HTMLDivElement,
  KeyboardDateTimePickerProps
>(
  (
    {
      onChange,
      value,
      initialFocusedDate,
      "data-test": dataTest,
      "data-node-id": dataNodeID,
      "data-node-render-path": dataRenderPath,
      ...props
    },
    ref
  ) => {
    const DatePickerProps = useMemo(
      () => ({ ref, style: props.style, css: props.css, ...props.InputProps }),
      [props.InputProps, props.style, props.css, ref]
    );
    const TimePickerProps = useMemo(
      () => ({ ref, style: props.style, css: props.css, ...props.InputProps }),
      [props.InputProps, props.style, props.css, ref]
    );

    return (
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={2}>
        <MuiKeyboardDatePicker
          InputProps={DatePickerProps}
          onChange={onChange}
          value={value}
          format="MM/dd/yyyy"
          {...props}
          label={props.label}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
        />
        <MuiKeyboardTimePicker
          InputProps={TimePickerProps}
          onChange={onChange}
          value={value}
          format="hh:mm"
          {...props}
          label={props.timeLabel || props.label}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
        />
      </Box>
    );
  }
);
