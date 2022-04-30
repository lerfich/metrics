import { forwardRef } from "react";

import { FormControl, FormHelperText } from "@material-ui/core";
import { Field, FieldProps, FieldValidator } from "formik";

import { ComponentDataProps } from "../../types";
import { getIsInvalid } from "../common";
import { Select, SelectProps } from "../Select";

export type FormSelectProps = ComponentDataProps & {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  selectProps: SelectProps;
};

export const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  (
    {
      fieldProps,
      selectProps,
      "data-test": dataTest,
      "data-node-id": dataNodeID,
      "data-node-render-path": dataRenderPath,
    },
    ref
  ) => {
    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid && meta.error;

          return (
            <FormControl
              ref={ref}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
            >
              <Select
                {...selectProps}
                style={{
                  border: isInvalid ? "1px solid #f44336" : "none",
                  color: isInvalid ? "1px solid #f44336" : "none",
                }}
                name={fieldProps.name}
                value={field.value ?? ""}
                onChange={field.onChange}
                error={isInvalid}
              />
              {isInvalid && <FormHelperText error>{errorText}</FormHelperText>}
            </FormControl>
          );
        }}
      </Field>
    );
  }
);
