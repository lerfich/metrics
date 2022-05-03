import React, { forwardRef } from "react";

import styled from "@emotion/styled";
import {
  FormControlLabel,
  Checkbox,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperText,
} from "@material-ui/core";
import { Field, FieldProps, FieldValidator } from "formik";

import { getIsInvalid } from "../common";
import { ComponentDataProps } from "../../types";

export type FormCheckboxProps = ComponentDataProps & {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  checkboxProps: (FormControlLabelProps & CheckboxProps) | any;
};

const StyledFormControlLabel = styled(FormControlLabel)`
  width: 100%;
`;

export const FormCheckbox = forwardRef<HTMLDivElement, FormCheckboxProps>(
  (
    {
      checkboxProps,
      fieldProps,
      "data-test": dataTest,
      "data-node-id": dataNodeID,
      "data-node-render-path": dataRenderPath,
    },
    ref
  ) => {
    const {
      disabled,
      label,
      labelPlacement = "end",
      ...otherCheckboxProps
    } = checkboxProps ?? {};

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid && meta.error;

          return (
            <div
              ref={ref}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
            >
              <StyledFormControlLabel
                disabled={disabled}
                label={label}
                labelPlacement={labelPlacement}
                name={fieldProps.name}
                control={
                  <Checkbox
                    {...otherCheckboxProps}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
              />
              {isInvalid && <FormHelperText error>{errorText}</FormHelperText>}
            </div>
          );
        }}
      </Field>
    );
  }
);
