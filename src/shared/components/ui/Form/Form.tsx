import React from "react";
import { Box, BoxProps, styled } from "@mui/material";
import { Formik, FormikConfig, FormikProps } from "formik";
import _ from "lodash";

import { withFormikHandle } from "../../../utils/form";

type DefiniteFormikConfig = FormikConfig<Record<string, any>>;
type DefiniteFormikProps = FormikProps<Record<string, any>>;

const StyledForm = styled("form")``;

export type FormProps = Omit<
  DefiniteFormikConfig,
  "initialValues" | "render" | "children" | "component"
> & {
  initialValues?: DefiniteFormikConfig["initialValues"];
  formikRef?: React.ClassAttributes<HTMLFormElement>["ref"];
  handleErrors?: boolean;
  boxProps?: BoxProps;
  formNodeProps?: Omit<
    React.ComponentProps<typeof StyledForm>,
    "ref" | "onSubmit" | "css"
  >;
  children?: React.FC<DefiniteFormikProps>;

  /** @deprecated use formNodeProps */
  // oldCss?: any; // "css" prop not working for unknown reasons
};

export const Form: React.FC<FormProps> = ({
  boxProps,
  formNodeProps,
  initialValues = {},
  handleErrors = true,
  enableReinitialize = true,
  onSubmit,
  formikRef,
  children,
  // oldCss,
  ...props
}) => {
  return (
    <Box {...boxProps}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleErrors ? withFormikHandle(onSubmit) : onSubmit}
        enableReinitialize={enableReinitialize}
        {...props}
      >
        {(formProps) => (
          <StyledForm
            ref={formikRef}
            // css={oldCss}
            onSubmit={formProps.handleSubmit}
            {...formNodeProps}
          >
            {_.isFunction(children) ? children(formProps) : children}
          </StyledForm>
        )}
      </Formik>
    </Box>
  );
};
