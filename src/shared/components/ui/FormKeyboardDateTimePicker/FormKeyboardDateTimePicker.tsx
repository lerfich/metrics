import React, { forwardRef } from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Field, FieldProps, FieldValidator } from 'formik';

import { ComponentDataProps } from '../../types';
import { getIsInvalid } from '../common';
import { KeyboardDateTimePicker, KeyboardDateTimePickerProps } from '../KeyboardDateTimePicker';

export type FormKeyboardDateTimePickerProps = ComponentDataProps & {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  dateTimePickerProps?: Omit<KeyboardDateTimePickerProps, 'onChange' | 'value'>;
};

export const FormKeyboardDateTimePicker = forwardRef<
  HTMLInputElement,
  FormKeyboardDateTimePickerProps
>(
  (
    {
      fieldProps,
      dateTimePickerProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
    },
    ref,
  ) => {
    const fieldName = fieldProps.name;
    const onChange = React.useCallback(
      (form: FieldProps['form']) => (data: MaterialUiPickersDate) =>
        form.setFieldValue(fieldName, data),
      [fieldName],
    );

    return (
      <Field name={fieldName} validate={fieldProps.validate}>
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
              <KeyboardDateTimePicker
                {...dateTimePickerProps}
                value={field.value}
                onChange={onChange(form)}
                error={isInvalid}
              />
              {isInvalid && <FormHelperText error>{errorText}</FormHelperText>}
            </FormControl>
          );
        }}
      </Field>
    );
  },
);
