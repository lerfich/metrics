import { forwardRef } from "react";

import { Interpolation, Theme } from "@emotion/react";
import { Field, FieldProps, FieldValidator, useFormik } from "formik";

import { ComponentDataProps } from "../../types";
import { getIsInvalid } from "../common";
import { TextField, TextFieldProps } from "../TextField";

export type FormTextFieldProps = ComponentDataProps & {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  formik?: ReturnType<typeof useFormik>;
  inputProps?: TextFieldProps & { css?: Interpolation<Theme> };
};

export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  (
    {
      fieldProps,
      inputProps = {},
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
            <TextField
              ref={ref}
              {...inputProps}
              name={fieldProps.name}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={isInvalid}
              helperText={errorText}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
            />
          );
        }}
      </Field>
    );
  }
);
