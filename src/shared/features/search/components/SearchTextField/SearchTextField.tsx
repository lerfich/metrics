import React from "react";
import { InputAdornment } from "@material-ui/core";
import { debounce } from "lodash";

import { TextField, Icon, TextFieldProps } from "../../../../components/ui";

import { useSearchContext } from "../../providers";

export type SearchTextFieldProps = Omit<TextFieldProps, "value" | "onChange">;

export const SearchTextField = (props: SearchTextFieldProps) => {
  const { searchQuery, setSearchQuery, setIsUserTyping } = useSearchContext();
  const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery);

  const fetchSearchResults = React.useCallback(
    async (searchText: string) => {
      setIsUserTyping(false);

      setSearchQuery(searchText);
    },
    [setIsUserTyping, setSearchQuery]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchSearchResults = React.useCallback(
    debounce(
      (searchText: string) => {
        fetchSearchResults(searchText);
      },
      1500,
      { leading: false, trailing: true }
    ),
    []
  );

  const onSearchQueryChange = React.useCallback(
    (newSearchQuery, disableRequestDebounce = false) => {
      setIsUserTyping(!!newSearchQuery);
      setLocalSearchQuery(newSearchQuery);

      const skipDebounce = disableRequestDebounce || !newSearchQuery.trim();

      if (skipDebounce) {
        debouncedFetchSearchResults.cancel();
        fetchSearchResults(newSearchQuery);
        return;
      }

      debouncedFetchSearchResults(newSearchQuery);
    },
    [debouncedFetchSearchResults, fetchSearchResults, setIsUserTyping]
  );

  const onChange = React.useCallback(
    (event) => {
      const newSearchQuery = event.target.value;
      onSearchQueryChange(newSearchQuery);
    },
    [onSearchQueryChange]
  );

  return (
    <TextField
      type="search"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              name="Search"
              variant="filled"
              color="inherit"
              fontSize="default"
              viewBox="0 0 24 24"
            />
          </InputAdornment>
        ),
      }}
      {...props}
      value={localSearchQuery}
      onChange={onChange}
    />
  );
};
