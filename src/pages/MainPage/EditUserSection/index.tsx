import React, { ReactElement, useState } from 'react';
import { Column, Row } from 'ui/Layout';
import { Redirect, useParams } from 'react-router-dom';
import { FormikProps } from 'formik';
import {
  AlignItemsTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Field } from 'widgets/Form/Field';
import { EIconTypes } from 'models/icons';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Button } from 'ui/Button';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { ERouteLinks } from 'models/route';
import { Icon } from 'ui/Icon';
import { Table } from 'widgets/Table';
import { initialFormValues } from 'helpers/forms';
import { Form } from 'widgets/Form';
import { Box } from 'ui/Box';
import { SectionContainer } from 'ui/SectionContainer';
import {
  EFieldTypes,
  EInputTypes,
  IInitialAddUserFormValues,
  IInitialUserEditGroupsFormValues,
} from 'models/forms';
import { Loader } from 'ui/Loader';
import { editUser } from 'requests/fetch-users';
import { Pagination } from 'widgets/Pagination';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { groupAddUser } from 'requests/fetch-groups';
import { isError } from 'models/guards';
import { isRequired } from 'widgets/Form/validations';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { addUserValidations } from '../AddUsersSection';
import { groupsColumns } from '../GroupsSection/helpers';
import {
  IFetchUserFilters,
  useAppSelectOptions,
  useFetchGroups,
} from '../GroupsSection/hooks';
import { useGetUser } from './hooks';
import { AddGroupUserButton } from './styles';

const EditUserSection = (): ReactElement | null => {
  const { id } = useParams<{ id: string }>();
  const { openNotification } = useNotification();
  const { user, loading } = useGetUser(id);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState<IFetchUserFilters>({ appId: '', search: '' });
  const { openModal, closeModal } = useModal();

  const { options: appOptions, loading: appOptionsLoading } = useAppSelectOptions([]);

  const { groups, totalPages } = useFetchGroups({ currentPage, filters });

  const groupsSelectionOptions = groups.map(
    (group): ISelectOptionsModel => ({
      value: group.id,
      label: group.name,
    }),
  );

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect to={ERouteLinks.users} />;
  }

  const handleSubmitEditing = async ({
    firstName,
    lastName,
    email,
    confirmPassword,
    password,
    isActive,
  }: IInitialAddUserFormValues): Promise<void> => {
    const onAccept = async () => {
      try {
        const data = await editUser(id, {
          firstName,
          lastName,
          email,
          confirmPassword,
          password,
          active: isActive,
          version: 0,
        });

        if (isError(data)) {
          return openNotification({
            type: ENotificationTypes.failed,
            text: 'Failed to edit user',
          });
        }

        return openNotification({
          type: ENotificationTypes.success,
          text: 'User has successfully edited',
        });
      } catch (e: any) {
        return openNotification({
          type: ENotificationTypes.success,
          text: 'Unpredictable error during editing group',
        });
      } finally {
        closeModal();
      }
    };

    openModal(EModalTypes.sure, {
      onAccept,
      text: 'Are you sure you want to save changes for this user?',
    });
  };

  const handleSubmitGroupAddUser = async (
    values: IInitialUserEditGroupsFormValues,
  ): Promise<void> => {
    try {
      const data = await groupAddUser(values.group, { groupId: values.group, userId: id });

      if (!isError(data)) {
        return openNotification({
          type: ENotificationTypes.failed,
          text: 'Failed to add user to the group',
        });
      }

      return openNotification({
        type: ENotificationTypes.failed,
        text: 'User has successfully added to the group',
      });
    } catch (e: any) {
      return openNotification({
        type: ENotificationTypes.failed,
        text: 'Unpredictable error during adding user to the group',
      });
    }
  };

  return (
    <Column>
      <SectionContainer
        title={
          <>
            Edit user:{' '}
            <Description
              fontFamily={EFontFamilies.bree}
              fontSize={FontSizeTypes.l}
              color={colors.primary}
            >
              {user.firstName} {user.lastName}
            </Description>
          </>
        }
      >
        <Box padding="41px 30px 46px">
          <Form
            initialValues={{
              firstName: user.firstName ?? '',
              lastName: user.lastName ?? '',
              email: user.email ?? '',
              isActive: user.active ?? false,
              password: '',
              confirmPassword: '',
            }}
            onSubmit={handleSubmitEditing}
            validations={addUserValidations}
            reinitialize
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
                      Edit
                    </Description>
                  </Button>
                </Row>
              </>
            )}
          </Form>
        </Box>
      </SectionContainer>

      <SectionContainer title="Add user to the group" mtop="20px">
        <Box padding="30px">
          <Form
            initialValues={initialFormValues.editUserGroups}
            onSubmit={handleSubmitGroupAddUser}
            validations={{ appId: [isRequired()], group: [isRequired()] }}
          >
            {(formikProps: FormikProps<IInitialUserEditGroupsFormValues>): ReactElement => (
              <Row jc={JustifyContentTypes.spaceBetween} ai={AlignItemsTypes.center}>
                <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                  <Description
                    fontSize={FontSizeTypes.m}
                    color={colors.textPrimaryThin}
                    mright="17px"
                  >
                    Choose an application
                  </Description>
                  <Row componentWidth="280px">
                    <Field
                      name="appId"
                      type={EFieldTypes.select}
                      value={formikProps.values.appId}
                      options={appOptions}
                      placeholder="Select application..."
                      label="Application"
                      icon={EIconTypes.account}
                      selectProps={{
                        isLoading: appOptionsLoading,
                      }}
                      onChange={(e) => {
                        formikProps.setFieldValue('appId', e.target.value);
                        setFilters((prev) => ({ ...prev, appId: e.target.value }));
                      }}
                    />
                  </Row>
                  <Row componentWidth="239px" mleft="15px">
                    <Field
                      name="group"
                      type={EFieldTypes.select}
                      value={formikProps.values.group}
                      options={groupsSelectionOptions}
                      placeholder="Select group..."
                      label="Group"
                      icon={EIconTypes.group}
                    />
                  </Row>
                </Row>
                <AddGroupUserButton
                  onClick={formikProps.handleSubmit}
                  type={EButtonTypes.submit}
                  height="60px"
                  width="60px"
                >
                  <Icon type={EIconTypes.plus} color={colors.white} fontSize="30px" pointer />
                </AddGroupUserButton>
              </Row>
            )}
          </Form>
          <Table columns={groupsColumns} dataSource={groups} mbottom="20px" />
          <Pagination
            pageSize={10}
            total={totalPages}
            onChange={() => setCurrentPage(currentPage + 1)}
            current={currentPage + 1}
          />
        </Box>
      </SectionContainer>
    </Column>
  );
};

export { EditUserSection };
