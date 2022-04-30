import React from 'react';
import styled from '@emotion/styled';
import { Pagination } from '@mui/material';

import { Box } from 'shared/components/ui';
import { useSpreadsheetContext } from 'shared/features/spreadsheet';

type SpreadsheetPaginationProps = {
  itemsCount: number;
};

export const SpreadsheetPagination: React.FC<SpreadsheetPaginationProps> = ({ itemsCount }) => {
  const { setPage, page, pageSize } = useSpreadsheetContext();
  const onChange = React.useCallback(
    (_: React.ChangeEvent<unknown>, selectedPage: number) => {
      setPage(selectedPage);
    },
    [setPage],
  );

  return (
    <Container>
      <Pagination
        count={Math.ceil(itemsCount / pageSize)}
        page={page}
        onChange={onChange}
        showFirstButton
        showLastButton
      />
    </Container>
  );
};

const Container = styled(Box)`
  padding: 20px 0px;
`;
