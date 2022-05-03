import React from "react";
import { Box, MenuItem, Typography, css, styled } from "@mui/material";

import {
  Button,
  Form,
  FormSelect,
  FormTextField,
} from "../../../../components/ui";
import {
  SpreadsheetFiltersType,
  useSpreadsheetContext,
  SpreadsheetContextValue,
} from "../../";

export type FormData = {
  [x: string]: string | null | undefined;
};

export type SpreadsheetFilterContentProps = {
  filters: SpreadsheetFiltersType;
  handlePopoverClose: () => void;
};

export const SpreadsheetFilterContent: React.FC<
  SpreadsheetFilterContentProps
> = ({ filters, handlePopoverClose }) => {
  const {
    filter: currentFilters,
    setFilter,
    customFilter: currentCustomFilters,
    setCustomFilter,
    zip,
    setZip,
  } = useSpreadsheetContext();

  const onSubmitFilter = React.useCallback(
    async (formData: Record<string, unknown>) => {
      const data = formData as FormData;
      const newCustomFilter: SpreadsheetContextValue["customFilter"] = filters
        .filter(({ customFilterPath }) => customFilterPath ?? undefined)
        .reduce(
          (newFilter, filter) => {
            const filterValue = data[filter.name];

            if (filter.name === "distance") {
              setZip({ ...zip, radius: filterValue ?? "" });
            }

            if (filter.name === "radius") {
              setZip({ ...zip, startPointZip: filterValue ?? "" });
            }

            if (!filterValue || !filter.customFilterPath) {
              return newFilter;
            }

            return {
              query: {
                ...newFilter.query,
                ...filter.customFilterPath(filterValue),
              },
              fields: { ...newFilter.fields, [filter.name]: filterValue },
            };
          },
          { query: {}, fields: {} }
        );

      const newFilter: SpreadsheetContextValue["filter"] = filters
        .filter(({ filterPath }) => filterPath)
        .reduce(
          (newFilter, filter) => {
            const filterValue = data[filter.name];
            if (!filterValue || !filter.filterPath) {
              return newFilter;
            }

            return {
              query: { ...newFilter.query, ...filter.filterPath(filterValue) },
              fields: { ...newFilter.fields, [filter.name]: filterValue },
            };
          },
          { query: {}, fields: {} }
        );

      setFilter(newFilter);
      setCustomFilter(newCustomFilter);
      handlePopoverClose();
    },
    [filters, setFilter, setCustomFilter, handlePopoverClose, setZip, zip]
  );

  const initialValues: FormData = React.useMemo(
    () => ({ ...currentFilters.fields, ...currentCustomFilters.fields }),
    [currentCustomFilters.fields, currentFilters.fields]
  );

  return (
    <React.Fragment>
      <Box css={filterBoxCSS}>
        <Typography variant="h6">Filter by</Typography>
        <Form
          oldCss={filterFormCss}
          onSubmit={onSubmitFilter}
          initialValues={initialValues}
        >
          {({ resetForm, handleReset }) => (
            <React.Fragment>
              {filters?.map((field) => {
                if (field.type === "input") {
                  return (
                    <FilterElement size={field.size}>
                      <FormTextField
                        inputProps={{
                          autoComplete: "off",
                          label: field.label,
                          variant: "outlined",
                        }}
                        fieldProps={{ name: field.name }}
                      />
                    </FilterElement>
                  );
                }

                if (field.type === "select") {
                  return (
                    <FilterElement size={field.size}>
                      <FormSelect
                        selectProps={{
                          variant: "outlined",
                          label: field.label,
                          children: [
                            { value: undefined, text: "-" },
                            ...field.variants,
                          ].map((variant) => (
                            <MenuItem
                              key={variant.text}
                              value={variant.value as any}
                            >
                              {variant.text || variant.value}
                            </MenuItem>
                          )),
                        }}
                        fieldProps={{ name: field.name }}
                      />
                    </FilterElement>
                  );
                }

                return null;
              })}
              <Box
                display="flex"
                justifyContent="flex-end"
                style={{ width: "100%" }}
              >
                <Button
                  color="primary"
                  size="medium"
                  variant="text"
                  onClick={() => resetForm()}
                >
                  cancel
                </Button>
                <Button
                  color="secondary"
                  size="medium"
                  variant="text"
                  type="submit"
                >
                  apply filter
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Form>
      </Box>
    </React.Fragment>
  );
};

const filterBoxCSS = css`
  padding: 22px;
  display: grid;
  grid-row-gap: 20px;
  width: 500px;
`;

const filterFormCss = css`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FilterElement = styled(Box)<{ size?: "small" | "full" }>`
  display: grid;
  width: ${(p) => (p.size === "full" ? "100%" : "calc(50% - 10px)")};
  margin-bottom: 20px;
`;
