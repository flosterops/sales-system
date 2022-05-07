import React, { PropsWithChildren, ReactElement } from 'react';
import { FormikErrors, FormikProps, FormikValues } from 'formik';
import { IFormValidations, IInitialFormValues, IValidationFunction } from 'models/forms';
import { isFunction } from 'models/guards';
import { ISpaceTypes } from 'models/layout';
import { StyledForm, StyledFormik } from './styles';

interface IFormikForm extends ISpaceTypes {
  initialValues: IInitialFormValues[keyof IInitialFormValues];
  onSubmit: (...args: any) => void;
  // eslint-disable-next-line react/require-default-props
  componentWidth?: string;
  // eslint-disable-next-line react/require-default-props
  validations?: IFormValidations;
  // eslint-disable-next-line react/require-default-props
  reinitialize?: boolean;
}

const Form = ({
  initialValues,
  onSubmit,
  children,
  validations = {},
  componentWidth = '100%',
  reinitialize = false,
  ...props
}: PropsWithChildren<IFormikForm>): ReactElement => {
  const handleValidate = (values: any): FormikErrors<FormikValues> => {
    const errors = {} as FormikErrors<FormikValues>;

    if (!validations) {
      return errors;
    }

    Object.entries(validations).forEach(
      ([fieldName, rules]: [string, IValidationFunction[]]) => {
        // eslint-disable-next-line prefer-destructuring
        errors[fieldName] = rules
          .map((rule: IValidationFunction) => rule({ value: values[fieldName], values }))
          .filter((i: string) => !!i)[0];
      },
    );

    Object.keys(validations).forEach((fieldName: string): void => {
      // eslint-disable-next-line no-prototype-builtins
      if (errors.hasOwnProperty(fieldName) && !errors[fieldName]) {
        delete errors[fieldName];
      }
    });

    return errors;
  };
  return (
    <StyledFormik
      {...props}
      initialValues={initialValues}
      onSubmit={onSubmit}
      componentWidth={componentWidth}
      validate={handleValidate}
      enableReinitialize={reinitialize}
    >
      {(formikProps: FormikProps<typeof initialValues>) => (
        <StyledForm>{isFunction(children) ? children(formikProps) : children}</StyledForm>
      )}
    </StyledFormik>
  );
};

export { Form };
