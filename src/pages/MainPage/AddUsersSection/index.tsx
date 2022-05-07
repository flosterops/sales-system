import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'ui/Layout';
import {
  AlignItemsTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Box } from 'ui/Box';
import { Form } from 'widgets/Form';
import { FormikHelpers, FormikProps } from 'formik';
import { Field } from 'widgets/Form/Field';
import { initialAddUserFormValues, initialFormValues } from 'helpers/forms';
import { EFieldTypes, EInputTypes, IInitialAddUserFormValues } from 'models/forms';
import { EIconTypes } from 'models/icons';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Button } from 'ui/Button';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { SectionContainer } from 'ui/SectionContainer';
import {
  allowUppercase,
  isEmail,
  isRequired,
  lessThan,
  moreThan,
  onlyTenDigits,
  repeatPassword,
} from 'widgets/Form/validations';
import { createUser } from 'requests/create-user';
import { useNotification } from 'widgets/Notification/context';
import { isError } from 'models/guards';
import { ENotificationTypes } from 'models/notification';
import { ERouteLinks } from 'models/route';

export const addUserValidations = {
  firstName: [isRequired(), moreThan(2), lessThan(80)],
  lastName: [isRequired(), moreThan(2), lessThan(80)],
  email: [isRequired(), isEmail()],
  password: [isRequired(), moreThan(8), allowUppercase(), onlyTenDigits()],
  confirmPassword: [isRequired(), moreThan(8), allowUppercase(), repeatPassword()],
};

const AddUsersSection = (): ReactElement => {
  const { openNotification } = useNotification();
  const history = useHistory();

  const onSubmit = async (
    values: IInitialAddUserFormValues,
    helpers: FormikHelpers<IInitialAddUserFormValues>,
  ): Promise<void> => {
    try {
      const data = await createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        active: values.isActive,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (isError(data)) {
        return openNotification({
          type: ENotificationTypes.failed,
          text: 'Failed to add user',
        });
      }

      helpers.resetForm({ values: initialAddUserFormValues });
      history.push(`${ERouteLinks.users}/${data.data.id}`);
      return openNotification({
        type: ENotificationTypes.success,
        text: 'User has successfully added',
      });
    } catch (e) {
      return openNotification({
        type: ENotificationTypes.failed,
        text: 'Unpredictable problem during adding user',
      });
    }
  };

  return (
    <SectionContainer title="Add new user">
      <Box padding="41px 30px 46px">
        <Form
          initialValues={initialFormValues.addUser}
          onSubmit={onSubmit}
          validations={addUserValidations}
        >
          {(formikProps: FormikProps<IInitialAddUserFormValues>): ReactElement => (
            <>
              <Row
                jc={JustifyContentTypes.spaceBetween}
                mbottom="30px"
                ai={AlignItemsTypes.flexStart}
              >
                <Field
                  name="firstName"
                  type={EInputTypes.text}
                  value={formikProps.values.firstName}
                  label="First name"
                  placeholder="John"
                  icon={EIconTypes.account}
                  spaces={{ mright: '15px' }}
                  withError
                />
                <Field
                  name="lastName"
                  type={EInputTypes.text}
                  value={formikProps.values.lastName}
                  label="Last name"
                  placeholder="Smith"
                  icon={EIconTypes.account}
                  spaces={{ mleft: '15px' }}
                  withError
                />
              </Row>
              <Row
                jc={JustifyContentTypes.spaceBetween}
                mbottom="30px"
                ai={AlignItemsTypes.flexStart}
              >
                <Field
                  name="email"
                  type={EInputTypes.email}
                  value={formikProps.values.email}
                  label="Email address *"
                  placeholder="johnsmith@gmail.com"
                  icon={EIconTypes.email}
                  spaces={{ mright: '15px' }}
                  withError
                />
                <Row mleft="15px" componentHeight="50px" ai={AlignItemsTypes.center}>
                  <Field
                    name="isActive"
                    type={EFieldTypes.checkbox}
                    value={formikProps.values.isActive}
                    label="Active"
                    placeholder="Active"
                  />
                </Row>
              </Row>
              <Row
                jc={JustifyContentTypes.spaceBetween}
                mbottom="20px"
                ai={AlignItemsTypes.flexStart}
              >
                <Field
                  name="password"
                  type={EInputTypes.password}
                  value={formikProps.values.password}
                  placeholder="New password"
                  icon={EIconTypes.password}
                  spaces={{ mright: '15px' }}
                  withError
                />
                <Field
                  name="confirmPassword"
                  type={EInputTypes.password}
                  value={formikProps.values.confirmPassword}
                  placeholder="Confirm new password"
                  icon={EIconTypes.password}
                  spaces={{ mleft: '15px' }}
                />
              </Row>
              <Description fontSize={FontSizeTypes.m} color={colors.textPrimaryThin}>
                Please create a secure password. The password must consist of at least 8
                symbols, contain one uppercase letter and at least one number.
              </Description>
              <Row mtop="31px" jc={JustifyContentTypes.flexEnd}>
                <Button
                  type={EButtonTypes.submit}
                  onClick={formikProps.handleSubmit}
                  icon={EIconTypes.plus}
                  variant={EButtonsVariants.primary}
                  color={colors.primary}
                >
                  <Description
                    color={colors.white}
                    fontSize={FontSizeTypes.xxm}
                    weight={WeightTypes.w800}
                  >
                    Add
                  </Description>
                </Button>
              </Row>
            </>
          )}
        </Form>
      </Box>
    </SectionContainer>
  );
};

export { AddUsersSection };
