import { forwardRef } from 'react';
import { css } from '@emotion/react';
import { Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@material-ui/core';
import { bindTrigger, bindPopover, usePopupState } from 'material-ui-popup-state/hooks';

import { ComponentDataProps } from '../../types';

export type PopoverProps = Omit<MuiPopoverProps, 'open'> &
  ComponentDataProps & {
    target: React.ReactNode;
    content: (args: { onClose: () => void }) => React.ReactNode;
    forceOpen?: boolean;
    __nodeAlias?: string;
  };

/** @deprecated use PopoverV2 */

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      target,
      content,
      forceOpen,
      __nodeAlias,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...popoverProps
    },
    ref,
  ): JSX.Element => {
    const popupState = usePopupState({
      variant: 'popover',
      popupId: __nodeAlias,
    });

    const bindPopoverState = bindPopover(popupState);
    const bindTriggerState = bindTrigger(popupState);
    const open = forceOpen === undefined ? bindPopoverState.open : forceOpen;

    return (
      <div
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
      >
        <div
          {...bindTriggerState}
          css={css`
            display: inline-flex;
          `}
        >
          {target}
        </div>
        <MuiPopover {...bindPopoverState} {...popoverProps} open={open}>
          {content({ onClose: bindPopoverState.onClose })}
        </MuiPopover>
      </div>
    );
  },
);
