import React from "react";
import {
  KeyboardDatePicker as MuiDatePicker,
  KeyboardDatePickerProps as DatePickerProps,
} from "@material-ui/pickers";
import { Box, styled } from "@mui/material";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";

import { SxProp } from "../../../types/styles";

const StyledDatePickerBox = styled(Box)<Pick<DatePickerProps, "inputVariant">>(
  ({ theme, inputVariant }) => {
    let styles: SxProp = {
      "& .Mui-disabled": {
        cursor: "not-allowed",
      },
    };

    const outlinedStyles: SxProp = {
      "& .MuiInputBase-input": {
        borderRight: "1px solid",
        borderRightColor: theme.palette.grey[400],
        "&:not(.Mui-disabled):hover": {
          borderRightColor: "#212121",
        },
      },
      "& .Mui-focused": {
        "& .MuiInputBase-input": {
          borderRightWidth: "2px",
          borderRightColor: "#283E55",
        },
      },
      "& .MuiOutlinedInput-adornedEnd": {
        padding: "0.1em",
      },
    };

    if (inputVariant === "outlined") {
      styles = { ...styles, ...outlinedStyles };
    }

    return styles as any;
  }
);

export const DatePicker: React.FC<DatePickerProps> = ({ style, ...props }) => {
  const datePickerStyles = React.useMemo((): React.CSSProperties => {
    return { width: "100%", ...style };
  }, [style]);

  return (
    <StyledDatePickerBox inputVariant={props.inputVariant}>
      <MuiDatePicker
        format="MM/dd/yyyy"
        style={datePickerStyles}
        keyboardIcon={<CalendarIcon />}
        {...props}
      />
    </StyledDatePickerBox>
  );
};

export type { DatePickerProps };

/** @deprecated import **DatePickerProps** instead  */
export type KeyboardDatePickerProps = DatePickerProps;

/** @deprecated import **DatePicker** instead  */
export const KeyboardDatePicker = DatePicker;
