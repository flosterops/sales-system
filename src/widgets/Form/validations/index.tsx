import { FormikValues } from 'formik';

export const isRequired = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  return value ? '' : errorText || 'This field is required';
};

export const lessThan =
  (condition: number, errorText?: string) => (formValues: FormikValues) => {
    const { value = '' } = formValues;
    return value.length < condition
      ? ''
      : errorText || `Should be less than ${condition} symbols`;
  };

export const moreThan =
  (condition: number, errorText?: string) => (formValues: FormikValues) => {
    const { value = '' } = formValues;
    return value.length > condition - 1
      ? ''
      : errorText || `Should be more than ${condition} symbols`;
  };

export const onlyDigits = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp('^[0-9]*$');
  return reg.test(value) ? '' : errorText || 'Only digits available';
};

export const isEmail = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$');
  return reg.test(value) ? '' : errorText || 'Email is invalid';
};

export const onlyLatin = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp('[A-z\u00C0-\u00ff]+');
  return reg.test(value) ? '' : errorText || 'Only latin symbols and min 1 letter';
};

export const repeatPassword = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  return value === formValues.values.password ? '' : errorText || 'Passwords are not matched';
};

export const allowLowercase = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp(/(.*[a-z].*)/);
  return reg.test(value) ? '' : errorText || 'Should contains one lowercase symbol';
};

export const allowUppercase = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp(/(.*[A-Z].*)/);
  return reg.test(value) ? '' : errorText || 'Should contains one uppercase symbol';
};

export const onlyTenDigits = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp(/^\D*(\d\D*)+$/);
  return reg.test(value) ? '' : errorText || 'Should contains one number';
};

export const allowSpecialChapter = (errorText?: string) => (formValues: FormikValues) => {
  const { value } = formValues;
  const reg = new RegExp(/(?=.*[-+_!@#$%^&*., ?])/);
  return reg.test(value)
    ? ''
    : errorText || 'Non-alphanumeric characters (special characters)';
};

export const notAllowSpecialChapter = (errorText?: string) => (formikValues: FormikValues) => {
  const { value } = formikValues;
  const reg = new RegExp(/(?=.*[-+_!@#$%^&*., ?])/);
  return !reg.test(value)
    ? ''
    : errorText || 'Not allowed non-alphanumeric characters (special characters)';
};
