import React from 'react';
import {
  Popover as MuiPopover,
  PopoverProps as MuiPopoverProps,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from '@mui/material';
import _ from 'lodash';

type OmitOnCick<T> = Omit<T, 'onClick'>;

type PopoverTriggers =
  | {
      triggerType: 'button';
      tripperProps: OmitOnCick<ButtonProps>;
    }
  | {
      triggerType: 'icon-button';
      tripperProps: OmitOnCick<IconButtonProps>;
    };

type PopoverChildrenProps = {
  handlePopoverClose: () => void;
};

type PopoverProps = PopoverTriggers & {
  onOpen?: () => void;
  onClose?: () => void;
  popoverProps?: Omit<MuiPopoverProps, 'open' | 'anchorEl' | 'handleClose'>;
  children?: React.FC<PopoverChildrenProps> | React.ReactNode;
};

export const PopoverV2: React.FC<PopoverProps> = ({
  triggerType,
  tripperProps,
  onOpen,
  onClose,
  popoverProps,
  children,
}) => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchor(event.currentTarget);
      onOpen?.();
    },
    [onOpen],
  );

  const handleClose = React.useCallback(() => {
    setAnchor(null);
    onClose?.();
  }, [onClose]);

  const renderTrigger = React.useMemo(() => {
    if (triggerType === 'button') {
      return <Button {...tripperProps} onClick={handleClick} />;
    }
    return <IconButton {...tripperProps} onClick={handleClick} />;
  }, [handleClick, triggerType, tripperProps]);

  const isOpen = React.useMemo(() => Boolean(anchor), [anchor]);

  return (
    <React.Fragment>
      {renderTrigger}
      <MuiPopover open={isOpen} anchorEl={anchor} onClose={handleClose} {...popoverProps}>
        {_.isFunction(children) ? children({ handlePopoverClose: handleClose }) : children}
      </MuiPopover>
    </React.Fragment>
  );
};
