import React, { ReactElement } from 'react';
import { Box } from 'ui/Box';
import { Title, TitleTags } from 'ui/Title';
import {
  AlignItemsTypes,
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Circle } from 'ui/Circle';
import { Form } from 'widgets/Form';
import { initialFormValues } from 'helpers/forms';
import { FormikHelpers, FormikProps } from 'formik';
import { EInputTypes, IInitialProfileFormValues } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { useSelector } from 'react-redux';
import { TStore } from 'store';
import {
  allowUppercase,
  isRequired,
  moreThan,
  onlyTenDigits,
  repeatPassword,
} from 'widgets/Form/validations';
import { changePassword } from 'requests/change-password';
import { isError } from 'models/guards';
import { isEmptyObject } from 'helpers/is-empty-object';
import { AvatarName } from './styles';
import { getAvatarText } from './helpers';

const ProfileForm = (): ReactElement => {
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));
  const handleSubmit = async (
    { password, confirmPassword }: IInitialProfileFormValues,
    helpers: FormikHelpers<IInitialProfileFormValues>,
  ): Promise<void> => {
    try {
      const data = await changePassword(password, confirmPassword);

      if (isError(data)) {
        return;
      }

      helpers.resetForm({
        values: {
          ...initialFormValues.profile,
          firstName: user?.firstName ?? '',
          lastName: user?.lastName ?? '',
          email: user?.email ?? '',
        },
      });
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <Box padding="30px 40px 49px" componentWidth="1130px">
      <Title
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.xl}
      >
        Hello {user?.firstName}
      </Title>
      <Row mtop="10px" componentWidth="auto" ai={AlignItemsTypes.flexEnd}>
        <Description fontSize={FontSizeTypes.m} color={colors.textPrimaryThin}>
          Have a nice day at work
        </Description>
        <Icon type={EIconTypes.smile} color={colors.yellow} mleft="8px" fontSize="26px" />
      </Row>
      <Row jc={JustifyContentTypes.center} mtop="25px" mbottom="40px">
        <Circle
          componentWidth="150px"
          componentHeight="150px"
          bg={colors.turquoise}
          jc={JustifyContentTypes.center}
          ai={AlignItemsTypes.center}
        >
          <AvatarName uppercase color={colors.white} fontFamily={EFontFamilies.bree}>
            {getAvatarText(user)}
          </AvatarName>
        </Circle>
      </Row>
      <Form
        initialValues={{
          ...initialFormValues.profile,
          firstName: user?.firstName ?? '',
          lastName: user?.lastName ?? '',
          email: user?.email ?? '',
        }}
        onSubmit={handleSubmit}
        componentWidth="100%"
        validations={{
          password: [isRequired(), moreThan(8), allowUppercase(), onlyTenDigits()],
          confirmPassword: [
            isRequired(),
            moreThan(8),
            allowUppercase(),
            onlyTenDigits(),
            repeatPassword(),
          ],
        }}
        reinitialize
      >
        {(formikProps: FormikProps<IInitialProfileFormValues>): ReactElement => (
          <>
            <Row mbottom="30px">
              <Row mright="15px">
                <Field
                  name="firstName"
                  type={EInputTypes.text}
                  value=""
                  label="First Name"
                  placeholder="Laura"
                  icon={EIconTypes.account}
                  disabled
                />
              </Row>
              <Row mleft="15px">
                <Field
                  name="password"
                  type={EInputTypes.password}
                  value={formikProps.values.password}
                  placeholder="New password"
                  icon={EIconTypes.password}
                />
              </Row>
            </Row>
            <Row mbottom="30px">
              <Row mright="15px">
                <Field
                  name="lastName"
                  type={EInputTypes.text}
                  value=""
                  label="Last Name"
                  placeholder="Coleby"
                  icon={EIconTypes.account}
                  disabled
                />
              </Row>
              <Row mleft="15px">
                <Field
                  name="confirmPassword"
                  type={EInputTypes.password}
                  value={formikProps.values.confirmPassword}
                  placeholder="Confirm new password"
                  icon={EIconTypes.password}
                />
              </Row>
            </Row>
            <Row mbottom="30px" componentWidth="50%">
              <Row mright="15px">
                <Field
                  name="email"
                  type={EInputTypes.email}
                  value=""
                  label="Email address"
                  placeholder="example@example.com"
                  icon={EIconTypes.email}
                  disabled
                />
              </Row>
            </Row>
            <Row jc={JustifyContentTypes.flexEnd}>
              <Row componentWidth="204px">
                <Button
                  type={EButtonTypes.submit}
                  onClick={formikProps.handleSubmit}
                  icon={EIconTypes.check}
                  componentSize={ComponentSizesTypes.full}
                  disabled={!formikProps.isValid || isEmptyObject(formikProps.touched)}
                >
                  <Description
                    color={colors.white}
                    fontSize={FontSizeTypes.xm}
                    weight={WeightTypes.w800}
                  >
                    Save
                  </Description>
                </Button>
              </Row>
            </Row>
          </>
        )}
      </Form>
    </Box>
  );
};

export { ProfileForm };
