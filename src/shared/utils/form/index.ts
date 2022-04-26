// import { ApolloError } from '@apollo/client';
import { DateTime } from "luxon";
import * as R from "ramda";

const MIN_PASSWORD_LENGTH = 8;

export const withFormikHandle =
  (onSubmit: (data: any, helpers?: any) => any) =>
  async (formData: any, { setErrors, ...rest }: any) => {
    try {
      await onSubmit(formData, rest);
    } catch (e) {
      console.log(e);

      if (e) {
        // @ts-ignore
        const gqlErrors = e.graphQLErrors?.[0]?.details;

        setErrors(gqlErrors);
      }
    }
  };

export const required = (value: any) => {
  return (
    ((Array.isArray(value)
      ? value.length <= 0
      : R.isNil(value) ||
        (typeof value === "string" && !R.trim(value).length)) &&
      "Required") ||
    undefined
  );
};

export const maxLength = (value: any) =>
  (typeof value === "string" &&
    value.length >= 1000 &&
    "Description has to be less than 1000 characters") ||
  undefined;

export const maxTextSymbols = (value: any, max: number) => {
  if (value && typeof value === "string") {
    return value.length <= max
      ? undefined
      : `Max ${max} symbols. Please remove extra text.`;
  }

  return undefined;
};

export const isValidGpa = (value: number) => {
  if (value < 0 || value > 5.0) {
    return "Should be between 0 and 5";
  }
  return undefined;
};

export const composeValidators =
  (...validators: Array<undefined | ((value: any) => string | undefined)>) =>
  (value: any) =>
    validators?.reduce(
      (error, validator) =>
        error || (validator ? validator(value) : undefined) || undefined,
      undefined as string | undefined
    ) || undefined;

export const mustBePhone = (phoneNumber?: string) => {
  if (phoneNumber) {
    return !/^(0|[1-9][0-9]{9})$/i.test(phoneNumber)
      ? "Invalid phone"
      : undefined;
  }

  return undefined;
};

export const isValidEmail = (value: string) =>
  required(value) ||
  (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) &&
    "Invalid email format") ||
  undefined;

export const isValidPassword = (value: string) =>
  required(value) ||
  (value.length < MIN_PASSWORD_LENGTH &&
    "Password must be at least 8 characters long") ||
  (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/i.test(value) &&
    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character") ||
  undefined;

export const isValidPercent = (value: number) =>
  value > 0 && value <= 100 ? undefined : "Invalid percent";

export const isCorrectDateInterval =
  (startDateRaw: string, minDateDiff: any) => (value: string) => {
    const startDate = DateTime.fromISO(startDateRaw)
      .plus(minDateDiff)
      .set({ second: 0, millisecond: 0 });
    const endDate = DateTime.fromISO(value).set({ second: 0, millisecond: 0 });
    const diff = startDate.diff(endDate).as("minutes");

    if (diff > 0) {
      return "Expiration date should be after start date";
    }
  };

export const isValidLink = (value: string) =>
  required(value) ||
  (!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i.test(
    value
  ) &&
    "Invalid link format") ||
  undefined;
