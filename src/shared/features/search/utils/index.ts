import { SortInfoOption } from 'shared/components/ui';

import { SortFieldProps } from '../components/SortField';

// there's a possible situation when we apply the wrong sort type to a query: for example, we want to sort people by position

export const isSortOptionMatchesQuery = (
  possibleSortOption: SortInfoOption,
  assignedSortInfo: SortFieldProps['sortInfo'], // We take options defined as constants for special Sort Type
) => {
  // We check if received sort option belongs to acceptable Sort Type (i.e UserSort has `firstName`, but doesnt have `position` as JobOfferSort, so if we try to sort users by position, it will return false)
  if (
    Object.keys(possibleSortOption)[0] ===
      Object.keys(assignedSortInfo?.options[0].value || {})[0] ||
    Object.keys(possibleSortOption)[0] === Object.keys(assignedSortInfo?.options[1].value || {})[0]
  ) {
    return true;
  }

  return false;
};
