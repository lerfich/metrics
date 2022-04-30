import React from 'react';

import { Field as FormikFormField, FieldProps as FormikFormFieldProps } from 'formik';

export type FieldProps<FieldValue, T> = {
  component?: React.FC<T>;
} & FormikFormFieldProps<FieldValue, any> &
  Omit<T, 'input' | 'meta'>;

function Field<FieldValue = any, T = Record<string, any>>(props: FieldProps<FieldValue, T>) {
  return <FormikFormField {...props} />;
}

export { Field };
