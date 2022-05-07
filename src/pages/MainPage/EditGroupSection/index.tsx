import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Column, Row } from 'ui/Layout';
import { FormikProps } from 'formik';
import {
  EFieldTypes,
  EInputTypes,
  IInitialAddGroupFormValues,
  IInitialUsersFormValues,
} from 'models/forms';
import { SectionContainer } from 'ui/SectionContainer';
import { Box } from 'ui/Box';
import { Form } from 'widgets/Form';
import { initialFormValues } from 'helpers/forms';
import { Field } from 'widgets/Form/Field';
import { EIconTypes } from 'models/icons';
import {
  AlignItemsTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';
import { Icon } from 'ui/Icon';
import { Table } from 'widgets/Table';
import { Loader } from 'ui/Loader';
import { EAppKeyTypes } from 'models/applications';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { IAppPermission } from 'requests/fetch-app-permissions';
import { deleteGroupUser, editGroup, groupAddUser } from 'requests/fetch-groups';
import { isError } from 'models/guards';
import { ISearchUser } from 'models/users';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { ENotificationTypes } from 'models/notification';
import { useNotification } from 'widgets/Notification/context';
import { FeatureContainer, FeaturesWrapper } from '../AddGroupsSection/styles';
import { getGroupUserColumns } from '../UsersSection/helpers';
import { IAppSelectOptions, useAppSelectOptions } from '../GroupsSection/hooks';
import { useGetGroup, useGetGroupPermissions, useGetGroupUsers } from './hooks';
import { useAppPermissions } from '../AddGroupsSection/hooks';
import { getDefaultFeatures, getSubmitPermission } from './helpers';
import { useFetchUsers } from '../UsersSection/hooks';
import { AddGroupUserButton } from '../EditUserSection/styles';

const EditGroupSection = (): ReactElement | null => {
  const { id } = useParams<{ id: string }>();
  const { group, updateGroup } = useGetGroup(id);
  const { openModal, closeModal } = useModal();
  const { openNotification } = useNotification();

  const { options, loading } = useAppSelectOptions();
  const { permissions } = useGetGroupPermissions(id);
  const {
    permissions: appPermissions,
    setAppId,
    loading: isAppPermissionLoading,
  } = useAppPermissions();
  const { users: groupUsers, updateGroupUsers } = useGetGroupUsers(id);
  // TODO add pagination
  const fetchUsersOptions = useMemo(
    () => ({ currentPage: 0, filters: { active: '', search: '' } }),
    [],
  );
  const { users } = useFetchUsers(fetchUsersOptions);
  const userOptions = users.map(
    (user: ISearchUser): ISelectOptionsModel => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }),
  );

  const toggleAll = (
    formikProps: FormikProps<IInitialAddGroupFormValues & { appId: string }>,
  ): void => {
    const { features } = formikProps.values;
    const updateValue = !Object.keys(features).some((key: string): boolean => features[key]);
    const newFeatures = {} as Record<string, boolean>;
    Object.keys(features).forEach((key: string): void => {
      newFeatures[key] = updateValue;
    });

    formikProps.setValues({ ...formikProps.values, features: newFeatures });
  };

  useEffect(() => {
    if (group) {
      setAppId(group.appId);
    }
  }, [group, setAppId]);

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

  const defaultFeatures = useMemo(
    () => getDefaultFeatures(appPermissions, permissions),
    [appPermissions, permissions],
  );

  const handleSubmitSaveEdit = (
    values: IInitialAddGroupFormValues & { appId: string },
  ): void => {
    const onAccept = async () => {
      const { permissionsToAdd, permissionsToRemove } = getSubmitPermission(
        permissions,
        values.features,
      );
      const body = {
        name: values.groupName,
        permissionsToAdd,
        permissionsToRemove,
        version: 0,
      };

      try {
        const data = await editGroup(id, body);

        if (isError(data)) {
          return openNotification({
            type: ENotificationTypes.failed,
            text: 'Failed to edit group',
          });
        }

        updateGroup();
        return openNotification({
          type: ENotificationTypes.success,
          text: 'Group has successfully edited',
        });
      } catch (e: any) {
        return openNotification({
          type: ENotificationTypes.failed,
          text: 'Unpredictable error during editing group',
        });
      } finally {
        closeModal();
      }
    };

    openModal(EModalTypes.sure, {
      onAccept,
      text: 'Are you sure you want to save changes for this group?',
    });
  };

  const handleSubmitAddGroupUser = async (values: IInitialUsersFormValues): Promise<void> => {
    try {
      const data = await groupAddUser(id, { userId: values.search, groupId: id });

      if (isError(data)) {
        return openNotification({
          type: ENotificationTypes.failed,
          text: 'Failed to add user to the group',
        });
      }

      updateGroupUsers();
      return openNotification({
        type: ENotificationTypes.success,
        text: 'User has successfully added to the group',
      });
    } catch (e: any) {
      return openNotification({
        type: ENotificationTypes.failed,
        text: 'Unpredictable error during editing adding user to the group',
      });
    }
  };

  const handleDeleteGroupUser = useCallback(
    async (userId: string) => {
      try {
        const data = await deleteGroupUser(id, userId);

        if (isError(data)) {
          return openNotification({
            type: ENotificationTypes.failed,
            text: 'Failed to delete user from group',
          });
        }

        updateGroupUsers();
        return openNotification({
          type: ENotificationTypes.success,
          text: 'User has successfully deleted',
        });
      } catch (e: any) {
        return openNotification({
          type: ENotificationTypes.failed,
          text: 'Unpredictable error during deleting user from group',
        });
      }
    },
    [id, updateGroupUsers, openNotification],
  );

  const editGroupUserColumns = useMemo(
    () => getGroupUserColumns({ onDelete: handleDeleteGroupUser }),
    [handleDeleteGroupUser],
  );

  if (loading) {
    return <Loader />;
  }

  if (!group && !loading) {
    return (
      <Row jc={JustifyContentTypes.center}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Description>Didn't found group</Description>
      </Row>
    );
  }

  return (
    <Column>
      <SectionContainer
        title={
          <>
            Edit group:{' '}
            <Description
              fontFamily={EFontFamilies.bree}
              fontSize={FontSizeTypes.l}
              color={colors.primary}
            >
              {group?.name}
            </Description>
          </>
        }
      >
        <Box padding="41px 30px 35px">
          <Form
            initialValues={{
              groupName: group?.name ?? '',
              appId: group?.appId ?? '',
              application: group?.displayName ?? '',
              appKey: group?.key ?? ('' as EAppKeyTypes),
              features: defaultFeatures,
            }}
            onSubmit={handleSubmitSaveEdit}
            reinitialize
          >
            {(
              formikProps: FormikProps<IInitialAddGroupFormValues & { appId: string }>,
            ): ReactElement => (
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
                      name="appId"
                      type={EFieldTypes.select}
                      value={formikProps.values.appId}
                      options={options}
                      icon={EIconTypes.account}
                      label="Application *"
                      onChange={(e) => handleSelectChange(e, formikProps.setFieldValue)}
                      selectProps={{ isLoading: isAppPermissionLoading }}
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
                      {appPermissions.map((feature: IAppPermission): ReactElement | null => (
                        <FeatureContainer key={feature.id} mtop="15px">
                          <Field
                            name={`features.${feature.id}`}
                            type={EFieldTypes.checkbox}
                            value={formikProps.values.features[feature.id]}
                            label={feature.displayName}
                          />
                        </FeatureContainer>
                      ))}
                    </FeaturesWrapper>
                  </>
                )}
                <Row jc={JustifyContentTypes.flexEnd} mtop="30px">
                  <Button
                    type={EButtonTypes.submit}
                    onClick={formikProps.handleSubmit}
                    icon={EIconTypes.check}
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
              </>
            )}
          </Form>
        </Box>
      </SectionContainer>

      <SectionContainer title="Add users to the group" mtop="20px">
        <Column>
          <Box padding="30px">
            <Form
              initialValues={initialFormValues.editGroupUsers}
              onSubmit={handleSubmitAddGroupUser}
            >
              {(formikProps: FormikProps<IInitialUsersFormValues>): ReactElement => (
                <>
                  <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
                    <Description
                      fontSize={FontSizeTypes.m}
                      color={colors.textPrimaryThin}
                      mright="17px"
                      nowrap
                    >
                      Choose a username
                    </Description>
                    <Row margin="0 28px 0 15px">
                      <Field
                        name="search"
                        type={EFieldTypes.select}
                        value={formikProps.values}
                        options={userOptions}
                        icon={EIconTypes.search}
                        placeholder="Select username..."
                        label="Username"
                      />
                    </Row>
                    <Row componentWidth="auto">
                      <NavLink to={ERouteLinks.usersAdd}>
                        <AddGroupUserButton
                          onClick={formikProps.handleSubmit}
                          type={EButtonTypes.submit}
                          height="60px"
                          width="60px"
                        >
                          <Icon
                            mleft="5px"
                            type={EIconTypes.userPlus}
                            color={colors.white}
                            fontSize="27px"
                            pointer
                          />
                        </AddGroupUserButton>
                      </NavLink>
                    </Row>
                  </Row>
                </>
              )}
            </Form>
            <Table columns={editGroupUserColumns} dataSource={groupUsers} />
          </Box>
        </Column>
      </SectionContainer>
    </Column>
  );
};

export { EditGroupSection };
