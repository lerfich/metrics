import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentProps,
  Divider,
} from "@mui/material";
import type { DialogProps, DialogTitleProps } from "@mui/material";
import _ from "lodash";

const DIALOG_MIN_WIDTH = 600;

type ModalProps = {
  dialogProps: DialogProps;
  titleProps?: DialogTitleProps & {
    title?: string;
  };
  contentProps?: DialogContentProps;
  isVisibleDivider?: boolean;
  withPadding?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  isVisibleDivider = true,
  withPadding = true,
  children,
  ...modalProps
}) => {
  const hasTitle = !_.isNil(modalProps.titleProps?.title);

  return (
    <Dialog {...modalProps.dialogProps}>
      {hasTitle && (
        <DialogTitle {...modalProps.titleProps}>
          {modalProps.titleProps?.title}
        </DialogTitle>
      )}

      {hasTitle && isVisibleDivider && (
        <Divider
          absolute={false}
          flexItem={false}
          light={false}
          orientation="horizontal"
          variant="fullWidth"
        />
      )}

      <DialogContent
        sx={{
          minWidth: DIALOG_MIN_WIDTH,
          padding: withPadding ? "24px" : "0px",
        }}
        {...modalProps.contentProps}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
