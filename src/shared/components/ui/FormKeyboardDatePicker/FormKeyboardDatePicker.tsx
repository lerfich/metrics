import { forwardRef } from 'react';
import { Field, FieldProps, FieldValidator } from 'formik';

import { ComponentDataProps } from '../../types';
import { getIsInvalid } from '../common';
import { DatePicker, DatePickerProps } from '../DatePicker';

export type FormKeyboardDatePickerProps = ComponentDataProps & {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  datePickerProps?: Omit<DatePickerProps, 'onChange' | 'value'>;
};

export const FormKeyboardDatePicker = forwardRef<HTMLInputElement, FormKeyboardDatePickerProps>(
  (
    {
      fieldProps,
      datePickerProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
    },
    ref,
  ) => {
    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });

          return (
            <DatePicker
              ref={ref}
              {...datePickerProps}
              value={field.value}
              onChange={date => form.setFieldValue(fieldProps.name, date)}
              error={isInvalid}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
            />
          );
        }}
      </Field>
    );
  },
);
