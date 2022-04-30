import React from "react";
import { css } from "@mui/material";
import { useConfirmDialog } from "react-mui-confirm";

import { SpreadsheetCellActions } from "../../";
import { Popover, Box, Typography } from "../../../../components/ui";

const cellActionsIconBoxCss = css`
  display: flex;
  align-items: center;
  color: rgba(171, 171, 171, 0.85);
`;

const cellActionsCss = css`
  padding: 8px 0px;
  border-radius: 8px;
`;

const cellActionsElementCss = css`
  background-color: #ffffff;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.87);
  padding: 4px 16px;
  :hover {
    background-color: #295f7b;
    color: #ffffff;
  }
`;

const cellActionsTitleCss = css`
  margin-left: 8px;
`;

export type SpreadsheetActionsPopoverProps = {
  cellActions?: SpreadsheetCellActions;
  target: React.ReactNode;
  id: string;
};

export const SpreadsheetActionsPopover: React.FC<
  SpreadsheetActionsPopoverProps
> = ({ cellActions = [], target, id: rowId }) => {
  const confirm = useConfirmDialog();

  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      target={target}
      content={({ onClose }) => (
        <Box css={cellActionsCss}>
          {cellActions.map(
            ({
              id,
              onClickAction,
              confirm: confirmOptions,
              icon,
              title,
              checkHidden,
            }) => {
              const onClick = async () => {
                if (confirmOptions) {
                  confirm({
                    title: confirmOptions.text,
                    confirmButtonText: confirmOptions.confirmText,
                    cancelButtonText: confirmOptions.cancelText,
                    description: confirmOptions.description,
                    dialogContentProps: confirmOptions.description
                      ? undefined
                      : {
                          sx: {
                            display: "none",
                          },
                        },
                    confirmButtonProps: {
                      variant: "contained",
                    },
                    onConfirm: async () => {
                      if (confirmOptions.await) {
                        await onClickAction(rowId);
                      } else {
                        onClickAction(rowId);
                      }
                    },
                  });
                } else {
                  onClickAction(rowId);
                }
                onClose();
              };

              const isHidden = checkHidden?.(rowId) ?? false;

              return (
                <Box
                  key={id}
                  display={isHidden ? "none" : "flex"}
                  css={cellActionsElementCss}
                  onClick={onClick}
                >
                  <Box css={cellActionsIconBoxCss}>{icon}</Box>
                  <Typography css={cellActionsTitleCss} variant="body1">
                    {title}
                  </Typography>
                </Box>
              );
            }
          )}
        </Box>
      )}
    />
  );
};
