import React, { ReactElement, useCallback } from 'react';
import { SectionContainer } from 'ui/SectionContainer';
import { Box } from 'ui/Box';
import { Form } from 'widgets/Form';
import { initialAddGroupFormValues, initialFormValues } from 'helpers/forms';
import { FormikHelpers, FormikProps } from 'formik';
import { EFieldTypes, EInputTypes, IInitialAddGroupFormValues } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import {
  AlignItemsTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { colors } from 'styles/colors';
import { EIconTypes } from 'models/icons';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { createGroup } from 'requests/create-group';
import { isError } from 'models/guards';
import { isRequired } from 'widgets/Form/validations';
import { IAppPermission } from 'requests/fetch-app-permissions';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { FeatureContainer, FeaturesWrapper } from './styles';
import { useAppPermissions } from './hooks';
import { IAppSelectOptions, useAppSelectOptions } from '../GroupsSection/hooks';

const AddGroupsSection = (): ReactElement => {
  const { openNotification } = useNotification();
  const { options } = useAppSelectOptions();
  const { permissions, setAppId } = useAppPermissions();

  const onSubmit = async (
    values: IInitialAddGroupFormValues,
    helpers: FormikHelpers<IInitialAddGroupFormValues>,
  ): Promise<void> => {
    try {
      const data = await createGroup({
        name: values.groupName,
        appKey: values.appKey,
        permissions: Object.keys(values.features)
          .map((key) => (values.features[key] ? key : ''))
          .filter(Boolean),
      });

      if (isError(data)) {
        return openNotification({
          type: ENotificationTypes.failed,
          text: 'Failed to add group',
        });
      }

      helpers.resetForm({ values: initialAddGroupFormValues });
      return openNotification({
        type: ENotificationTypes.success,
        text: 'Group has successfully added',
      });
    } catch (e: any) {
      return openNotification({
        type: ENotificationTypes.failed,
        text: 'Unpredictable error during adding group',
      });
    }
  };

  const toggleAll = (formikProps: FormikProps<IInitialAddGroupFormValues>): void => {
    const updateValue = !permissions.some(
      (permission: IAppPermission): boolean =>
        permission.id in formikProps.values.features &&
        formikProps.values.features[permission.id],
    );
    const newFeatures = {} as Record<string, boolean>;
    permissions.forEach((permission: IAppPermission): void => {
      newFeatures[permission.id] = updateValue;
    });

    formikProps.setValues({ ...formikProps.values, features: newFeatures });
  };

  const handleSelectChange = useCallback(
    (
      e: { target: { value: string } },
      setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    ) => {
      setFieldValue('application', e.target.value);
      setFieldValue('features', {});
      const option = options.find(
        (item: IAppSelectOptions): boolean => item.value === e.target.value,
      );
      setFieldValue('appKey', option?.appKey);
      setAppId(e.target.value);
    },
    [options, setAppId],
  );

  return (
    <SectionContainer title="Add new group">
      <Box padding="41px 30px 35px">
        <Form
          initialValues={{ ...initialFormValues.addGroup, features: {} }}
          onSubmit={onSubmit}
          validations={{
            groupName: [isRequired()],
            application: [isRequired()],
          }}
        >
          {(formikProps: FormikProps<IInitialAddGroupFormValues>): ReactElement => (
            <>
              <Field
                name="groupName"
                type={EInputTypes.text}
                value={formikProps.values.groupName}
                label="Group Name *"
                icon={EIconTypes.group}
                placeholder="Administrators"
              />
              <Row ai={AlignItemsTypes.center} mtop="30px">
                <Description
                  fontSize={FontSizeTypes.m}
                  color={colors.textPrimaryThin}
                  mright="17px"
                >
                  Choose an application
                </Description>
                <Row componentWidth="300px">
                  <Field
                    name="application"
                    type={EFieldTypes.select}
                    value={formikProps.values.application}
                    options={options}
                    icon={EIconTypes.account}
                    label="Application *"
                    onChange={(e) => handleSelectChange(e, formikProps.setFieldValue)}
                  />
                </Row>
              </Row>
              <Row />
              {!!permissions.length && (
                <>
                  <Row
                    ai={AlignItemsTypes.center}
                    jc={JustifyContentTypes.spaceBetween}
                    mtop="20px"
                  >
                    <Description fontSize={FontSizeTypes.m}>Permissions *</Description>
                    <Row componentWidth="auto" onClick={() => toggleAll(formikProps)}>
                      <Description color={colors.primary} weight={WeightTypes.w800}>
                        Select All / Deselect All
                      </Description>
                    </Row>
                  </Row>
                  <FeaturesWrapper>
                    {permissions.map(
                      (feature: IAppPermission): ReactElement => (
                        <FeatureContainer key={feature.id + feature.key} mtop="15px">
                          <Field
                            name={`features.${feature.id}`}
                            type={EFieldTypes.checkbox}
                            value={formikProps.values.features[feature.id]}
                            label={feature.displayName}
                          />
                        </FeatureContainer>
                      ),
                    )}
                  </FeaturesWrapper>
                </>
              )}
              <Row jc={JustifyContentTypes.flexEnd} mtop="30px">
                <Button
                  type={EButtonTypes.submit}
                  onClick={formikProps.handleSubmit}
                  icon={EIconTypes.plus}
                >
                  <Description
                    color={colors.white}
                    fontSize={FontSizeTypes.xm}
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

export { AddGroupsSection };
