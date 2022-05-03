import React from "react";
import { Box, IconButton } from "@mui/material";

import { Icon } from "../../../../components/ui";

import { useSearchContext } from "../../providers";

const DEFAULT_COLOR = "#283E55";
const HIGHLIGHT_COLOR = "#EF5C5C";

export const LayoutControl: React.FC = () => {
  const { setDisplayList, displayList } = useSearchContext();

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        color="default"
        size="medium"
        onClick={() => setDisplayList(true)}
      >
        <Icon
          name="List"
          htmlColor={displayList ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
        />
      </IconButton>
      <IconButton
        color="default"
        size="medium"
        onClick={() => setDisplayList(false)}
      >
        <Icon
          name="Apps"
          htmlColor={displayList ? DEFAULT_COLOR : HIGHLIGHT_COLOR}
        />
      </IconButton>
    </Box>
  );
};
